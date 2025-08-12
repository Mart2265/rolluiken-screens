'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, SunMedium, Snowflake, Ruler, Wrench, Clock, Euro, Star, CheckCircle2, PhoneCall, ChevronRight } from 'lucide-react';

const Section = ({ children, id }: { children: React.ReactNode; id?: string }) => (
  <section id={id} className="max-w-7xl mx-auto px-4 py-16 md:py-20">{children}</section>
);

const BASE_PRICES: Record<'rolluik' | 'screen', number> = { rolluik: 175, screen: 149 };
const OPTION_PRICES = {
  bediening: { handmatig: 0, elektrisch: 99, solar: 139 },
  lamellen: { standaard: 0, extraIsolerend: 39 },
  omkasting: { standaard: 0, compact: 29 },
  montage: { geen: 0, standaard: 165, premium: 295 },
};

function usePriceCalc({ type, widthCm, heightCm, bediening, lamellen, omkasting, montage }:
  { type: 'rolluik'|'screen', widthCm: number, heightCm: number, bediening: keyof typeof OPTION_PRICES['bediening'], lamellen: keyof typeof OPTION_PRICES['lamellen'], omkasting: keyof typeof OPTION_PRICES['omkasting'], montage: keyof typeof OPTION_PRICES['montage'] }) {
  return useMemo(() => {
    const w = Math.max(40, Number(widthCm) || 0) / 100;
    const h = Math.max(40, Number(heightCm) || 0) / 100;
    const m2 = Number((w * h).toFixed(2));
    const base = m2 * BASE_PRICES[type];
    const lam = m2 * OPTION_PRICES.lamellen[lamellen];
    const omk = m2 * OPTION_PRICES.omkasting[omkasting];
    const bed = OPTION_PRICES.bediening[bediening];
    const mon = OPTION_PRICES.montage[montage];
    const subtotal = base + lam + omk + bed + mon;
    const vat = subtotal * 0.21;
    const total = subtotal + vat;
    return { m2, subtotal: Math.round(subtotal), vat: Math.round(vat), total: Math.round(total) };
  }, [type, widthCm, heightCm, bediening, lamellen, omkasting, montage]);
}

export default function Home() {
  const [type, setType] = useState<'rolluik'|'screen'>('rolluik');
  const [widthCm, setWidthCm] = useState<number>(220);
  const [heightCm, setHeightCm] = useState<number>(220);
  const [bediening, setBediening] = useState<'handmatig'|'elektrisch'|'solar'>('elektrisch');
  const [lamellen, setLamellen] = useState<'standaard'|'extraIsolerend'>('standaard');
  const [omkasting, setOmkasting] = useState<'standaard'|'compact'>('standaard');
  const [montage, setMontage] = useState<'geen'|'standaard'|'premium'>('standaard');

  const price = usePriceCalc({ type, widthCm, heightCm, bediening, lamellen, omkasting, montage });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
      <div className="w-full bg-brand-900 text-white text-center text-xs md:text-sm py-2">
        Zomeractie: gratis inmeten + snelle levering — vraag vandaag een prijs aan
      </div>

      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-brand-900" />
            <span className="font-semibold tracking-tight">RolScreen</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">AI</span>
          </div>
          <a href="#afspraak" className="btn-primary">Offerte <ChevronRight className="w-4 h-4" /></a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
          Koel in de zomer, warm in de winter.
        </h1>
        <p className="mt-4 muted text-lg max-w-2xl">
          Ontvang in 60 seconden een prijsindicatie. Plan direct een inmeten. Offerte en planning geregeld door onze AI‑assistent.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#calculator" className="btn-primary">Prijs berekenen</a>
          <a href="#afspraak" className="btn-secondary">Inmeet‑afspraak</a>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="card">Strakke cards, kleuren en typografie zijn actief. Vervang deze starter met je uitgebreide pagina.</div>
          <div className="card">Tailwind werkt (brand‑kleuren, knoppen, component classes).</div>
          <div className="card">Klaar voor verdere opmaak en functionaliteit.</div>
        </div>
      </main>
    </div>
  );
}
