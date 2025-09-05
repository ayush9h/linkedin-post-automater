import type { Metadata } from "next";
import { Funnel_Display } from "next/font/google";
import "./globals.css";

const funnel = Funnel_Display({
  variable: "--font-funnel",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Linkedin Post Automater",
  description: "Automate your linkedin easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${funnel.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
