"use client";
import "./globals.scss";
import "../../public/theme/themes/tailwind/tailwind-light/theme.scss";
import 'sweetalert2/src/sweetalert2.scss'
import {Toaster} from "react-hot-toast";
import {SessionProvider} from "next-auth/react";
import withAuth from "@/app/hoc/withAuth";


const RootLayout = ({ children, }: { children: React.ReactNode; }) => {
  return (
    <html lang="en">
      <body>
      <Toaster />
      <SessionProvider>
        {children}
      </SessionProvider>
      </body>
    </html>
  );
}

export default RootLayout;
