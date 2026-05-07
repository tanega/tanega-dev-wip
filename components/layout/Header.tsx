"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LocaleSwitcher from "@/components/ui/LocaleSwitcher";

export default function Header() {
  const t = useTranslations("nav");
  const th = useTranslations("header");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const NAV_LINKS = [
    { href: "/" as const, label: t("home") },
  ];

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-mono text-lg font-bold tracking-tight text-accent transition-opacity hover:opacity-80"
          aria-label={th("home")}
        >
          G<span className="text-accent-warm">.</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={[
                "relative text-sm font-medium transition-colors duration-200",
                "after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-[width] after:duration-300",
                "hover:text-foreground hover:after:w-full",
                isActive(href)
                  ? "text-foreground after:!w-full"
                  : "text-muted",
              ].join(" ")}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-1 md:flex">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>

        <button
          className="flex items-center justify-center rounded-md p-2 text-muted transition-colors hover:text-foreground md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? th("closeMenu") : th("openMenu")}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-border/50 bg-background/95 px-6 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={[
                    "block text-sm font-medium transition-colors",
                    isActive(href)
                      ? "text-accent"
                      : "text-muted hover:text-foreground",
                  ].join(" ")}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-2 border-t border-border/50 pt-4">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
        </nav>
      )}
    </header>
  );
}
