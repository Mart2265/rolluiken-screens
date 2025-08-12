
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const data = await request.json()
  console.log('Ontvangen offerte:', data)
  return NextResponse.json({ message: 'Offerte ontvangen' })
}
