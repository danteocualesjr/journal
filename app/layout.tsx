import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { siteName, tagline } from "@/lib/site";

const garamond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s · ${siteName}`,
  },
  description: tagline,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={garamond.variable}>
      <body className="flex min-h-screen flex-col">
        <SiteNav />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
