// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rolluikenvoorjou – Rolluiken & Screens',
  description: 'Directe prijsindicatie, WhatsApp en inmeet-afspraak.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className="antialiased bg-gray-50 text-slate-900">
        {children}
      </body>
    </html>
  )
}
