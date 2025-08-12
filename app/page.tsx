"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck, SunMedium, Snowflake, Ruler, Wrench, Clock, Euro, Star,
  CheckCircle2, PhoneCall, ChevronRight, Palette, Sparkles
} from "lucide-react";

const Section = ({ children, id }: { children: React.ReactNode; id?: string }) => (
  <section id={id} className="max-w-7xl mx-auto px-4 py-16 md:py-20">{children}</section>
);

const BASE_PRICES: Record<"rolluik" | "screen", number> = { rolluik: 175, screen: 149 };
const OPTION_PRICES = {
  bediening: { handmatig: 0, elektrisch: 99, solar: 139 },
  lamellen: { standaard: 0, extraIsolerend: 39 },
  omkasting: { standaard: 0, compact: 29 },
  montage: { geen: 0, standaard: 165, premium: 295 },
};

function usePriceCalc({ type, widthCm, heightCm, bediening, lamellen, omkasting, montage }:{
  type: "rolluik" | "screen"; widthCm: number; heightCm: number;
  bediening: keyof typeof OPTION_PRICES.bediening;
  lamellen: keyof typeof OPTION_PRICES.lamellen;
  omkasting: keyof typeof OPTION_PRICES.omkasting;
  montage: keyof typeof OPTION_PRICES.montage;
}) {
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

export default function Home(){
  // state
  const [type, setType] = useState<"rolluik"|"screen">("rolluik");
  const [widthCm, setWidthCm] = useState<number>(220);
  const [heightCm, setHeightCm] = useState<number>(220);
  const [bediening, setBediening] = useState<"handmatig"|"elektrisch"|"solar">("elektrisch");
  const [lamellen, setLamellen] = useState<"standaard"|"extraIsolerend">("standaard");
  const [omkasting, setOmkasting] = useState<"standaard"|"compact">("standaard");
  const [montage, setMontage] = useState<"geen"|"standaard"|"premium">("standaard");
  const [lead, setLead] = useState({ name: "", email: "", phone: "", zip: "", notes: "" });

  const price = usePriceCalc({ type, widthCm, heightCm, bediening, lamellen, omkasting, montage });

  // CTAs (vervang placeholders)
  const WA = process.env.NEXT_PUBLIC_WHATSAPP_NR || "31612345678"; // zonder +
  const CAL = process.env.NEXT_PUBLIC_CAL_URL || "https://cal.com/your-team/inschatting";
  const waMsg = encodeURIComponent(`Hoi! Ik wil een ${type} laten plaatsen. Maat: ${widthCm}x${heightCm} cm. Indicatie: €${price.total}.`);
  const waHref = `https://wa.me/${WA}?text=${waMsg}`;

  async function submitQuote(e: React.FormEvent){
    e.preventDefault();
    await fetch("/api/quote", { method: "POST", body: JSON.stringify({ lead, config:{ type, widthCm, heightCm, bediening, lamellen, omkasting, montage }, price }), headers: {"Content-Type":"application/json"} });
    alert("Bedankt! We mailen/appen je binnen 1 werkdag.");
    setLead({ name:"", email:"", phone:"", zip:"", notes:"" });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
      {/* Announcement bar */}
      <div className="w-full bg-brand-900 text-white text-center text-xs md:text-sm py-2">Gratis inmeten + snelle levering — vraag vandaag een prijs aan</div>

      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-brand-900" />
            <span className="font-semibold tracking-tight">RolScreen</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#producten" className="hover:text-slate-700">Producten</a>
            <a href="#calculator" className="hover:text-slate-700">Prijs</a>
            <a href="#kleuren" className="hover:text-slate-700">Kleuren</a>
            <a href="#proces" className="hover:text-slate-700">Werkwijze</a>
            <a href="#reviews" className="hover:text-slate-700">Reviews</a>
            <a href="#afspraak" className="hover:text-slate-700">Afspraak</a>
          </nav>
          <a href="#afspraak" className="btn-primary">Offerte <ChevronRight className="w-4 h-4" /></a>
        </div>
      </header>

      {/* Hero met echte beelden */}
      <div className="relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1597007380781-7b1d0a6a8dfa?q=80&w=1600&auto=format&fit=crop" alt="Strakke gevel met zonwering" className="absolute inset-0 w-full h-full object-cover opacity-30"/>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,.25),transparent_45%),radial-gradient(ellipse_at_bottom_left,rgba(56,189,248,.25),transparent_45%)]"/>
        <Section>
          <div className="grid md:grid-cols-2 gap-10 items-center relative">
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.5}}>
              <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">Koel in de zomer, warm in de winter. Rolluiken & screens op maat.</h1>
              <p className="mt-4 text-slate-600 text-lg">Zonwerend, isolerend en windvast. Vraag binnen 60 seconden een prijsindicatie met automatische planning.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#calculator" className="btn-primary">Prijs berekenen</a>
                <a href={waHref} target="_blank" className="btn-secondary">WhatsApp</a>
                <a href={CAL} target="_blank" className="btn-secondary">Plan afspraak</a>
              </div>
              <div className="mt-6 flex flex-wrap gap-6 text-sm text-slate-700">
                <span className="flex items-center gap-2"><SunMedium className="w-4 h-4"/>Zonwerend</span>
                <span className="flex items-center gap-2"><Snowflake className="w-4 h-4"/>Isolerend</span>
                <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4"/>Inbraakvertragend</span>
              </div>
            </motion.div>
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.6}}>
              <div className="card shadow-xl">
                <img src="https://images.unsplash.com/photo-1600585154340-1e4ce9a1400b?q=80&w=1400&auto=format&fit=crop" alt="Modern interieur met veel licht" className="rounded-2xl h-60 w-full object-cover"/>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {[{icon:Ruler,label:"Op maat"},{icon:Euro,label:"Scherpe prijs"},{icon:Clock,label:"Snel geplaatst"}].map((f,i)=> (
                    <div key={i} className="subcard text-center"><f.icon className="w-5 h-5 mx-auto"/><div className="mt-2 text-sm text-slate-700">{f.label}</div></div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </Section>
      </div>

      {/* Producten – Rolluiken vs Screens */}
      <Section id="producten">
        <div className="flex items-end justify-between gap-4">
          <div><h2 className="h2">Onze bestsellers</h2><p className="muted mt-2">Volledige verduistering en beveiliging met rolluiken of slanke zonwering met windvaste zipscreens.</p></div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {[
            { title:"Rolluiken", bullets:["Top isolatie","Inbraakvertragend","Volledige verduistering"], img:"https://images.unsplash.com/photo-1600607687920-4ce9ce6d0aa6?q=80&w=1400&auto=format&fit=crop", selected:type==="rolluik", onSelect:()=>setType("rolluik" as const)},
            { title:"Zipscreens", bullets:["Windvast","Zicht naar buiten","Solar-optie"], img:"https://images.unsplash.com/photo-1598300183496-8b3b4f3ebc93?q=80&w=1400&auto=format&fit=crop", selected:type==="screen", onSelect:()=>setType("screen" as const)},
          ].map((p,idx)=> (
            <div key={idx} className={`card transition-all ${p.selected?"ring-2 ring-brand-600":""}`}>
              <div className="flex items-center justify-between"><h3 className="text-xl font-semibold">{p.title}</h3><button onClick={p.onSelect} className={`chip ${p.selected?"chip-filled":""}`}>{p.selected?"Geselecteerd":"Selecteer"}</button></div>
              <img src={p.img} alt={p.title} className="rounded-2xl h-48 w-full object-cover mt-4"/>
              <ul className="mt-4 grid gap-2 text-sm text-slate-700">{p.bullets.map((b,i)=> (<li key={i} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600"/>{b}</li>))}</ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Kleuren & afwerking (USP uit concurrenten) */}
      <Section id="kleuren">
        <div className="flex items-center gap-2"><Palette className="w-5 h-5 text-brand-900"/><h2 className="h2">Kleuren & afwerking</h2></div>
        <p className="muted mt-2 max-w-3xl">Kies uit populaire gevelkleuren en compacte kasten. Solar‑screens mogelijk zonder 230V. (Voorbeeldkleuren hieronder; kies exact RAL tijdens inmeten.)</p>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {["Zwart","Antraciet","Lichtgrijs","Wit","Ivoor","Donkerbruin"].map((c,i)=> (
            <div key={i} className="flex items-center gap-3 card"><span className={`inline-block h-8 w-8 rounded-full swatch-${i}`}></span><span className="text-sm">{c}</span></div>
          ))}
        </div>
      </Section>

      {/* Calculator + prijskaart */}
      <div className="bg-white border-y border-slate-200">
        <Section id="calculator">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="h2">Directe prijsindicatie</h2>
              <p className="muted mt-2">Indicatief incl. 21% btw. Definitieve prijs na inmeten.</p>
              <div className="card mt-6 grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="label">Type</label><select className="input" value={type} onChange={(e)=>setType(e.currentTarget.value as any)}><option value="rolluik">Rolluik</option><option value="screen">Zipscreen</option></select></div>
                  <div><label className="label">Bediening</label><select className="input" value={bediening} onChange={(e)=>setBediening(e.currentTarget.value as any)}><option value="handmatig">Handmatig</option><option value="elektrisch">Elektrisch</option><option value="solar">Solar</option></select></div>
                  <div><label className="label">Lamellen / doek</label><select className="input" value={lamellen} onChange={(e)=>setLamellen(e.currentTarget.value as any)}><option value="standaard">Standaard</option><option value="extraIsolerend">Extra isolerend</option></select></div>
                  <div><label className="label">Omkasting</label><select className="input" value={omkasting} onChange={(e)=>setOmkasting(e.currentTarget.value as any)}><option value="standaard">Standaard</option><option value="compact">Compact</option></select></div>
                  <div><label className="label">Breedte (cm)</label><input className="input" type="number" min={40} value={widthCm} onChange={(e)=>setWidthCm(e.currentTarget.valueAsNumber||0)} /></div>
                  <div><label className="label">Hoogte (cm)</label><input className="input" type="number" min={40} value={heightCm} onChange={(e)=>setHeightCm(e.currentTarget.valueAsNumber||0)} /></div>
                  <div><label className="label">Montage</label><select className="input" value={montage} onChange={(e)=>setMontage(e.currentTarget.value as any)}><option value="geen">Zonder montage</option><option value="standaard">Standaard</option><option value="premium">Premium</option></select></div>
                </div>
              </div>
            </div>
            <div className="card bg-white shadow-sm self-end">
              <div className="muted">Oppervlakte</div>
              <div className="text-3xl font-semibold">{price.m2.toFixed(2)} m²</div>
              <div className="mt-6 grid gap-2 text-sm">
                <div className="flex justify-between"><span>Subtotaal</span><span>€ {price.subtotal}</span></div>
                <div className="flex justify-between muted"><span>Btw 21%</span><span>€ {price.vat}</span></div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t"><span>Totaal (incl. btw)</span><span>€ {price.total}</span></div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <a href={waHref} target="_blank" className="btn-secondary text-center">WhatsApp</a>
                <a href={CAL} target="_blank" className="btn-primary text-center">Plan inmeten</a>
              </div>
              <p className="text-xs text-slate-500 mt-3">Windvaste zipscreens en Somfy io‑bediening mogelijk. Solar zonder 230V.</p>
            </div>
          </div>
        </Section>
      </div>

      {/* Reviews */}
      <div className="bg-white border-y border-slate-200">
        <Section id="reviews">
          <div className="flex items-center gap-2"><Star className="w-5 h-5 text-amber-500"/><h2 className="h2">Klantreviews</h2></div>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[{name:"Daan, Berkel en Rodenrijs",text:"Top advies en het bleef heerlijk koel in de hitte."},{name:"Fatima, Rotterdam Kralingen",text:"Slanke screens, goede prijs en snelle montage."},{name:"Jeroen, Capelle a/d IJssel",text:"Binnen drie weken geplaatst. Helemaal verduisterd."}].map((r,i)=> (
              <div key={i} className="subcard"><div className="flex items-center gap-1">{Array.from({length:5}).map((_,k)=> (<Star key={k} className="w-4 h-4 fill-amber-400 text-amber-400"/>))}</div><p className="mt-3 text-slate-700">{r.text}</p><div className="mt-3 text-sm text-slate-600">{r.name}</div></div>
            ))}
          </div>
        </Section>
      </div>

      {/* Offerteformulier */}
      <Section id="afspraak">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <div className="flex items-center gap-2"><PhoneCall className="w-5 h-5"/><h2 className="h2">Plan je inmeten of vraag een offerte aan</h2></div>
            <p className="muted mt-2">We bevestigen per e‑mail en WhatsApp. Kies je gewenste dag, wij doen de rest.</p>
            <form onSubmit={submitQuote} className="card mt-6 grid gap-4 bg-white">
              <div className="grid md:grid-cols-2 gap-4">
                <div><label className="label">Naam</label><input className="input" value={lead.name} onChange={e=>setLead({...lead,name:e.target.value})} placeholder="Voornaam Achternaam" required/></div>
                <div><label className="label">E‑mail</label><input className="input" type="email" value={lead.email} onChange={e=>setLead({...lead,email:e.target.value})} placeholder="jij@voorbeeld.nl" required/></div>
                <div><label className="label">Telefoon / WhatsApp</label><input className="input" value={lead.phone} onChange={e=>setLead({...lead,phone:e.target.value})} placeholder="06…" required/></div>
                <div><label className="label">Postcode</label><input className="input" value={lead.zip} onChange={e=>setLead({...lead,zip:e.target.value})} placeholder="1234 AB"/></div>
                <div className="md:col-span-2"><label className="label">Beschrijving</label><textarea className="input" rows={4} value={lead.notes} onChange={e=>setLead({...lead,notes:e.target.value})} placeholder="Aantal ramen/deuren, kleur, gewenste periode"/></div>
              </div>
              <button className="btn-primary inline-flex items-center gap-2 w-fit"><PhoneCall className="w-4 h-4"/> Verstuur & plan</button>
              <p className="text-xs text-slate-500">Door te versturen ga je akkoord met onze privacyverklaring.</p>
            </form>
          </div>
          <div className="card">
            <div className="flex items-center gap-3"><Sparkles className="w-5 h-5 text-brand-900"/><div className="font-medium">Waarom klanten voor ons kiezen</div></div>
            <div className="mt-6 grid gap-3 text-sm">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600"/>Windvaste zipscreens (geen geklapper)</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600"/>Somfy io‑bediening: veilig & status‑feedback</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600"/>Solar‑optie: geen 230V nodig</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600"/>Transparante prijzen en levertijden</div>
            </div>
          </div>
        </div>
      </Section>

      <footer className="border-t border-slate-200 bg-white">
        <Section>
          <div className="text-sm text-slate-600 grid md:grid-cols-2 gap-4">
            <div>© {new Date().getFullYear()} RolScreen. Alle rechten voorbehouden.</div>
            <div className="md:text-right">Privacy | Voorwaarden | Cookievoorkeuren</div>
          </div>
        </Section>
      </footer>
    </div>
  );
}
