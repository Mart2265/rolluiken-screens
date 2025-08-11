"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Sun, Moon, Calendar, Phone, ChevronRight, Ruler, Euro, Clock, CheckCircle2 } from "lucide-react";

const BASE_PRICES = { rolluik: 165, screen: 140 };
const OPTION_PRICES = {
  bediening: { handmatig: 0, elektrisch: 95, solar: 135 },
  lamellen: { standaard: 0, extraIsolerend: 35 },
  omkasting: { standaard: 0, compact: 25 },
  montage: { geen: 0, standaard: 150, premium: 275 },
};

function usePriceCalc({ type, widthCm, heightCm, bediening, lamellen, omkasting, montage }: any) {
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

export default function Page() {
  const [type, setType] = useState("rolluik");
  const [widthCm, setWidthCm] = useState(200);
  const [heightCm, setHeightCm] = useState(220);
  const [bediening, setBediening] = useState("elektrisch");
  const [lamellen, setLamellen] = useState("standaard");
  const [omkasting, setOmkasting] = useState("standaard");
  const [montage, setMontage] = useState("standaard");

  const price = usePriceCalc({ type, widthCm, heightCm, bediening, lamellen, omkasting, montage });

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6" />
            <span className="font-semibold">RolScreen AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#producten" className="hover:opacity-70">Producten</a>
            <a href="#calculator" className="hover:opacity-70">Prijsindicatie</a>
            <a href="#afspraak" className="hover:opacity-70">Afspraak</a>
            <a href="#faq" className="hover:opacity-70">FAQ</a>
          </nav>
          <a href="#afspraak" className="inline-flex items-center gap-2 rounded-2xl bg-black text-white px-4 py-2 text-sm">
            Offerte & afspraak <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </header>

      <section className="bg-gradient-to-b from-neutral-100 to-transparent">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">Rolluiken & screens, slim geregeld met AI</h1>
            <p className="mt-4 text-neutral-700">
              Snelle prijsindicatie, automatisch plannen en een glasheldere offerte. Wij maken je woning koeler in de zomer, warmer in de winter en veiliger, met minimale wachttijd.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#calculator" className="rounded-2xl bg-black text-white px-5 py-3 text-sm">Bereken prijs</a>
              <a href="#afspraak" className="rounded-2xl border border-neutral-300 px-5 py-3 text-sm">Inmeet-afspraak</a>
            </div>
            <div className="mt-6 flex items-center gap-6 text-sm text-neutral-700">
              <div className="flex items-center gap-2"><Sun className="w-4 h-4" />Zonwerend</div>
              <div className="flex items-center gap-2"><Moon className="w-4 h-4" />Isolerend</div>
              <div className="flex items-center gap-2"><Shield className="w-4 h-4" />Veilig</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="aspect-[4/3] rounded-3xl bg-white shadow-xl p-4 grid grid-rows-2 gap-4">
              <div className="rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-500">Productvisual</div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { Icon: Ruler, label: "Op maat" },
                  { Icon: Euro, label: "Scherpe prijs" },
                  { Icon: Clock, label: "Snel geplaatst" },
                ].map((f, i) => (
                  <div key={i} className="rounded-2xl bg-neutral-100 p-4 text-center">
                    <f.Icon className="w-5 h-5 mx-auto" />
                    <div className="mt-2 text-sm">{f.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="producten" className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-semibold">Onze bestsellers</h2>
        <p className="text-neutral-700 mt-2">Kies voor maximale verduistering met rolluiken of voor slanke zonwering met screens.</p>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {[{
            title: "Rolluiken",
            bullets: ["Top isolatie", "Inbraakvertragend", "Volledige verduistering"],
          }, {
            title: "Screens",
            bullets: ["Slank design", "Zicht naar buiten", "Windvast"]
          }].map((p, idx) => (
            <div key={idx} className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <button onClick={() => setType(idx === 0 ? "rolluik" : "screen")} className="text-sm rounded-xl border px-3 py-1">Selecteer</button>
              </div>
              <div className="mt-4 h-40 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-500">Afbeelding</div>
              <ul className="mt-4 grid gap-2 text-sm text-neutral-700">
                {p.bullets.map((b, i) => (
                  <li key={i} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" />{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="calculator" className="bg-white border-t border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-2xl font-semibold">Directe prijsindicatie</h2>
          <p className="text-neutral-700 mt-2">Schatting inclusief 21% btw. Definitieve prijs na inmeten.</p>

          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <div className="rounded-3xl border border-neutral-200 p-6 grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm">Type</label>
                  <select className="w-full mt-1 rounded-xl border px-3 py-2" value={type} onChange={(e)=>setType((e.target as HTMLSelectElement).value)}>
                    <option value="rolluik">Rolluik</option>
                    <option value="screen">Screen</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm">Bediening</label>
                  <select className="w-full mt-1 rounded-xl border px-3 py-2" value={bediening} onChange={(e)=>setBediening((e.target as HTMLSelectElement).value)}>
                    <option value="handmatig">Handmatig</option>
                    <option value="elektrisch">Elektrisch</option>
                    <option value="solar">Solar</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm">Lamellen / doek</label>
                  <select className="w-full mt-1 rounded-xl border px-3 py-2" value={lamellen} onChange={(e)=>setLamellen((e.target as HTMLSelectElement).value)}>
                    <option value="standaard">Standaard</option>
                    <option value="extraIsolerend">Extra isolerend</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm">Omkasting</label>
                  <select className="w-full mt-1 rounded-xl border px-3 py-2" value={omkasting} onChange={(e)=>setOmkasting((e.target as HTMLSelectElement).value)}>
                    <option value="standaard">Standaard</option>
                    <option value="compact">Compact</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm">Breedte (cm)</label>
                  <input className="w-full mt-1 rounded-xl border px-3 py-2" type="number" min={40} value={widthCm} onChange={(e)=>setWidthCm(e.currentTarget.valueAsNumber || 0)} />
                </div>
                <div>
                  <label className="text-sm">Hoogte (cm)</label>
                  <input className="w-full mt-1 rounded-xl border px-3 py-2" type="number" min={40} value={heightCm} onChange={(e)=>setHeightCm(e.currentTarget.valueAsNumber || 0)} />
                </div>
                <div>
                  <label className="text-sm">Montage</label>
                  <select className="w-full mt-1 rounded-xl border px-3 py-2" value={montage} onChange={(e)=>setMontage((e.target as HTMLSelectElement).value)}>
                    <option value="geen">Zonder montage</option>
                    <option value="standaard">Standaard montage</option>
                    <option value="premium">Premium montage</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 p-6">
              <div className="text-sm text-neutral-600">Oppervlakte</div>
              <div className="text-3xl font-semibold">{price.m2.toFixed(2)} m²</div>
              <div className="mt-6 grid gap-2 text-sm">
                <div className="flex justify-between"><span>Subtotaal (excl. btw)</span><span>€ {price.subtotal}</span></div>
                <div className="flex justify-between"><span>Btw 21%</span><span>€ {price.vat}</span></div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t"><span>Totaal (incl. btw)</span><span>€ {price.total}</span></div>
              </div>
              <a href="#afspraak" className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-black text-white px-4 py-3 text-sm">
                Offerte aanvragen <ChevronRight className="w-4 h-4" />
              </a>
              <p className="text-xs text-neutral-500 mt-3">Indicatief. Prijzen kunnen afwijken i.v.m. maatvoering, kleur en inbouwsituatie.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="afspraak" className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-semibold">Plan je inmeten of vraag een offerte aan</h2>
        <p className="text-neutral-700 mt-2">We bevestigen direct per e‑mail en WhatsApp. Kies je gewenste dag, wij doen de rest.</p>
        <div className="grid md:grid-cols-2 gap-8 mt-6">
          <div className="rounded-3xl border border-neutral-200 p-6 grid gap-4">
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
                <textarea className="w-full mt-1 rounded-xl border px-3 py-2" rows={3} placeholder="Aantal ramen/deuren, kleur, gewenste periode" />
              </div>
            </div>
            <button className="inline-flex items-center gap-2 rounded-2xl bg-black text-white px-4 py-3 text-sm w-fit">
              <Calendar className="w-4 h-4" /> Verstuur & plan
            </button>
            <p className="text-xs text-neutral-500">Door te versturen ga je akkoord met onze privacyverklaring.</p>
          </div>

          <div className="rounded-3xl bg-neutral-100 p-6">
            <div className="flex items-center gap-3"><Phone className="w-5 h-5"/><div className="font-medium">Liever direct contact?</div></div>
            <p className="text-neutral-700 mt-2">Bel of WhatsApp ons voor snel advies en actuele levertijden. We reageren doorgaans binnen een uur op werkdagen.</p>
            <div className="mt-6 grid gap-2 text-sm">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" />Vakmanschap met montagepartners</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" />Landelijke dekking in fases</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" />Transparante prijzen</div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-white border-t border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-2xl font-semibold">Veelgestelde vragen</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {[
              { q: "Hoe snel kunnen jullie leveren?", a: "Indicatief 3–6 weken afhankelijk van seizoen en kleur. Exacte planning volgt na inmeten." },
              { q: "Doen jullie ook inmeten?", a: "Ja. We plannen automatisch via onze online agenda. Je ontvangt direct een bevestiging." },
              { q: "Welke garantie zit erop?", a: "Fabrieksgarantie op materialen en 2 jaar op montage. Voorwaarden op aanvraag." },
              { q: "Werken jullie met iDEAL?", a: "Ja, aanbetalingen en restbetalingen kunnen via iDEAL en kaart." },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl border border-neutral-200 p-5">
                <div className="font-medium">{f.q}</div>
                <div className="text-neutral-700 mt-2 text-sm">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-neutral-600 grid md:grid-cols-2 gap-4">
          <div>© {new Date().getFullYear()} RolScreen AI. Alle rechten voorbehouden.</div>
          <div className="md:text-right">Privacy | Voorwaarden | Cookievoorkeuren</div>
        </div>
      </footer>
    </div>
  );
}
