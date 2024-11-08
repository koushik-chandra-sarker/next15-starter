import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    // Call the dummyjson API to verify credentials
                    const response = await fetch('https://dummyjson.com/auth/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            username: credentials.email,
                            password: credentials.password
                        })
                    });

                    const data = await response.json();

                    if (!response.ok) {
                        throw new Error(data.message || "Invalid credentials.");
                    }

                    // Assuming the API returns a user object with necessary fields
                    const user = {
                        id: data.id,
                        name: data.firstName + " " + data.lastName,
                        email: credentials.email,
                        token: data.token, // Use this if the API provides a token
                    };

                    return user;
                } catch (error) {
                    console.error("Login error:", error);
                    throw new Error("Invalid credentials.");
                }
            },
        }),
    ],
    /*callbacks: {
        async session({ session, token }) {
            // Pass the token to the session if needed
            session.user = token.user;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        }
    },*/
    secret: process.env.NEXTAUTH_SECRET, // Set a secret for token signing
});
