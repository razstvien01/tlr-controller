import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Provider } from "jotai";
import { AuthContextProvider } from "@/context/auth_context";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "TLR Controller",
  description:
    "It stands for Telepresence Robot Controller is a comprehensive solution for controlling a telepresence robot remotely.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>
          <AuthContextProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              {children}

              <Footer />
            </ThemeProvider>
          </AuthContextProvider>
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
