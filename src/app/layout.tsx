
import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/Footer";
import Providers from "@/components/providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Campus Tech | Student Electronics Store",
  description:
    "Explore practical electronics and accessories for student life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Suspense>
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}

