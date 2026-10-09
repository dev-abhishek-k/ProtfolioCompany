import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';
const display = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const body = DM_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
export const metadata: Metadata = { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'), title: 'MONOCHROME MUSE — A Digital Fashion Museum', description: 'An exhibition of fashion, stories, and moments. Explore the visual world of MONOCHROME MUSE.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className={`${display.variable} ${body.variable}`}>{children}</body></html>; }
