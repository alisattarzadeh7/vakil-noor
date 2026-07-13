import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPersianDate } from "@/lib/format";
import { getAllPosts, getPostBySlug } from "@/app/actions/posts";
import type { Post } from "@/lib/types";
import {
  absoluteUrl,
  isIndexablePost,
  PERSON_NAME,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts
    .filter(isIndexablePost)
    .map((post: Post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return { title: "مقاله یافت نشد" };
  }

  const indexable = isIndexablePost(post);

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/posts/${post.slug}`,
    },
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
    twitter: {
      card: "summary",
      title: post.title,
      description: post.excerpt,
    },
    robots: indexable
      ? undefined
      : {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const postUrl = absoluteUrl(`/posts/${post.slug}`);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.created_at,
    dateModified: post.created_at,
    inLanguage: "fa-IR",
    mainEntityOfPage: postUrl,
    author: {
      "@type": "Person",
      name: PERSON_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/law.png"),
      },
    },
    image: absoluteUrl("/lawyer.png"),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "خانه",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "مقالات",
        item: absoluteUrl("/posts"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  return (
    <main className="legal-pattern min-h-[60vh]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleJsonLd, breadcrumbJsonLd]),
        }}
      />
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <Link
          href="/posts"
          className="inline-flex items-center gap-1 text-sm font-semibold text-gold transition-colors hover:text-navy"
        >
          <span aria-hidden="true">&rarr;</span>
          بازگشت به مقالات
        </Link>

        <article className="legal-card mt-8 rounded-2xl p-8 sm:p-10">
          <time
            dateTime={post.created_at}
            className="text-sm font-medium text-gold"
          >
            {formatPersianDate(post.created_at)}
          </time>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-navy sm:text-4xl">
            {post.title}
          </h1>
          <div className="gold-divider my-8 opacity-50" />
          <div className="space-y-6 text-base leading-9 text-navy/80 break-words">
            <p className="font-medium text-navy/70">{post.excerpt}</p>
            {post.content.split("\n\n").map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
