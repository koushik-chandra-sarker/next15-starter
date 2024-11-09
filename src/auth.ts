import NextAuth, {Account, DefaultSession} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {signInSchema} from "@/lib/zod";
import {ZodError} from "zod";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { AdapterUser } from "next-auth/adapters";
import type {Session, User } from "next-auth";
import {JwtType, UserType} from "@/types/user";
import { JWT } from "next-auth/jwt";
import {jwtDecode} from "jwt-decode";
import {refreshAccessToken} from "@/app/services/auth/auth.service";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import toast from "react-hot-toast";
import Swal, {SweetAlertResult} from "sweetalert2";
import {LOGIN_PATH, PROTECTED_ROUTES, PUBLIC_ROUTES, RESIGISTER_PATH} from "@/lib/routes";
dayjs.extend(utc);
dayjs.extend(timezone);

declare module "next-auth" {
    interface User extends UserType {}
    interface Session {
        user: User,
        accessToken?: string, refreshToken?: string  & DefaultSession["user"]
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
                        })
                    });
                    const data = await response.json();

                    if (!response.ok) {
                        throw new Error(data.message || "Invalid credentials.");
                    }

                    // Assuming the API returns a user object with necessary fields
                    const user: User = {
                        avatar: "", premiumSubscription: false, subId: "",
                        id: data.id,
                        name: data.firstName + " " + data.lastName,
                        email: data.email,
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken
                    };

                    // return JSON object with the user data
                    return user
                } catch (error) {
                    if (error instanceof ZodError) {
                        // Return `null` to indicate that the credentials are invalid
                        return null
                    }
                }
            },
        }),
    ],
    session: { strategy: "jwt" },
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        authorized({ request: { nextUrl }, auth }) {
            const isLoggedIn = !!auth?.user;
            const { pathname } = nextUrl;
            console.log("pathname: ", pathname);
            const isPublicRoute = ((PUBLIC_ROUTES.find(route => nextUrl.pathname.startsWith(route)))
                && !PROTECTED_ROUTES.find(route => nextUrl.pathname.includes(route.path)));
            console.log("is public route: ", isPublicRoute);
            if (isPublicRoute) {
                return true
            }
            if ((pathname.startsWith(LOGIN_PATH) || pathname.startsWith(RESIGISTER_PATH)) && isLoggedIn) {
                return Response.redirect(new URL('/', nextUrl));
            }
            // Get user role (default to "user" if undefined)
            const userRole = auth?.user.role || 'user';

            // Check if the route requires specific roles
            const protectedRoute = PROTECTED_ROUTES.find(route => pathname.startsWith(route.path));

            // If route has role restrictions, verify user role
            if (protectedRoute) {
                const isAuthorized = protectedRoute.roles.includes(userRole);

                if (!isAuthorized) {
                    // Redirect if user does not have the necessary role
                    return Response.redirect(new URL('/', nextUrl));
                }
            }


            return !!auth;
        },
        jwt({ token,account, user }: { token: JWT; account: Account; user: User })  {
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
            console.log("expirationDateLocal", expirationDateLocal.format("YYYY-MM-DD HH:mm:ss"));
            // if (Date.now() < token.accessTokenExpires) {
            if (dayjs().isBefore(expirationDateLocal)) {
                console.log("**** returning previous token ******");
                return token;
            }

            // Access token has expired, try to update it
            console.log("**** Update Refresh token ******");
            //return token;
            return refreshAccessToken(token);
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            try {
                if (token.error === "RefreshAccessTokenError") {
                    session.tokenExpired = true;
                } else {
                    session.tokenExpired = false;
                    session.accessToken = token.accessToken;
                    session.user = token.user;
                }
                return session;
            } catch (error) {
                console.error('Session callback error:', error);
                session.tokenExpired = true;
                return session;
            }
        },

    },
    secret: process.env.NEXTAUTH_SECRET, // Set a secret for token signing
});
