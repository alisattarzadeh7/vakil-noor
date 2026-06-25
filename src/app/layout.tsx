import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "وکیل نور | مشاور حقوقی",
    template: "%s | وکیل نور",
  },
  description:
    "وکیل پایه یک دادگستری و مشاور حقوقی در شهرستان نور مازندران — ارائه مشاوره و خدمات حقوقی تخصصی.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-parchment text-navy">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
