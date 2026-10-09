import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title:'Abhishek — Full Stack Developer', description:'Portfolio of Abhishek, full stack developer building thoughtful digital experiences.' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
