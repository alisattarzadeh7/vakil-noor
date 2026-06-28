"use client";

import { useState } from "react";
import Link from "next/link";
import ScaleIcon from "./ScaleIcon";
import LoginModal from "./LoginModal";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { isLoggedIn, username, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const links = [
    { href: "/", label: "خانه" },
    { href: "/posts", label: "مقالات" },
    ...(isLoggedIn ? [{ href: "/posts/new", label: "مقاله جدید" }] : []),
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-navy/96 shadow-lg shadow-black/30 backdrop-blur-md">
        <div className="gold-divider h-[2px]" />
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <Link
            href="/"
            className="group flex items-center gap-3 transition-opacity hover:opacity-90"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-gradient-to-b from-navy-mid to-navy-light text-gold shadow-inner">
              <ScaleIcon className="h-5 w-5" />
            </span>
            <div>
              <span className="block text-lg font-bold tracking-tight text-white">
                مرضیه فلاح
              </span>
              <span className="block text-[10px] tracking-widest text-gold/70 uppercase">
                مشاور حقوقی
              </span>
            </div>
          </Link>

          <ul className="flex items-center gap-0.5 sm:gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-white/75 transition-all hover:bg-white/8 hover:text-gold-light"
                >
                  {link.label}
                </Link>
              </li>
            ))}

            <li className="mr-2">
              {isLoggedIn ? (
                <div className="flex items-center gap-2.5">
                  <span className="hidden rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-xs text-gold-light sm:block">
                    {username}
                  </span>
                  <button
                    onClick={logout}
                    className="rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white/70 transition-all hover:border-gold/30 hover:text-gold-light"
                  >
                    خروج
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="rounded-lg bg-gradient-to-l from-gold to-gold-dark px-5 py-2 text-sm font-bold text-navy shadow-md shadow-gold/20 transition-all hover:brightness-110"
                >
                  ورود
                </button>
              )}
            </li>
          </ul>
        </nav>
      </header>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}
