"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import {CredentialsType} from "@/types/login";
import {JwtType} from "@/types/user";
import Swal from 'sweetalert2'
export async function login({ username, password }: CredentialsType, callbackUrl: string) {
    try {

        console.log("callbackUrl", callbackUrl);

        // Call signIn with the callbackUrl
        await signIn("credentials", { username, password, redirectTo: callbackUrl });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        message: 'Invalid credentials',
                    };
                default:
                    return {
                        message: 'Something went wrong.',
                    };
            }
        }
        throw error;
    }
}
export async function logout() {
    await signOut();
}

export async function refreshAccessToken(token: JwtType) {
    console.log("Refreshing access token...");
    try {

        const response = await fetch(`https://dummyjson.com/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                refreshToken: '/* YOUR_REFRESH_TOKEN_HERE */', // Optional, if not provided, the server will use the cookie
                expiresInMins: 2, // optional (FOR ACCESS TOKEN), defaults to 60
            }),
            credentials: 'include' // Include cookies (e.g., accessToken) in the request
        })

        const tokens = await response.json();

        if (!response.ok) {
           throw tokens;
        }

        return {
            ...token,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken ?? token.refreshToken, // Fall back to old refresh token
        };
    } catch (error) {
        return {
            ...token,
            error: "RefreshAccessTokenError",
            errorMassage: error
        };
    }
}
