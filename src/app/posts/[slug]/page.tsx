import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPersianDate } from "@/lib/format";
import {getAllPosts, getPostBySlug} from "@/app/actions/posts";
import {Post} from "@/lib/types";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts =await  getAllPosts();
  console.log({posts})
  return posts.filter((post:Post)=>!!post.slug).map((post:Post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post =await getPostBySlug(slug);
  console.log({slug:post})
  if (!post) {
    return { title: "مقاله یافت نشد" };
  }

  return {
    title: post?.title,
    description: post?.excerpt,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post =await  getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="legal-pattern min-h-[60vh]">
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
            {post.content.split("\n\n").map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
