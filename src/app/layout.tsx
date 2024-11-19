"use client";
import "./globals.scss";
import "../../public/theme/themes/tailwind/tailwind-light/theme.scss";
import 'sweetalert2/src/sweetalert2.scss'
import {Toaster} from "react-hot-toast";
import {SessionProvider} from "next-auth/react";
import SessionExpirationWatcher from "@/lib/SessionExpirationWatcher";


const RootLayout = ({ children, }: { children: React.ReactNode; }) => {
  return (
    <html lang="en">
      <body>
      <Toaster />
      <SessionProvider>
          <SessionExpirationWatcher/>
        {children}
      </SessionProvider>
      </body>
    </html>
  );
}

export default RootLayout;
