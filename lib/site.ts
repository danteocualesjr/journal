/**
 * Single source of truth for the personal site's identity and links.
 * Edit the values here to rebrand the site, change the nav, or update
 * where people can reach you.
 */

export type NavItem = {
  /** Visible label in the top nav. */
  label: string;
  /** Route the item links to. */
  href: string;
};

export type ConnectLink = {
  /** Visible label (e.g. "Email", "X", "GitHub"). */
  label: string;
  /** Full URL, or a mailto: address for email. */
  href: string;
};

/** The wordmark shown in the nav. Change this to your own name. */
export const siteName = "Dante O. Cuales, Jr.";

/** A short line that sits under your name on quiet pages and metadata. */
export const tagline = "Founder, reader, and keeper of a journal.";

/** Primary site navigation, left to right. */
export const navItems: NavItem[] = [
  { label: "Journal", href: "/" },
  { label: "Bookshelf", href: "/bookshelf" },
  { label: "Work", href: "/work" },
];

/** Links shown in the footer's Connect section. */
export const connectLinks: ConnectLink[] = [
  { label: "Email", href: "mailto:dante@nativestack.ai" },
  { label: "X/Twitter", href: "https://x.com/danteocualesjr" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/danteocualesjr/" },
];
