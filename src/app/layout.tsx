import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import { Next13NProgress } from "nextjs13-progress";
import { Toaster } from "@/components/toaster";
import { AuthProvider } from "@/contexts/auth-provider";
import { ThemeProvider } from "@/contexts/theme-provider";
import { getUserDataCookie } from "@/lib/auth/jwt";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hybrid Stateful/Stateless JWT Authentication in Next.js",
  description:
    "Hybrid Stateful/Stateless JWT Authentication in Next.js - learn all about it.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /**
   * Get the user data cookie on server so
   * it is immediately available to the auth provider
   * this prevents slight delay in waiting for the user data
   * to be available to the auth provider
   */
  const userData = await getUserDataCookie();

  return (
    <html lang="en">
      <Head>
        <meta name="apple-mobile-web-app-title" content="Designly" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          defaultTheme="system"
          storageKey="next-auth-example2-theme"
        >
          <AuthProvider userData={userData}>{children}</AuthProvider>
          <Toaster />
          <Next13NProgress color="#3d49b6" height={7} />
        </ThemeProvider>
      </body>
    </html>
  );
}
