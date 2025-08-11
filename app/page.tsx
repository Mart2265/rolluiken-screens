"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  SunMedium,
  Snowflake,
  Moon,
  Zap,
  Ruler,
  Wrench,
  Clock,
  Euro,
  Star,
  CheckCircle2,
  PhoneCall,
  ChevronRight,
} from "lucide-react";

// --- Pricing logic (kept simple & transparent) ---
const BASE_PRICES: Record<"rolluik" | "screen", number> = {
  rolluik: 175,
  screen: 149,
};
const OPTION_PRICES = {
  bediening: { handmatig: 0, elektrisch: 99, solar: 139 }, // per unit
  lamellen: { standaard: 0, extraIsolerend: 39 }, // €/m2
  omkasting: { standaard: 0, compact: 29 }, // €/m2
  montage: { geen: 0, standaard: 165, premium: 295 }, // per unit
};

function usePriceCalc({
  type,
  widthCm,
  heightCm,
  bediening,
  lamellen,
  omkasting,
  montage,
}: {
  type: "rolluik" | "screen";
  widthCm: number;
  heightCm: number;
  bediening: keyof typeof OPTION_PRICES.bediening;
  lamellen: keyof typeof OPTION_PRICES.lamellen;
  omkasting: keyof typeof OPTION_PRICES.omkasting;
  montage: keyof typeof OPTION_PRICES.montage;
}) {
  return useMemo(() => {
    const w = Math.max(40, Number(widthCm) || 0) / 100; // m
    const h = Math.max(40, Number(heightCm) || 0) / 100; // m
    const m2 = Number((w * h).toFixed(2));
    const base = m2 * BASE_PRICES[type];
    const lam = m2 * OPTION_PRICES.lamellen[lamellen];
    const omk = m2 * OPTION_PRICES.omkasting[omkasting];
    const bed = OPTION_PRICES.bediening[bediening];
    const mon = OPTION_PRICES.montage[montage];
    const subtotal = base + lam + omk + bed + mon;
    const vat = subtotal * 0.21;
    const total = subtotal + vat;
    return {
      m2,
      breakdown: { base: Math.round(base), lam, omk, bed, mon },
      subtotal: Math.round(subtotal),
      vat: Math.round(vat),
      total: Math.round(total),
    };
  }, [type, widthCm, heightCm, bediening, lamellen, omkasting, montage]);
}

