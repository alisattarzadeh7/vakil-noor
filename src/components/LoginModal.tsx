"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { checkCredentials } from "@/lib/auth";

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (checkCredentials(username, password)) {
      login(username);
      onClose();
    } else {
      setError("نام کاربری یا رمز عبور اشتباه است.");
    }
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div
        className="!bg-navy/96  relative w-full max-w-md rounded-2xl p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="بستن"
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-navy-light text-gold mx-auto text-xl">
            🔐
          </span>
          <h2
            id="login-title"
            className="text-xl font-bold text-white"
          >
            ورود به پنل مدیریت
          </h2>
          <p className="mt-1 text-sm text-white/60">
            برای انتشار مقاله وارد شوید
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label
              htmlFor="login-username"
              className="mb-1.5 block text-sm font-medium text-gold-light"
            >
              نام کاربری
            </label>
            <input
              ref={inputRef}
              id="login-username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              className="w-full rounded-lg border border-gold/20 bg-navy-light px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-gold/60 focus:ring-1 focus:ring-gold/30"
              placeholder="نام کاربری خود را وارد کنید"
              autoComplete="username"
              required
            />
          </div>

          <div>
            <label
              htmlFor="login-password"
              className="mb-1.5 block text-sm font-medium text-gold-light"
            >
              رمز عبور
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full rounded-lg border border-gold/20 bg-navy-light px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-gold/60 focus:ring-1 focus:ring-gold/30"
              placeholder="رمز عبور خود را وارد کنید"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-900/30 px-4 py-2.5 text-sm text-red-300 border border-red-500/30">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-gold px-4 py-2.5 text-sm font-bold text-navy transition-colors hover:bg-gold-light"
          >
            ورود
          </button>
        </form>
      </div>
    </div>
  );
}
