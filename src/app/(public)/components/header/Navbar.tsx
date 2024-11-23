"use client";
import React, {useEffect} from 'react';
import Link from "next/link";
import {MenuItem} from "primereact/menuitem";
import {InputText} from "primereact/inputtext";
import {Avatar} from "primereact/avatar";
import {Menubar} from "primereact/menubar";
import {Button} from "primereact/button";
import {logout} from "@/app/services/auth/auth.service";
import {useSession} from "next-auth/react";
import {LoginLogoutButton} from "@/shared-components/header/LoginLogoutButton";

const itemRenderer = (item: MenuItem) => (
    <Link href={item.url? item.url : "/public"} className="flex align-items-center p-menuitem-link">
        <span className={item.icon} />
        <span className="mx-2">{item.label}</span>
    </Link>
);
const items: MenuItem[] = [
    {
        label: 'Home',
        icon: 'pi pi-home',
        url: "/",
        template: itemRenderer
    },
    {
        label: 'Public',
        icon: 'pi pi-envelope',
        url: "/public",
        template: itemRenderer
    },
    {
        label: 'Private',
        icon: 'pi pi-envelope',
        url: "/dashboard",
        template: itemRenderer
    }
];

export const Navbar = () => {
    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" className=" h-10 mr-2"></img>;



    const end = (
        <div className="test flex items-center gap-2">
            <Link href="/auth/login">
                <Button
                    label="Login"
                    icon="pi pi-sign-in"
                    iconPos="right"
                    size="small"
                />
            </Link>
            <InputText placeholder="Search" type="text" className="h-10 sm:w-auto" />
            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
        </div>
    );
    return (
        <>
            <Menubar model={items} start={start} end={end} />
        </>
    );
};
