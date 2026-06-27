"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { deletePost } from "@/app/actions/posts";

export default function DeletePostButton({ postId }: { postId: number }) {
  const { isLoggedIn } = useAuth();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  if (!isLoggedIn) return null;

  function handleDelete() {
    if (!confirm("آیا از حذف این مقاله مطمئن هستید؟")) return;
    startTransition(async () => {
      await deletePost(postId);
      router.refresh();
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className=" inline-flex items-center gap-1 text-sm font-semibold text-red-500 transition-colors hover:text-red-700 disabled:opacity-50"
    >
      {isPending ? "در حال حذف..." : "حذف مقاله"}
    </button>
  );
}
