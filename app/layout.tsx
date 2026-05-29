import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Journal",
  description: "A quiet place to write your thoughts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
