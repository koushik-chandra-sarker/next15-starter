"use client";
import React from "react";
import { logout } from "@/app/services/auth/auth.service";
import { Button } from "primereact/button";
import Link from "next/link";

import {Session} from "next-auth";

const LoginLogoutButton = ({session}: {session?: Session | null}) => {
    const handleLogout = async () => {
        await logout()
    }
    if (session?.user){
        return (
            <Button
                label="Logout"
                icon="pi pi-sign-out"
                iconPos="right"
                size="small"
                onClick={handleLogout} />
        )
    }
    return (
        <Link href="/auth/login">
            <Button
                label="Login"
                icon="pi pi-sign-in"
                iconPos="right"
                size="small"
            />
        </Link>
    )

};

export default LoginLogoutButton;
