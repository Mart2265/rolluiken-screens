
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('[QUOTE] New lead', body);

    const apiKey = process.env.RESEND_API_KEY;
    const to = 'mart_2265@hotmail.com';

    if (apiKey) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'offerte@rolluikenvoorjou.nl',
          to: [to],
          subject: 'Nieuwe offerte-aanvraag – Rolluikenvoorjou',
          html: `<pre>${JSON.stringify(body, null, 2)}</pre>`
        })
      });
      const out = await res.json();
      console.log('[QUOTE] Resend response', out);
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ ok: false, error: e?.message }, { status: 500 });
  }
}
