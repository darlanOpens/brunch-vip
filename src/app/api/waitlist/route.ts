import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const url = process.env.WEBHOOK_WAITLIST_URL
  if (!url) {
    // Não bloqueia a UX, mas informa ambiente
    return NextResponse.json({ ok: false, message: 'Webhook não configurado' }, { status: 503 })
  }

  try {
    const body = await request.json().catch(() => ({} as any))
    const payload = {
      ...body,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
    }

    // Fire-and-forget
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      // Não aguardamos a resposta
    }).catch(() => {})

    return NextResponse.json({ ok: true }, { status: 202 })
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}


