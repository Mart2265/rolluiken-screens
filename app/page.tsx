
'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-10">Welkom bij Rolluikenvoorjou</h1>
      <p className="text-center mt-4">Professionele rolluiken en screens met AI-ondersteuning voor prijsopgave en planning.</p>
      <div className="sticky-bar">
        <a href="https://wa.me/31623717058?text=Hallo%20ik%20wil%20een%20offerte" target="_blank">WhatsApp</a>
        <Link href="#offerte">Offerte aanvragen</Link>
      </div>
    </div>
  )
}
