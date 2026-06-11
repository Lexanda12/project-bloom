import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import Link from 'next/link'
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Project Bloom',
  description: 'Know what to expect. Find a place to go.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Bloom',
  },
}

export const viewport = {
  themeColor: '#8b2d3a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSerifDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bloom-canvas">
        <div className="relative">
          {children}
          <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-bloom-canvas border-t border-bloom-border px-6 py-3 flex justify-around z-50">
            <Link href="/" className="flex flex-col items-center gap-1 text-bloom-muted text-xs">
              <span className="text-lg">🏠</span>
              <span>Home</span>
            </Link>
            <Link href="/expect" className="flex flex-col items-center gap-1 text-bloom-muted text-xs">
              <span className="text-lg">📋</span>
              <span>What to expect</span>
            </Link>
            <Link href="/facilities" className="flex flex-col items-center gap-1 text-bloom-muted text-xs">
              <span className="text-lg">📍</span>
              <span>Find a clinic</span>
            </Link>
            <Link href="/about" className="flex flex-col items-center gap-1 text-bloom-muted text-xs">
              <span className="text-lg">ℹ️</span>
              <span>About</span>
            </Link>
          </nav>
        </div>
      </body>
    </html>
  );
}
