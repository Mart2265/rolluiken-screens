
// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.rolluikenvoorjou.nl'),
  title: 'Rolluikenvoorjou – Rolluiken & Screens op maat',
  description: 'Koel in de zomer, warm in de winter. Directe prijsindicatie, WhatsApp en inmeet-afspraak.',
  openGraph: {
    title: 'Rolluikenvoorjou – Rolluiken & Screens op maat',
    description: 'Directe prijsindicatie, WhatsApp en inmeet-afspraak.',
    url: 'https://www.rolluikenvoorjou.nl',
    siteName: 'Rolluikenvoorjou',
    images: [{ url: 'https://images.unsplash.com/photo-1597007380781-7b1d0a6a8dfa?q=80&w=1200&auto=format&fit=crop', width: 1200, height: 630, alt: 'Moderne gevel met zonwering' }],
    locale: 'nl_NL',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Rolluikenvoorjou – Rolluiken & Screens', description: 'Directe prijsindicatie, WhatsApp en inmeet-afspraak.' },
  alternates: { canonical: 'https://www.rolluikenvoorjou.nl' }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Rolluikenvoorjou",
    "url": "https://www.rolluikenvoorjou.nl",
    "email": "mart_2265@hotmail.com",
    "telephone": "+31 6 23717058",
    "image": "https://images.unsplash.com/photo-1600585154340-1e4ce9a1400b?q=80&w=1200&auto=format&fit=crop",
    "description": "Rolluiken en zipscreens op maat. Directe prijsindicatie, WhatsApp en inmeet-afspraak.",
    "areaServed": "Randstad",
    "priceRange": "€€"
  };

  return (
    <html lang="nl">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="antialiased bg-gray-50 text-slate-900">
        {children}
      </body>
    </html>
  )
}
