import type { Metadata } from "next";
import Link from "next/link";
import { formatPersianDate } from "@/lib/format";
import { getAllPosts} from "@/app/actions/posts";
import {Post} from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "مقالات",
  description: "مقالات و مطالب حقوقی وکیل نور — مشاور حقوقی شهرستان نور مازندران.",
};

export default async function PostsPage() {
  const allPosts = await  getAllPosts();

  console.log({posts:allPosts})
  return (
    <main className="legal-pattern min-h-[60vh]">
      <section className="border-b border-gold/20 bg-navy py-14 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-gold">مطالب حقوقی</p>
            <h1 className="mt-2 text-4xl font-bold">مقالات</h1>
            <p className="mt-4 max-w-2xl leading-8 text-white/70">
              مجموعه‌ای از مطالب آموزشی و حقوقی برای آگاهی بیشتر مراجعین
              و هموطنان گرامی.
            </p>
          </div>
          <Link
            href="/posts/new"
            className="inline-flex shrink-0 items-center rounded-xl bg-gold px-6 py-3 text-sm font-bold text-navy transition-all hover:bg-gold-light"
          >
            + مقاله جدید
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="space-y-6">
          {allPosts?.map((post:Post) => (
            <article
              key={post?.id}
              className="legal-card group rounded-2xl p-7 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <time
                dateTime={post?.created_at}
                className="text-sm font-medium text-gold"
              >
                {formatPersianDate(post?.created_at)}
              </time>
              <h2 className="mt-3 text-2xl font-bold text-navy">
                <Link
                  href={`/posts/${post?.slug}`}
                  className="transition-colors group-hover:text-navy-light"
                >
                  {post?.title}
                </Link>
              </h2>
              <p className="mt-3 max-w-3xl leading-8 text-navy/70">
                {post?.excerpt}
              </p>
              <Link
                href={`/posts/${post?.slug}`}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-gold transition-colors hover:text-navy"
              >
                ادامه مطلب
                <span aria-hidden="true">&larr;</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
