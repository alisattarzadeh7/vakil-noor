import type { Metadata } from "next";
import Link from "next/link";
import { formatPersianDate } from "@/lib/format";
import type { Post } from "@/lib/types";
import DeletePostButton from "@/components/DeletePostButton";
import NewPostLink from "@/components/NewPostLink";
import { absoluteUrl, isIndexablePost } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "مقالات حقوقی",
  description:
    "مقالات و مطالب حقوقی مرضیه فلاح؛ راهنماهای کاربردی درباره قراردادها، دعاوی و مشاوره حقوقی.",
  alternates: { canonical: "/posts" },
  openGraph: {
    title: "مقالات حقوقی مرضیه فلاح",
    description: "مطالب آموزشی و حقوقی برای تصمیم‌گیری آگاهانه‌تر.",
    url: "/posts",
    type: "website",
  },
};

// Replace this with `await getAllPosts()` when the production database is available.
const usingMockPosts = true;

const mockPosts: Post[] = [
  {
    id: 1,
    slug: "nokat-mohim-ghabl-emza-gharardad",
    title: "نکات مهم قبل از امضای قرارداد",
    excerpt:
      "پیش از امضای هر قرارداد، بررسی چند نکته کلیدی می‌تواند از اختلاف‌های آینده و هزینه‌های پیش‌بینی‌نشده جلوگیری کند.",
    content: "",
    created_at: "2026-07-18T10:00:00.000Z",
  },
  {
    id: 2,
    slug: "marahal-tarh-dava-dadgah",
    title: "مراحل طرح دعوا در دادگاه‌های عمومی",
    excerpt:
      "از تنظیم دادخواست تا پیگیری پرونده، با مسیر کلی رسیدگی در مراجع قضایی و مدارک ضروری آشنا شوید.",
    content: "",
    created_at: "2026-07-10T14:30:00.000Z",
  },
  {
    id: 3,
    slug: "tafavot-vakil-moshavir",
    title: "تفاوت وکیل پایه یک و مشاور حقوقی چیست؟",
    excerpt:
      "شناخت تفاوت نقش‌ها و حدود خدمات حقوقی، به انتخاب آگاهانه‌تر برای پیگیری امور شما کمک می‌کند.",
    content: "",
    created_at: "2026-07-02T09:15:00.000Z",
  },
  {
    id: 4,
    slug: "rahnamaye-madarek-davaye-madani",
    title: "راهنمای آماده‌سازی مدارک برای دعاوی مدنی",
    excerpt:
      "مدارک و مستندات، بخش مهمی از هر پرونده هستند. این راهنما به شما کمک می‌کند با آمادگی بیشتری اقدام کنید.",
    content: "",
    created_at: "2026-06-24T11:45:00.000Z",
  },
];

export default async function PostsPage() {
  const allPosts = mockPosts;
  const indexablePosts = allPosts.filter(isIndexablePost);
  const [featuredPost, ...otherPosts] = allPosts;
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: indexablePosts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/posts/${post.slug}`),
      name: post.title,
    })),
  };

  return (
    <main className="legal-pattern min-h-[60vh]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <section className="relative overflow-hidden border-b border-gold/20 bg-navy text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,168,76,0.18),_transparent_48%)]" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full border border-gold/20" />

        <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-gold">
                <span className="h-px w-8 bg-gold" />
                مطالب حقوقی
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                مجله حقوقی
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-9 text-white/75">
                مجموعه‌ای از راهنماهای کاربردی و مطالب آموزشی برای تصمیم‌گیری آگاهانه‌تر در مسائل حقوقی.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="rounded-2xl border border-gold/25 bg-white/5 px-5 py-3 backdrop-blur-sm">
                <p className="text-2xl font-bold text-gold">{allPosts.length}</p>
                <p className="mt-1 text-xs text-white/60">مقاله منتشر شده</p>
              </div>
              {!usingMockPosts && <NewPostLink />}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        {featuredPost ? (
          <>
            <div className="mb-7 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-gold">تازه‌ترین مطلب</p>
                <h2 className="mt-1 text-2xl font-bold text-navy">برای شروع مطالعه کنید</h2>
              </div>
              <span className="hidden text-sm text-navy/50 sm:block">دانش حقوقی، به زبان روشن</span>
            </div>

            <article className="legal-card group relative overflow-hidden rounded-3xl p-7 sm:p-10">
              <div className="pointer-events-none absolute -left-10 -top-16 text-[12rem] font-bold leading-none text-gold/[0.07]">
                ۰۱
              </div>
              <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div className="max-w-3xl">
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <time dateTime={featuredPost.created_at} className="font-semibold text-gold">
                      {formatPersianDate(featuredPost.created_at)}
                    </time>
                    <span className="h-1 w-1 rounded-full bg-navy/25" />
                    <span className="text-navy/55">مقاله آموزشی</span>
                  </div>
                  <h2 className="mt-5 text-3xl font-bold leading-tight text-navy sm:text-4xl">
                    <Link href={`/posts/${featuredPost.slug}`} className="transition-colors group-hover:text-navy-light">
                      {featuredPost.title}
                    </Link>
                  </h2>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-navy/70 sm:text-lg">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-5">
                  <DeletePostButton postId={featuredPost.id} />
                  <Link
                    href={`/posts/${featuredPost.slug}`}
                    className="inline-flex items-center gap-3 rounded-xl bg-navy px-5 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-navy-light hover:shadow-lg"
                  >
                    مطالعه مقاله
                    <span aria-hidden="true">&larr;</span>
                  </Link>
                </div>
              </div>
            </article>

            <section className="mt-16">
              <div className="mb-7 flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gold">بیشتر بخوانید</p>
                  <h2 className="mt-1 text-2xl font-bold text-navy">مقاله‌های حقوقی</h2>
                </div>
                <span className="text-sm text-navy/50">{otherPosts.length} مطلب دیگر</span>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {otherPosts.map((post, index) => (
                  <article
                    key={post.id}
                    className="legal-card group relative flex min-h-80 flex-col overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <span className="absolute left-5 top-3 text-5xl font-bold text-gold/10" aria-hidden="true">
                      {String(index + 2).padStart(2, "0")}
                    </span>
                    <div className="relative flex items-center justify-between gap-3">
                      <time dateTime={post.created_at} className="text-sm font-semibold text-gold">
                        {formatPersianDate(post.created_at)}
                      </time>
                      <DeletePostButton postId={post.id} />
                    </div>
                    <h3 className="relative mt-6 text-xl font-bold leading-8 text-navy">
                      <Link href={`/posts/${post.slug}`} className="transition-colors group-hover:text-navy-light">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="relative mt-4 line-clamp-3 leading-8 text-navy/70">{post.excerpt}</p>
                    <Link
                      href={`/posts/${post.slug}`}
                      className="relative mt-auto inline-flex w-fit items-center gap-2 pt-7 text-sm font-bold text-gold transition-colors hover:text-navy"
                    >
                      ادامه مطلب
                      <span aria-hidden="true">&larr;</span>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          </>
        ) : null}
      </div>
    </main>
  );
}
