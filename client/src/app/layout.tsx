import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import SessionProviderClient from "./providers/SessionProviderClient";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";

const funnel = Geist({
  variable: "--font-funnel",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Linkedin Post Automater",
  description: "Automate your linkedin easily",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions); 

  return (
    <html lang="en">
      <body className={`${funnel.variable} antialiased`}>
        <SessionProviderClient session={session}>
          {children}
        </SessionProviderClient>
      </body>
    </html>
  );
}