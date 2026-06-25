import Link from "next/link";
import ScaleIcon from "./ScaleIcon";

const links = [
  { href: "/", label: "خانه" },
  { href: "/posts", label: "مقالات" },
  { href: "/posts/new", label: "مقاله جدید" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-navy/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="group flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-navy-light text-gold">
            <ScaleIcon className="h-5 w-5" />
          </span>
          <div>
            <span className="block text-lg font-bold tracking-tight text-white">
              وکیل نور
            </span>
            <span className="block text-xs text-gold-light/80">
              مشاور حقوقی
            </span>
          </div>
        </Link>
        <ul className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-gold-light"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
