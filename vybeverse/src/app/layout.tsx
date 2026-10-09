import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'VYBEVERSE | Step inside my digital universe',description:'Fashion, lifestyle, creativity, and everything in between.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
