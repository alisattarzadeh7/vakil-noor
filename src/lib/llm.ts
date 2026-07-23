import { getAllPosts } from "@/lib/db";
import { absoluteUrl, DEFAULT_DESCRIPTION, SITE_NAME } from "@/lib/seo";
import type { Post } from "@/lib/types";
import { isIndexablePost } from "@/lib/seo";

function siteHeader() {
  return [
    `# ${SITE_NAME}`,
    "",
    `> ${DEFAULT_DESCRIPTION}`,
    "",
    `Website: ${absoluteUrl()}`,
    "",
  ];
}

function postUrl(post: Post) {
  return absoluteUrl(`/posts/${post.slug}`);
}

export async function createLlmIndex() {
  const posts = (await getAllPosts()).filter(isIndexablePost);

  return [
    ...siteHeader(),
    "## Pages",
    "",
    `- [Home](${absoluteUrl()}): ${DEFAULT_DESCRIPTION}`,
    `- [Articles](${absoluteUrl("/posts")}): Legal articles and educational resources.`,
    "",
    "## Articles",
    "",
    ...posts.map((post) => `- [${post.title}](${postUrl(post)}): ${post.excerpt}`),
    "",
  ].join("\n");
}

export async function createLlmFull() {
  const posts = (await getAllPosts()).filter(isIndexablePost);

  return [
    ...siteHeader(),
    "## Pages",
    "",
    `### Home\n${absoluteUrl()}\n\n${DEFAULT_DESCRIPTION}`,
    `### Articles\n${absoluteUrl("/posts")}\n\nLegal articles and educational resources.`,
    "",
    "## Articles",
    "",
    ...posts.flatMap((post) => [
      `### ${post.title}`,
      "",
      `URL: ${postUrl(post)}`,
      `Published: ${post.created_at}`,
      "",
      post.excerpt,
      "",
      post.content,
      "",
    ]),
  ].join("\n");
}
