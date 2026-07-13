import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import "./globals.css";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | مرضیه فلاح",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/lawyer.png",
        width: 800,
        height: 800,
        alt: "مرضیه فلاح، وکیل پایه یک دادگستری در نور مازندران",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/lawyer.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "VfqprOi5PuZXc1cm2DRkk9430Cu-rdIS3Tx_3oXKOiQ",
  },
  icons: {
    icon: {
      url: "/law.png",
    },
  },
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
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
