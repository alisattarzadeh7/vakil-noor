import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/db";

export const dynamic = "force-dynamic";

const SITE_URL = "https://vakilnoor.ir";

function absoluteUrl(pathname: string) {
  return new URL(pathname, `${SITE_URL}/`).toString();
}

function toDate(value: string) {
  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? new Date() : date;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latestPostDate = posts[0]?.created_at
    ? toDate(posts[0].created_at)
    : new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified: latestPostDate,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/posts"),
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: absoluteUrl(`/posts/${post.slug}`),
      lastModified: toDate(post.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
