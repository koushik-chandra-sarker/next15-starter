import React from 'react';
import {Navbar} from "@/shared-components/header/Navbar";
import {auth} from "@/auth";

const PublicLayout = async ({children}: {children: React.ReactNode}) => {
    const session = await auth();
    return (
        <div>
            <Navbar session={session}/>
            {children}
        </div>
    );
};

export default PublicLayout;
