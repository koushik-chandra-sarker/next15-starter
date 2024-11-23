import React from 'react';
import {Navbar} from "@/shared-components/header/Navbar";
import {auth} from "@/auth";

const DashboardLayout = async ({children}: {children: React.ReactNode}) => {
    const session = await auth()
    console.log("DashboardLayout", session)
    return (
        <div>
            <Navbar session={session}/>
            {children}
        </div>
    );
};

export default DashboardLayout;
