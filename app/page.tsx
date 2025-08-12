'use client';
import Link from 'next/link'

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold">Welkom bij Rolluikenvoorjou</h1>
      <p className="mt-3 text-slate-700">Professionele rolluiken en zipscreens. Vraag direct een prijsindicatie of plan een inmeten.</p>

      <div className="mt-6 flex gap-3">
        <a className="btn-primary" href="#offerte">Offerte aanvragen</a>
        <a className="btn-secondary" href="https://wa.me/31623717058?text=Hallo%2C%20ik%20wil%20een%20offerte." target="_blank">WhatsApp</a>
      </div>

      <div id="offerte" className="mt-16">
        <h2 className="text-2xl font-semibold">Offerte formulier</h2>
        <p className="text-sm text-slate-600">Dit is een placeholder. Later koppelen we dit aan /api/quote.</p>
      </div>

      <div className="stickybar">
        <a href="https://wa.me/31623717058?text=Hallo%2C%20ik%20wil%20een%20offerte." target="_blank">WhatsApp</a>
        <Link href="#offerte">Offerte</Link>
      </div>
    </main>
  );
}
