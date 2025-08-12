
# Rolluikenvoorjou – Pro Landing

**Wat zit erin**
- Volledig gestylede landing (hero, producten, kleuren, calculator, reviews, formulier)
- Sticky WhatsApp/Offerte-balk
- SEO (OpenGraph/Twitter) + JSON-LD
- `/api/quote` die e-mailt via **Resend** als `RESEND_API_KEY` is gezet; anders logt hij

**Snel starten**
1) `npm install`
2) `npm run dev` → http://localhost:3000
3) Commit naar GitHub → Vercel: **Redeploy** + **Clear build cache**

**WhatsApp**
- Zet `.env` met: `NEXT_PUBLIC_WHATSAPP_NR=31623717058` (zonder +)

**E-mail via Resend**
- Vercel → Settings → **Environment Variables** → `RESEND_API_KEY`
- Dan mailt `/api/quote` door naar `mart_2265@hotmail.com`.
