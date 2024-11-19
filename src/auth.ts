import NextAuth, {Account, DefaultSession} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {signInSchema} from "@/lib/zod";
import {ZodError} from "zod";
import type {Session, User } from "next-auth";
import {JwtType, UserType} from "@/types/user";
import { JWT } from "next-auth/jwt";
import {jwtDecode} from "jwt-decode";
import {refreshAccessToken} from "@/app/services/auth/auth.service";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {LOGIN_PATH, PROTECTED_ROUTES, PUBLIC_ROUTES, RESIGISTER_PATH} from "@/lib/routes";
dayjs.extend(utc);
dayjs.extend(timezone);

declare module "next-auth" {
    interface User extends UserType {}
    interface Session extends DefaultSession  {
        user: User | null,
        accessToken?: string,
        refreshToken?: string
        tokenExpired: boolean
    }
}

// declare module "next-auth/adapters" {
//     interface AdapterUser extends UserType {}
// }

declare module "next-auth/jwt" {
    interface JWT extends JwtType {
        user: User,
        error?: "RefreshAccessTokenError",
        errorMassage?: string
    }
}
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {

                    const { username, password } = await signInSchema.parseAsync(credentials);


                    const response = await fetch('https://dummyjson.com/auth/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            username: username,
                            password: password,
                            expiresInMins: 1
                        }),
                        credentials: 'include'
                    });
                    /*const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: username,
                            password: password,
                            // expiresInMins: 60
                        }),
                        credentials: 'include'
                    });*/

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || "Invalid credentials.");
                    }

                    const data = await response.json();
                    console.log(data)
                    // Assuming the API returns a user object with necessary fields
                    return  {
                        id: data.id,
                        name: data.firstName + " " + data.lastName,
                        email: data.email,
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken,
                        avatar: "",
                        premiumSubscription: false,
                        subId: ""
                    } as User;

                } catch (error) {
                    if (error instanceof ZodError) {
                        console.error("Validation error:", error);
                    } else {
                        console.error("Authorization error:", error);
                    }
                    return null;
                }
            },
        }),
    ],
    session: { strategy: "jwt" },
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        async jwt({ token,account, user }: { token: JWT; account: Account; user: User })  {
            if (token.accessToken) {
                const decodedToken = jwtDecode(token.accessToken);
                token.accessTokenExpires = decodedToken?.exp && decodedToken.exp * 1000;
            }
            if (account && user) {
                return {
                    ...token,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                    user,
                };
            }

            // Log the expiration time in local time zone
            const expirationDateLocal = dayjs(token.accessTokenExpires).tz(dayjs.tz.guess())
            // if (Date.now() < token.accessTokenExpires) {
            if (dayjs().isBefore(expirationDateLocal)) {
                return token;
            }

            // Access token has expired, try to update it
            //return token;
            return refreshAccessToken(token);
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            session.user = token.user || null;
            session.tokenExpired = token.error === "RefreshAccessTokenError";

            return session;
        },
        authorized({ request: { nextUrl }, auth }) {
            const isLoggedIn = !!auth?.user;
            const { pathname } = nextUrl;
            const isPublicRoute = ((PUBLIC_ROUTES.find(route => nextUrl.pathname.startsWith(route)))
                && !PROTECTED_ROUTES.find(route => nextUrl.pathname.includes(route.path)));
            if (isPublicRoute) {
                return true
            }
            if (!isLoggedIn) {
                return false
            }
            if ((pathname.startsWith(LOGIN_PATH) || pathname.startsWith(RESIGISTER_PATH)) && isLoggedIn) {
                return Response.redirect(new URL('/', nextUrl));
            }
            // Get user role (default to "user" if undefined)
            const userRoles = auth?.user?.role || ['user'];

            // Check if the route requires specific roles
            const protectedRoute = PROTECTED_ROUTES.find(route => pathname.startsWith(route.path));

            // If route has role restrictions, verify user role
            if (protectedRoute && isLoggedIn) {
                const isAuthorized = userRoles.some(role => protectedRoute.roles.includes(role));

                if (!isAuthorized) {
                    // Redirect if user does not have the necessary role
                    return Response.redirect(new URL('/', nextUrl));
                }
            }


            return !!auth;
        },



    },
    secret: process.env.NEXTAUTH_SECRET, // Set a secret for token signing
});
