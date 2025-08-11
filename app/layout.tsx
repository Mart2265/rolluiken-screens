// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RolScreen – Rolluiken & Screens',
  description: 'AI-first rolluiken en screens: prijsindicatie, planning en offerte.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-gray-50 text-slate-900">
        {children}
      </body>
    </html>
  )
}

