import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "مرضیه فلاح | مشاور حقوقی",
    template: "%s | مرضیه فلاح",
  },
  description:
    "وکیل پایه یک دادگستری و مشاور حقوقی در شهرستان نور مازندران — ارائه مشاوره و خدمات حقوقی تخصصی.",
  verification: {
    google: "VfqprOi5PuZXc1cm2DRkk9430Cu-rdIS3Tx_3oXKOiQ",
  },
  icons:{
    icon:{
      url:'/law.png'
    }
  }
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
    <AuthProvider>
      <Navbar/>
      <div className="flex-1">{children}</div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
