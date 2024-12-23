import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const garvFont = localFont({
  src: [
    {
      path: "./fonts/idk.woff2",
      weight: "400",
    },
    {
      path: "./fonts/normal.woff2",
      weight: "300",
    },
    {
      path: "./fonts/mono.woff",
      weight: "500",
    },
  ],
  variable: "--garv-font",
});

export const metadata: Metadata = {
  title: "Garvs stuff",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${garvFont.variable}  font-garvFont mix-blend-normal   antialiased bg-[#faf9f8] text-[rgba(0,0,0,0.85)]`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
