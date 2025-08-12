
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rolluikenvoorjou – Rolluiken & Screens',
  description: 'AI-first rolluiken en screens: prijsindicatie, planning en offerte.',
  openGraph: {
    title: 'Rolluikenvoorjou – Rolluiken & Screens',
    description: 'AI-first rolluiken en screens: prijsindicatie, planning en offerte.',
    url: 'https://rolluikenvoorjou.nl',
    siteName: 'Rolluikenvoorjou',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    locale: 'nl_NL',
    type: 'website',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className="antialiased bg-gray-50 text-slate-900">{children}</body>
    </html>
  )
}
