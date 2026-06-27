"use client";

import { useState } from "react";
import PostForm from "@/components/PostForm";
import LoginModal from "@/components/LoginModal";
import { useAuth } from "@/context/AuthContext";

export default function NewPostClient() {
  const { isLoggedIn } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  if (isLoggedIn) {
    return (
      <div className="legal-card rounded-2xl p-8 sm:p-10">
        <PostForm />
      </div>
    );
  }

  return (
    <>
      <div className="legal-card rounded-2xl p-10 text-center">
        <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-navy text-3xl mx-auto">
          🔒
        </span>
        <h2 className="mb-2 text-xl font-bold text-navy">
          دسترسی محدود
        </h2>
        <p className="mb-6 text-navy/70">
          برای انتشار مقاله ابتدا وارد حساب کاربری خود شوید.
        </p>
        <button
          onClick={() => setShowLogin(true)}
          className="rounded-lg bg-gold px-6 py-2.5 text-sm font-bold text-navy transition-colors hover:bg-gold-light"
        >
          ورود به حساب کاربری
        </button>
      </div>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}
