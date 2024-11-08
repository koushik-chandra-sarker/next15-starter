
import "./globals.scss";
import "../../public/theme/themes/tailwind/tailwind-light/theme.scss";
import {Toaster} from "react-hot-toast";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <Toaster />
        {children}
      </body>
    </html>
  );
}
