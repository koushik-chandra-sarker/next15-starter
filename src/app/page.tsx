"use client"
import React from 'react';
import {Button} from "primereact/button";
import {FloatLabel} from "primereact/floatlabel";
import { useState} from "react";
import {useSession} from "next-auth/react";
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { MenuItem } from 'primereact/menuitem';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import Link from "next/link";
const itemRenderer = (item) => (
    <Link href={item.url} className="flex align-items-center p-menuitem-link">
        <span className={item.icon} />
        <span className="mx-2">{item.label}</span>
        {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
    </Link>
);
const items: MenuItem[] = [
    {
        label: 'Home',
        icon: 'pi pi-home',
        url: "/"
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
const Home = ()=> {
    const [value, setValue] = useState('');
    const { data: session } = useSession();


    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" className=" h-10 mr-2"></img>;
    const end = (
        <div className="flex items-center gap-2">
            <InputText placeholder="Search" type="text" className="h-10 sm:w-auto" />
            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
        </div>
    );
  return (
    <div>
        <Menubar model={items} start={start} end={end} />
      <Button label="Submit"  />
        <h1 className={"bg-amber-300"}>this is tailwind test</h1>
        <FloatLabel className={"mt-10"}>
            <InputText id="username" value={value} onChange={(e) => setValue(e.target.value)} />
            <label htmlFor="username">Username</label>
        </FloatLabel>
        <h3>this is working fine</h3>
        <p>{ session?.user?.accessToken}</p>
    </div>
  );
}
export default Home;
