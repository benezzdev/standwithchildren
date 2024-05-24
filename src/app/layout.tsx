import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { AuthContextProvider } from "@/components/context/AuthContext";
import { ApolloWrapper } from "@/components/context/AppoloWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stand With Children",
  description: "Children charity app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <AuthContextProvider>
            <header>
              <Navbar></Navbar>
            </header>
            {children}
          </AuthContextProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
