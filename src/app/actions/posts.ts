"use server";

import { revalidatePath } from "next/cache";
import {
  getAllPosts,
  getPostBySlug,
  createPost,
  deletePost as dbDeletePost,
} from "@/lib/db";
import type { Post } from "@/lib/types";

export { getAllPosts, getPostBySlug, createPost };

export async function deletePost(id: number): Promise<void> {
  dbDeletePost(id);
  revalidatePath("/posts");
}
