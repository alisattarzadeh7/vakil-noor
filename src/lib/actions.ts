"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  type PostFormState,
  validatePostInput,
} from "@/lib/validation";
import {createPost} from "@/app/actions/posts";

export async function createPostAction(
  _prevState: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const values = {
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    excerpt: String(formData.get("excerpt") ?? ""),
    content: String(formData.get("content") ?? ""),
  };

  const validation = validatePostInput(values);

  if (!validation.success) {
    return { errors: validation.errors, values };
  }

  try {
    const post =await createPost(formData);
    console.log({post})
    revalidatePath("/posts");
    revalidatePath(`/posts/${post.slug}`);

    redirect(`/posts/${post.slug}`);
  } catch (error) {
    if (error instanceof Error && error.message === "SLUG_TAKEN") {
      return {
        errors: { slug: "این نامک قبلاً استفاده شده است. نامک دیگری انتخاب کنید." },
        values,
      };
    }

    throw error;
  }
}
