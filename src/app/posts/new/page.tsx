import type { Metadata } from "next";
import Link from "next/link";
import NewPostClient from "./NewPostClient";

export const metadata: Metadata = {
  title: "مقاله جدید",
  description: "افزودن مقاله حقوقی جدید به وب‌سایت مرضیه فلاح.",
  alternates: {
    canonical: "/posts/new",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function NewPostPage() {
  return (
    <main className="legal-pattern min-h-[60vh]">
      <section className="border-b border-gold/20 bg-navy py-14 text-white">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            href="/posts"
            className="inline-flex items-center gap-1 text-sm font-medium text-gold-light transition-colors hover:text-gold"
          >
            <span aria-hidden="true">&rarr;</span>
            بازگشت به مقالات
          </Link>
          <h1 className="mt-4 text-4xl font-bold">مقاله جدید</h1>
          <p className="mt-3 leading-8 text-white/70">
            مقاله حقوقی جدید خود را با تکمیل فرم زیر منتشر کنید.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <NewPostClient />
      </div>
    </main>
  );
}
