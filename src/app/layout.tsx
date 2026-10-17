
import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/Footer";
import Providers from "@/components/providers";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
