// app/layout.tsx
import './globals.css'   // ← heel belangrijk!

export const metadata = {
  title: 'RolScreen – Rolluiken & Screens',
  description: 'AI-first rolluiken en screens: prijsindicatie, planning en offerte.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className="antialiased">{children}</body>
    </html>
  )
}