export default function Home() {
  const [type, setType] = useState<"rolluik" | "screen">("rolluik");
  const [widthCm, setWidthCm] = useState<number>(220);
  const [heightCm, setHeightCm] = useState<number>(220);
  const [bediening, setBediening] = useState<"handmatig" | "elektrisch" | "solar">("elektrisch");
  const [lamellen, setLamellen] = useState<"standaard" | "extraIsolerend">("standaard");
  const [omkasting, setOmkasting] = useState<"standaard" | "compact">("standaard");
  const [montage, setMontage] = useState<"geen" | "standaard" | "premium">("standaard");

  const price = usePriceCalc({ type, widthCm, heightCm, bediening, lamellen, omkasting, montage });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 text-slate-900">
      {/* Top notice bar */}
      <div className="w-full bg-slate-900 text-white text-center text-xs md:text-sm py-2">
        Zomeractie: gratis inmeten + snelle levering — vraag vandaag een prijs aan
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-slate-900" />
            <span className="font-semibold tracking-tight">RolScreen</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#producten" className="hover:text-slate-700">Producten</a>
            <a href="#calculator" className="hover:text-slate-700">Prijs</a>
            <a href="#proces" className="hover:text-slate-700">Werkwijze</a>
            <a href="#reviews" className="hover:text-slate-700">Reviews</a>
            <a href="#afspraak" className="hover:text-slate-700">Afspraak</a>
          </nav>
          <a href="#afspraak" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-2 text-sm">
            Offerte <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-emerald-200 blur-3xl opacity-40" />
        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-sky-200 blur-3xl opacity-40" />

        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
              Rolluiken & screens die je woning koelen, isoleren en beveiligen
            </h1>
            <p className="mt-4 text-slate-600 text-lg">
              Ontvang in 60 seconden een prijsindicatie. Plan direct een inmeten. Offerte en planning geregeld door onze AI‑assistent.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#calculator" className="rounded-xl bg-slate-900 text-white px-5 py-3 text-sm">Prijs berekenen</a>
              <a href="#afspraak" className="rounded-xl border border-slate-300 px-5 py-3 text-sm">Inmeet‑afspraak</a>
            </div>
            <div className="mt-6 flex items-center gap-6 text-sm text-slate-700">
              <div className="flex items-center gap-2"><SunMedium className="w-4 h-4"/>Zonwerend</div>
              <div className="flex items-center gap-2"><Snowflake className="w-4 h-4"/>Isolerend</div>
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4"/>Inbraakvertragend</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="aspect-[4/3] rounded-3xl bg-white shadow-xl p-5 grid grid-rows-2 gap-4 border border-slate-200">
              <div className="rounded-2xl bg-[linear-gradient(135deg,#f8fafc,#eef2ff)] flex items-center justify-center text-slate-500 text-sm">
                Voeg hier later echte productfoto's toe
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Ruler, label: "Op maat" },
                  { icon: Euro, label: "Scherpe prijs" },
                  { icon: Clock, label: "Snel geplaatst" },
                ].map((f, i) => (
                  <div key={i} className="rounded-2xl bg-slate-50 border border-slate-200 p-4 text-center">
                    <f.icon className="w-5 h-5 mx-auto" />
                    <div className="mt-2 text-sm text-slate-700">{f.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section id="producten" className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Onze bestsellers</h2>
            <p className="text-slate-600 mt-2">Kies voor maximale verduistering met rolluiken of voor slanke zonwering met screens.</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {[
            {
              title: "Rolluiken",
              bullets: ["Top isolatie", "Inbraakvertragend", "Volledige verduistering"],
              selected: type === "rolluik",
              onSelect: () => setType("rolluik" as const),
            },
            {
              title: "Screens",
              bullets: ["Slank design", "Zicht naar buiten", "Windvast"],
              selected: type === "screen",
              onSelect: () => setType("screen" as const),
            },
          ].map((p, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-6 border transition-all ${
                p.selected
                  ? "bg-white border-slate-900/10 shadow-lg"
                  : "bg-white border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <button
                  onClick={p.onSelect}
                  className={`text-sm rounded-xl px-3 py-1 border ${
                    p.selected ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300"
                  }`}
                >
                  {p.selected ? "Geselecteerd" : "Selecteer"}
                </button>
              </div>
              <div className="mt-4 h-44 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400">
                Afbeelding
              </div>
              <ul className="mt-4 grid gap-2 text-sm text-slate-700">
                {p.bullets.map((b, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Directe prijsindicatie</h2>
            <p className="text-slate-600 mt-2">Schatting inclusief 21% btw. Definitieve prijs na inmeten.</p>

            <div className="rounded-2xl border border-slate-200 p-6 mt-6 grid gap-4 bg-slate-50/50">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm">Type</label>
                  <select
                    className="w-full mt-1 rounded-xl border px-3 py-2"
                    value={type}
                    onChange={(e) => setType(e.currentTarget.value as any)}
                  >
                    <option value="rolluik">Rolluik</option>
                    <option value="screen">Screen</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm">Bediening</label>
                  <select
                    className="w-full mt-1 rounded-xl border px-3 py-2"
                    value={bediening}
                    onChange={(e) => setBediening(e.currentTarget.value as any)}
                  >
                    <option value="handmatig">Handmatig</option>
                    <option value="elektrisch">Elektrisch</option>
                    <option value="solar">Solar</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm">Lamellen / doek</label>
                  <select
                    className="w-full mt-1 rounded-xl border px-3 py-2"
                    value={lamellen}
                    onChange={(e) => setLamellen(e.currentTarget.value as any)}
                  >
                    <option value="standaard">Standaard</option>
                    <option value="extraIsolerend">Extra isolerend</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm">Omkasting</label>
                  <select
                    className="w-full mt-1 rounded-xl border px-3 py-2"
                    value={omkasting}
                    onChange={(e) => setOmkasting(e.currentTarget.value as any)}
                  >
                    <option value="standaard">Standaard</option>
                    <option value="compact">Compact</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm">Breedte (cm)</label>
                  <input
                    className="w-full mt-1 rounded-xl border px-3 py-2"
                    type="number"
                    min={40}
                    value={widthCm}
                    onChange={(e) => setWidthCm(e.currentTarget.valueAsNumber || 0)}
                  />
                </div>
                <div>
                  <label className="text-sm">Hoogte (cm)</label>
                  <input
                    className="w-full mt-1 rounded-xl border px-3 py-2"
                    type="number"
                    min={40}
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.currentTarget.valueAsNumber || 0)}
                  />
                </div>
                <div>
                  <label className="text-sm">Montage</label>
                  <select
                    className="w-full mt-1 rounded-xl border px-3 py-2"
                    value={montage}
                    onChange={(e) => setMontage(e.currentTarget.value as any)}
                  >
                    <option value="geen">Zonder montage</option>
                    <option value="standaard">Standaard montage</option>
                    <option value="premium">Premium montage</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 p-6 bg-white shadow-sm self-end">
            <div className="text-sm text-slate-600">Oppervlakte</div>
            <div className="text-3xl font-semibold">{price.m2.toFixed(2)} m²</div>
            <div className="mt-6 grid gap-2 text-sm">
              <div className="flex justify-between"><span>Basis + opties</span><span>€ {price.subtotal}</span></div>
              <div className="flex justify-between text-slate-600"><span>Btw 21%</span><span>€ {price.vat}</span></div>
              <div className="flex justify-between text-lg font-semibold pt-2 border-t"><span>Totaal (incl. btw)</span><span>€ {price.total}</span></div>
            </div>
            <a href="#afspraak" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-3 text-sm">
              Offerte aanvragen <ChevronRight className="w-4 h-4" />
            </a>
            <p className="text-xs text-slate-500 mt-3">Indicatief. Definitieve prijs na inmeten. Seizoensschommelingen mogelijk.</p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="proces" className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Zo werken we</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {[
            { icon: PhoneCall, title: "1. Scan & prijs", text: "Korte intake via WhatsApp of formulier. Binnen 60 sec. een indicatie." },
            { icon: Ruler, title: "2. Inmeten", text: "We plannen automatisch. Monteur meet exact in en adviseert kleur & montage." },
            { icon: Wrench, title: "3. Plaatsing", text: "Strakke montage, oplevering en duidelijke nazorg. Factuur & garantie in je mailbox." },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl bg-white border border-slate-200 p-6">
              <s.icon className="w-5 h-5" />
              <div className="mt-3 font-medium">{s.title}</div>
              <div className="text-sm text-slate-600 mt-1">{s.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500" />
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Klantreviews</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              {
                name: "Daan, Berkel en Rodenrijs",
                text: "Super snel geregeld en top advies. In de hittegolf bleef het heerlijk koel.",
              },
              {
                name: "Fatima, Rotterdam Kralingen",
                text: "Strakke screens, goede prijs en duidelijke communicatie.",
              },
              {
                name: "Jeroen, Capelle a/d IJssel",
                text: "Binnen drie weken geplaatst. Keurig afgewerkt en helemaal verduisterd.",
              },
            ].map((r, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 p-6 bg-slate-50/50">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-3 text-slate-700">{r.text}</p>
                <div className="mt-3 text-sm text-slate-600">{r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead / appointment */}
      <section id="afspraak" className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Plan je inmeten of vraag een offerte aan</h2>
            <p className="text-slate-600 mt-2">We bevestigen direct per e‑mail en WhatsApp. Kies je gewenste dag, wij doen de rest.</p>

            <form className="rounded-2xl border border-slate-200 p-6 mt-6 grid gap-4 bg-white">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm">Naam</label>
                  <input className="w-full mt-1 rounded-xl border px-3 py-2" placeholder="Voornaam Achternaam" />
                </div>
                <div>
                  <label className="text-sm">E‑mail</label>
                  <input className="w-full mt-1 rounded-xl border px-3 py-2" placeholder="jij@voorbeeld.nl" />
                </div>
                <div>
                  <label className="text-sm">Telefoon / WhatsApp</label>
                  <input className="w-full mt-1 rounded-xl border px-3 py-2" placeholder="06…" />
                </div>
                <div>
                  <label className="text-sm">Postcode</label>
                  <input className="w-full mt-1 rounded-xl border px-3 py-2" placeholder="1234 AB" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm">Beschrijving (optioneel)</label>
                  <textarea className="w-full mt-1 rounded-xl border px-3 py-2" rows={4} placeholder="Aantal ramen/deuren, kleur, gewenste periode" />
                </div>
              </div>
              <button className="inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-3 text-sm w-fit">
                <PhoneCall className="w-4 h-4" /> Verstuur & plan
              </button>
              <p className="text-xs text-slate-500">Door te versturen ga je akkoord met onze privacyverklaring.</p>
            </form>
          </div>

          <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6">
            <div className="flex items-center gap-3"><ShieldCheck className="w-5 h-5"/><div className="font-medium">Waarom klanten voor ons kiezen</div></div>
            <div className="mt-6 grid gap-3 text-sm">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600"/>Gekwalificeerde montagepartners</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600"/>Transparante prijzen en levertijden</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600"/>AI‑assistent voor planning & updates</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600"/>Lokale service in de Randstad</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-10 text-sm text-slate-600 grid md:grid-cols-2 gap-4">
          <div>© {new Date().getFullYear()} RolScreen. Alle rechten voorbehouden.</div>
          <div className="md:text-right">Privacy | Voorwaarden | Cookievoorkeuren</div>
        </div>
      </footer>
    </div>
  );
}
