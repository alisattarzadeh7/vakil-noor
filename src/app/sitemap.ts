import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/db";
import { absoluteUrl, isIndexablePost, SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

function toDate(value: string) {
  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? new Date() : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const indexablePosts = posts.filter(isIndexablePost);
  const latestPostDate = indexablePosts[0]?.created_at
    ? toDate(indexablePosts[0].created_at)
    : new Date();

  return [
    {
      url: SITE_URL,
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
    ...indexablePosts.map((post) => ({
      url: absoluteUrl(`/posts/${post.slug}`),
      lastModified: toDate(post.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
