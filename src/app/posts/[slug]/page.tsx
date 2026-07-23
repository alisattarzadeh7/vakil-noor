import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPersianDate } from "@/lib/format";
import type { Post } from "@/lib/types";
import { getPostBySlug } from "@/app/actions/posts";
import {
  absoluteUrl,
  CONTACT_PHONE,
  isIndexablePost,
  PERSON_NAME,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

// Replace `mockPosts.find(...)` with `await getPostBySlug(slug)` when the database is available.
const mockPosts: Post[] = [
  {
    id: 1,
    slug: "nokat-mohim-ghabl-emza-gharardad",
    title: "نکات مهم قبل از امضای قرارداد",
    excerpt:
      "پیش از امضای هر قرارداد، بررسی چند نکته کلیدی می‌تواند از اختلاف‌های آینده و هزینه‌های پیش‌بینی‌نشده جلوگیری کند.",
    content: `قرارداد فقط یک متن برای امضا نیست؛ سندی است که تعهدات، حقوق و مسیر حل اختلاف میان طرفین را مشخص می‌کند. به همین دلیل، پیش از امضا باید زمان کافی برای مطالعه و بررسی آن در نظر گرفته شود.

نخست مطمئن شوید مشخصات طرفین، موضوع قرارداد و حدود تعهدات هر شخص به‌صورت روشن و بدون ابهام نوشته شده است. استفاده از عبارت‌های کلی یا ناقص، در آینده می‌تواند باعث برداشت‌های متفاوت شود.

زمان‌بندی انجام تعهدات، مبلغ و شیوه پرداخت، ضمانت اجرا و شرایط فسخ از بخش‌های مهم یک قرارداد هستند. بهتر است برای هر تعهد، زمان مشخص و نتیجه تأخیر یا انجام‌نشدن آن نیز تعیین شود.

اگر بندی از قرارداد برای شما مبهم است، قبل از امضا درباره آن سؤال کنید و در صورت نیاز از مشاوره حقوقی استفاده کنید. اصلاح یک بند پیش از امضا معمولاً بسیار ساده‌تر از حل اختلاف پس از آن است.`,
    created_at: "2026-07-18T10:00:00.000Z",
  },
  {
    id: 2,
    slug: "marahal-tarh-dava-dadgah",
    title: "مراحل طرح دعوا در دادگاه‌های عمومی",
    excerpt:
      "از تنظیم دادخواست تا پیگیری پرونده، با مسیر کلی رسیدگی در مراجع قضایی و مدارک ضروری آشنا شوید.",
    content: `طرح دعوا معمولاً با بررسی دقیق موضوع، جمع‌آوری مدارک و تعیین خواسته آغاز می‌شود. پیش از هر اقدامی باید مشخص شود که چه مرجعی صلاحیت رسیدگی دارد و چه دلایلی برای اثبات ادعا در اختیار شماست.

دادخواست باید مشخصات طرفین، خواسته، دلایل و مستندات را به‌طور روشن بیان کند. کامل‌بودن اطلاعات و پیوست‌ها می‌تواند از تأخیرهای غیرضروری در روند رسیدگی جلوگیری کند.

پس از ثبت، پرونده به مرجع صالح ارجاع می‌شود و ابلاغ‌ها و زمان جلسات از مسیر قانونی اطلاع‌رسانی خواهند شد. پیگیری به‌موقع ابلاغ‌ها و ارائه پاسخ در مهلت مقرر اهمیت زیادی دارد.

هر پرونده شرایط خاص خود را دارد؛ بنابراین این مراحل یک راهنمای عمومی هستند و برای تصمیم‌گیری درباره یک پرونده مشخص، باید مدارک و وضعیت آن جداگانه بررسی شود.`,
    created_at: "2026-07-10T14:30:00.000Z",
  },
  {
    id: 3,
    slug: "tafavot-vakil-moshavir",
    title: "تفاوت وکیل پایه یک و مشاور حقوقی چیست؟",
    excerpt:
      "شناخت تفاوت نقش‌ها و حدود خدمات حقوقی، به انتخاب آگاهانه‌تر برای پیگیری امور شما کمک می‌کند.",
    content: `در مسائل حقوقی، انتخاب فرد مناسب برای دریافت راهنمایی می‌تواند بر کیفیت تصمیم‌گیری و پیگیری موضوع اثرگذار باشد. به همین دلیل، شناخت نقش‌های حرفه‌ای در این حوزه اهمیت دارد.

وکیل دادگستری با داشتن پروانه وکالت، می‌تواند در حدود قوانین و مقررات از موکل خود در مراجع قضایی و اداری دفاع یا نمایندگی کند. دامنه و شرایط این نمایندگی به موضوع پرونده و توافق میان وکیل و موکل بستگی دارد.

مشاوره حقوقی به بررسی موضوع، تحلیل اسناد و توضیح گزینه‌های قانونی کمک می‌کند. گاهی پیش از اقدام قضایی، یک مشاوره دقیق می‌تواند مسیر مناسب‌تر و کم‌هزینه‌تری را روشن کند.

برای انتخاب خدمات مناسب، موضوع پرونده، مرحله‌ای که در آن قرار دارید و نیاز شما به پیگیری یا صرفاً دریافت راهنمایی را در نظر بگیرید.`,
    created_at: "2026-07-02T09:15:00.000Z",
  },
  {
    id: 4,
    slug: "rahnamaye-madarek-davaye-madani",
    title: "راهنمای آماده‌سازی مدارک برای دعاوی مدنی",
    excerpt:
      "مدارک و مستندات، بخش مهمی از هر پرونده هستند. این راهنما به شما کمک می‌کند با آمادگی بیشتری اقدام کنید.",
    content: `در بسیاری از دعاوی مدنی، اسناد و مدارک نقش مهمی در روشن‌شدن ادعا و دفاع دارند. آماده‌سازی منظم این مدارک از ابتدای کار، بررسی پرونده را دقیق‌تر و پیگیری آن را آسان‌تر می‌کند.

قراردادها، رسیدها، مکاتبات، پیام‌ها، شهادت شهود و هر سند مرتبط دیگر را به ترتیب زمان وقوع موضوع دسته‌بندی کنید. اصل مدارک را در محل امن نگه دارید و برای ارائه، نسخه‌های موردنیاز تهیه کنید.

در کنار مدارک، یک شرح کوتاه و زمان‌بندی‌شده از اتفاقات بنویسید. این کار به شما کمک می‌کند جزئیات مهم را فراموش نکنید و تصویر روشن‌تری از موضوع در اختیار مشاور یا وکیل قرار دهید.

ارزش و نحوه استفاده از هر مدرک به شرایط پرونده بستگی دارد؛ بنابراین پیش از ارائه یا اقدام، بهتر است مدارک مرتبط با موضوع خود را بررسی تخصصی کنید.`,
    created_at: "2026-06-24T11:45:00.000Z",
  },
];

function findMockPost(slug: string) {
  return mockPosts.find((post) => post.slug === slug);
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return { title: "مقاله یافت نشد" };
  }

  if (!post) return { title: "مقاله یافت نشد" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/posts/${post.slug}` },
    openGraph: {
      type: "article",
      locale: "fa_IR",
      url: `/posts/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.created_at,
      modifiedTime: post.created_at,
      authors: [SITE_URL],
      siteName: SITE_NAME,
    },
    twitter: { card: "summary", title: post.title, description: post.excerpt },
    robots: isIndexablePost(post)
      ? undefined
      : { index: false, follow: false, googleBot: { index: false, follow: false } },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = findMockPost(slug);

  if (!post) notFound();

  const postUrl = absoluteUrl(`/posts/${post.slug}`);
  const relatedPosts = mockPosts.filter((item) => item.slug !== post.slug).slice(0, 2);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.created_at,
    dateModified: post.created_at,
    inLanguage: "fa-IR",
    mainEntityOfPage: postUrl,
    author: { "@type": "Person", name: PERSON_NAME, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: absoluteUrl("/law.png") },
    },
    image: absoluteUrl("/lawyer.png"),
  };

  return (
    <main className="legal-pattern min-h-[60vh]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <section className="relative overflow-hidden border-b border-gold/20 bg-navy text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(201,168,76,0.16),_transparent_50%)]" />
        <div className="relative mx-auto max-w-4xl px-6 py-12 sm:py-16">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-light"
          >
            <span aria-hidden="true">&rarr;</span>
            بازگشت به مقاله‌ها
          </Link>
          <div className="mt-10 flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-gold-light">مقاله آموزشی</span>
            <time dateTime={post.created_at} className="text-white/60">
              {formatPersianDate(post.created_at)}
            </time>
            <span className="text-white/30">•</span>
            <span className="text-white/60">حدود ۴ دقیقه مطالعه</span>
          </div>
          <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-9 text-white/75">{post.excerpt}</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          <article className="legal-card rounded-3xl p-7 sm:p-10">
            <div className="gold-divider mb-8 opacity-60" />
            <div className="space-y-7 break-words text-base leading-9 text-navy/80 sm:text-lg">
              {post.content.split("\n\n").map((paragraph, index) => (
                <p key={paragraph.slice(0, 40)} className={index === 0 ? "font-medium text-navy" : undefined}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-10 rounded-2xl border border-gold/20 bg-gold/5 p-5 text-sm leading-7 text-navy/70">
              <strong className="text-navy">یادآوری:</strong> این مطلب برای آشنایی عمومی تهیه شده است و جایگزین بررسی شرایط و مدارک هر پرونده نیست.
            </div>
          </article>

          <aside className="space-y-5 lg:sticky lg:top-6">
            <div className="legal-card rounded-2xl p-6">
              <p className="text-sm font-semibold text-gold">اطلاعات مقاله</p>
              <div className="gold-divider my-4 opacity-50" />
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-navy/50">تاریخ انتشار</dt>
                  <dd className="mt-1 font-semibold text-navy">{formatPersianDate(post.created_at)}</dd>
                </div>
                <div>
                  <dt className="text-navy/50">موضوع</dt>
                  <dd className="mt-1 font-semibold text-navy">آموزش حقوقی</dd>
                </div>
              </dl>
            </div>
            <div className="rounded-2xl bg-navy p-6 text-white shadow-lg shadow-navy/15">
              <p className="text-sm font-semibold text-gold">نیاز به راهنمایی دارید؟</p>
              <p className="mt-3 text-sm leading-7 text-white/70">برای بررسی دقیق موضوع خود، می‌توانید برای مشاوره تماس بگیرید.</p>
              <a
                href={`tel:${CONTACT_PHONE}`}
                className="mt-5 inline-flex rounded-xl bg-gold px-4 py-2.5 text-sm font-bold text-navy transition-colors hover:bg-gold-light"
              >
                تماس برای مشاوره
              </a>
            </div>
          </aside>
        </div>

        <section className="mt-16 border-t border-gold/20 pt-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-gold">مطالعه بیشتر</p>
              <h2 className="mt-1 text-2xl font-bold text-navy">مقاله‌های مرتبط</h2>
            </div>
            <Link href="/posts" className="text-sm font-semibold text-gold hover:text-navy">
              همه مقاله‌ها
            </Link>
          </div>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {relatedPosts.map((related) => (
              <Link
                key={related.id}
                href={`/posts/${related.slug}`}
                className="legal-card group rounded-2xl p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <time dateTime={related.created_at} className="text-sm font-semibold text-gold">
                  {formatPersianDate(related.created_at)}
                </time>
                <h3 className="mt-3 text-xl font-bold leading-8 text-navy transition-colors group-hover:text-navy-light">
                  {related.title}
                </h3>
                <p className="mt-3 line-clamp-2 leading-7 text-navy/70">{related.excerpt}</p>
                <span className="mt-5 inline-flex text-sm font-bold text-gold">ادامه مطلب &larr;</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
