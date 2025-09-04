import type { Metadata } from "next";
import LanguageProvider from "../i18n/LanguageProvider";
import "./globals.css";
import { geistSans, geistMono } from "@/shared/ui/theme/fonts";

export const metadata: Metadata = {
  title: "SayCasinoName",
  description: "SayCasinoName",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
