import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AURA SOCIAL — Beyond the Frame',
  description: 'An editorial world of fashion, influence, and identity. Explore the AURA SOCIAL creator portfolio and collaborations.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
