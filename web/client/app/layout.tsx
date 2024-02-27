// "use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { AuthContextProvider, UserAuth } from "@/context/auth_context";
import { Provider } from "jotai";
import SessionProvider from "./SessionProvider";
import { use, useEffect } from "react";
import axios from "axios";
import { useUserDataAtom } from "@/hooks/user-data-atom";
import { getUser } from "@/service/users.service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};



const getSession = async () => {
  return await getServerSession(authOptions)
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const session = await getServerSession(authOptions);
  // const { user = {} } = UserAuth() || {};
  // const { uid = "" } = user || {};
  // const [userData, setUserData] = useUserDataAtom();

  // useEffect(() => {
  //   if (user) {
  //     const fetchUser = async () => {
  //       setUserData(await getUser(uid));
  //     };

  //     fetchUser();
      
  //     console.log("FETCHED USER DATA", user.uid)
  //     console.log(userData)
  //   }

  //   return () => {};
  // }, [user, uid]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* <AuthContextProvider> */}
          <SessionProvider session={session}>
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
          </SessionProvider>
        {/* </AuthContextProvider> */}
      </body>
    </html>
  );
}
