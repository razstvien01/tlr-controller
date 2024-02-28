
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Provider } from "jotai";
import SessionProvider from "./SessionProvider";
import axios from "axios";
import { useUserDataAtom } from "@/hooks/user-data-atom";
import { getUser } from "@/service/users.service";
import { getServerSession } from "next-auth";
// import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { useEffect } from "react";
import { AuthContextProvider } from "@/context/auth_context";

const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await getServerSession(authOptions);
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthContextProvider>
        {/* <SessionProvider session={session}> */}
          <Provider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              {children}
              {/* Footer */}
              <footer className="border-t-2 bg-primary p-4 text-foreground">
                <p>&copy; 2024 Telepresence Robot App</p>
                {/* Add any additional footer content */}
              </footer>
            </ThemeProvider>
          </Provider>
        {/* </SessionProvider> */}
        </AuthContextProvider>
      </body>
    </html>
  );
}
