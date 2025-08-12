'use client';
import Image from 'next/image'

<Image
  src="https://images.unsplash.com/photo-1600585154340-1e4ce9a1400b?q=80&w=1400&auto=format&fit=crop"
  alt="Modern interieur"
  width={1400}
  height={600}
  className="rounded-2xl h-60 w-full object-cover"
/>

const BASE = { rolluik: 175, screen: 149 } as const
const OPT = {
  bediening: { handmatig: 0, elektrisch: 99, solar: 139 },
  lamellen: { standaard: 0, extraIsolerend: 39 },
  omkasting: { standaard: 0, compact: 29 },
  montage: { geen: 0, standaard: 165, premium: 295 },
}

export default function Home(){
  const [type, setType] = useState<'rolluik'|'screen'>('rolluik')
  const [widthCm, setWidthCm] = useState(220)
  const [heightCm, setHeightCm] = useState(220)

  const price = useMemo(()=>{
    const m2 = Math.max(0.16, (Math.max(40,widthCm)/100) * (Math.max(40,heightCm)/100))
    const subtotal = m2*BASE[type]
    const vat = subtotal*0.21
    return { m2: Number(m2.toFixed(2)), subtotal: Math.round(subtotal), vat: Math.round(vat), total: Math.round(subtotal+vat) }
  }, [type,widthCm,heightCm])

  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="relative rounded-3xl overflow-hidden h-72">
        <Image src="https://images.unsplash.com/photo-1597007380781-7b1d0a6a8dfa?q=80&w=1600&auto=format&fit=crop" alt="Gevel met zonwering" fill priority className="object-cover" />
      </div>

      <h1 className="text-4xl font-semibold mt-8">Rolluiken & Zipscreens op maat</h1>
      <p className="text-slate-600 mt-2">Vraag direct een prijsindicatie en plan een inmeten.</p>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="card">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="label">Type</label><select className="input" value={type} onChange={e=>setType(e.currentTarget.value as any)}><option value="rolluik">Rolluik</option><option value="screen">Zipscreen</option></select></div>
            <div><label className="label">Breedte (cm)</label><input className="input" type="number" value={widthCm} onChange={e=>setWidthCm(e.currentTarget.valueAsNumber||0)} /></div>
            <div><label className="label">Hoogte (cm)</label><input className="input" type="number" value={heightCm} onChange={e=>setHeightCm(e.currentTarget.valueAsNumber||0)} /></div>
          </div>
          <div className="mt-4 text-sm">
            <div className="flex justify-between"><span>Oppervlakte</span><span>{price.m2} m²</span></div>
            <div className="flex justify-between"><span>Subtotaal</span><span>€ {price.subtotal}</span></div>
            <div className="flex justify-between"><span>BTW 21%</span><span>€ {price.vat}</span></div>
            <div className="flex justify-between font-semibold mt-2"><span>Totaal</span><span>€ {price.total}</span></div>
          </div>
        </div>
        <div className="card">
          <Image src="https://images.unsplash.com/photo-1600585154340-1e4ce9a1400b?q=80&w=1200&auto=format&fit=crop" alt="Interieur" width={1200} height={600} className="rounded-2xl h-60 w-full object-cover" />
          <p className="text-slate-600 mt-4">Windvaste zipscreens en Somfy io‑bediening mogelijk. Solar zonder 230V.</p>
        </div>
      </div>

      <div className="stickybar mt-10">
        <a className="btn-secondary" href="https://wa.me/31623717058?text=Hoi%2C%20ik%20wil%20een%20offerte" target="_blank">WhatsApp</a>
        <a className="btn-primary" href="#offerte">Offerte</a>
      </div>
    </main>
  )
}
