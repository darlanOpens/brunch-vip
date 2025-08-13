import { NextRequest, NextResponse } from 'next/server'

function isAllowedResumeUrl(resumeUrl: string): boolean {
  const csv = process.env.N8N_RESUME_ALLOWED_PREFIXES || ''
  const prefixes = csv.split(',').map((s) => s.trim()).filter(Boolean)
  if (prefixes.length === 0) return false
  return prefixes.some((prefix) => resumeUrl.startsWith(prefix))
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({} as any))
    const urlFromQuery = request.nextUrl.searchParams.get('resumeUrl') || request.nextUrl.searchParams.get('webhook_url')
    const urlFromHeader = request.headers.get('x-resume-url') || request.headers.get('x-webhook-url')
    const candidateResumeUrl: unknown = body?.resumeUrl || body?.webhook_url || urlFromHeader || urlFromQuery

    let targetUrl: string | undefined

    if (typeof candidateResumeUrl === 'string' && candidateResumeUrl) {
      if (!isAllowedResumeUrl(candidateResumeUrl)) {
        return NextResponse.json({ ok: false, message: 'Destino não permitido' }, { status: 403 })
      }
      targetUrl = candidateResumeUrl
    } else {
      // Sem fallback: exige que o cliente envie o resumeUrl
      return NextResponse.json({ ok: false, message: 'resumeUrl obrigatório' }, { status: 400 })
    }

    // targetUrl garantido aqui

    const payload = {
      ...body,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
    }

    // fire-and-forget
    fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(20_000),
    }).catch(() => {})

    return NextResponse.json({ ok: true }, { status: 202 })
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}


