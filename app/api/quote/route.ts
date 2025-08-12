import { NextResponse } from 'next/server'
export async function POST(req: Request){ const data = await req.json(); console.log('[QUOTE]', data); return NextResponse.json({ok:true}) }
