import type { Metadata } from "next";
import "./globals.css";
import "@/styles/effects.css";

export const metadata: Metadata = {
  title: "Alpha Digital Studio — Digital experiences, engineered to move",
  description:
    "Alpha Digital Studio designs and builds ambitious websites, products, AI experiences, and digital systems.",
  openGraph: {
    title: "Alpha Digital Studio",
    description: "Digital experiences, engineered to move.",
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
