"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, siteName } from "@/lib/site";

/**
 * A quiet site-wide header: the wordmark on the left, section links in the
 * middle, and a Write action on the right. Sits above every page.
 */
export default function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="px-6 pt-6">
      <nav className="mx-auto flex max-w-feed items-center justify-between gap-4 border-b border-paper-line pb-4">
        <Link
          href="/"
          className="font-serif text-lg font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:text-accent"
        >
          {siteName}
        </Link>

        <div className="flex items-center gap-5">
          <ul className="flex items-center gap-5">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={navLinkClass(pathname, item.href)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/write"
            className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-ink-faint transition-colors hover:text-accent"
          >
            ✎ Write
          </Link>
        </div>
      </nav>
    </header>
  );
}

/** Active when the link's route matches; "/" only matches the home page exactly. */
function navLinkClass(pathname: string | null, href: string): string {
  const isActive =
    href === "/" ? pathname === "/" : (pathname?.startsWith(href) ?? false);

  return [
    "font-sans text-[11px] font-medium uppercase tracking-[0.18em] transition-colors hover:text-accent",
    isActive ? "text-ink" : "text-ink-faint",
  ].join(" ");
}
