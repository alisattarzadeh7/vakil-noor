"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import type {Post} from "@/lib/types";

export async function createPost(formData: FormData) {
    const { env } =await getCloudflareContext({ async: true });

    const title = String(formData.get("title") ?? "");
    const content = String(formData.get("content") ?? "");
    const slug = String(formData.get("slug") ?? "");
    const excerpt = String(formData.get("excerpt") ?? "");
    console.log(Object.keys(env));
    const result = await env.DB.prepare(`
          INSERT INTO posts (title, slug, excerpt, content, created_at)
          VALUES (?, ?, ?, ?, ?)
      `)
        .bind(title,slug,excerpt,content, new Date().toISOString())
        .run();
    console.log({result})
    const post = await env.DB.prepare("SELECT * FROM posts WHERE id = ?")
        .bind(result.meta.last_row_id)
        .first() as Post;


    return post;
}


export async function getAllPosts() {
    const { env } = await getCloudflareContext({ async: true });

    const result = await env.DB.prepare(`
    SELECT *
    FROM posts
    ORDER BY created_at DESC
  `).all();

    return result.results

}


export async function deletePost(id: number) {
    const { env } = await getCloudflareContext({ async: true });
    await env.DB.prepare("DELETE FROM posts WHERE id = ?").bind(id).run();
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
    const { env } =await getCloudflareContext({ async: true });
    const post = await env.DB
        .prepare(`
    SELECT *
    FROM posts
    WHERE slug = ?
  `)
        .bind(slug)
        .first<Post>();
    return post as Post
}
