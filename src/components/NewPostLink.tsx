"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function NewPostLink() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) return null;

  return (
    <Link
      href="/posts/new"
      className="inline-flex shrink-0 items-center rounded-xl bg-gold px-6 py-3 text-sm font-bold text-navy transition-all hover:bg-gold-light"
    >
      + مقاله جدید
    </Link>
  );
}
