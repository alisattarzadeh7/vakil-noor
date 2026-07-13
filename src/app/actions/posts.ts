"use server";

import { revalidatePath } from "next/cache";
import {
  getAllPosts,
  getPostBySlug,
  createPost,
  deletePost as dbDeletePost,
} from "@/lib/db";

export { getAllPosts, getPostBySlug, createPost };

export async function deletePost(id: number): Promise<void> {
  await dbDeletePost(id);
  revalidatePath("/posts");
}
