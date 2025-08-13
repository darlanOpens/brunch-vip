import { NextRequest, NextResponse } from 'next/server'

function maskUrl(url: string): string {
  try {
    const u = new URL(url)
    return `${u.origin}${u.pathname}`
  } catch {
    return 'invalid-url'
  }
}

function isAllowedResumeUrl(resumeUrl: string): boolean {
  const csv = process.env.N8N_RESUME_ALLOWED_PREFIXES || ''
  const prefixes = csv.split(',').map((s) => s.trim()).filter(Boolean)
  if (prefixes.length === 0) return false
  return prefixes.some((prefix) => resumeUrl.startsWith(prefix))
}

export async function POST(request: NextRequest) {
  try {
    const debug = process.env.NEXT_PUBLIC_DEBUG_WEBHOOKS === 'true'
    const body = await request.json().catch(() => ({} as any))
    const urlFromQuery = request.nextUrl.searchParams.get('resumeUrl') || request.nextUrl.searchParams.get('webhook_url')
    const urlFromHeader = request.headers.get('x-resume-url') || request.headers.get('x-webhook-url')
    const candidateResumeUrl: unknown = body?.resumeUrl || body?.webhook_url || urlFromHeader || urlFromQuery

    let targetUrl: string | undefined

    if (typeof candidateResumeUrl === 'string' && candidateResumeUrl) {
      const allowed = isAllowedResumeUrl(candidateResumeUrl)
      if (debug) {
        console.log('[confirm-details] Incoming', {
          from: 'body/header/query',
          urlFromQuery: urlFromQuery ? maskUrl(urlFromQuery) : null,
          urlFromHeader: urlFromHeader ? maskUrl(urlFromHeader) : null,
          hasBodyResumeUrl: typeof body?.resumeUrl === 'string',
          hasBodyWebhookUrl: typeof body?.webhook_url === 'string',
          chosen: maskUrl(candidateResumeUrl),
          allowed,
          prefixes: process.env.N8N_RESUME_ALLOWED_PREFIXES || '',
          ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'n/a',
          ua: request.headers.get('user-agent') || 'n/a',
        })
      }
      if (!allowed) {
        if (debug) {
          console.warn('[confirm-details] Blocked: destination not allowed', maskUrl(candidateResumeUrl))
        }
        return NextResponse.json({ ok: false, message: 'Destino não permitido' }, { status: 403 })
      }
      targetUrl = candidateResumeUrl
    } else {
      // Sem fallback: exige que o cliente envie o resumeUrl
      if (debug) {
        console.warn('[confirm-details] Missing resumeUrl', {
          urlFromQuery: urlFromQuery ? maskUrl(urlFromQuery) : null,
          hasHeader: Boolean(urlFromHeader),
          bodyKeys: Object.keys(body || {}),
        })
      }
      return NextResponse.json({ ok: false, message: 'resumeUrl obrigatório' }, { status: 400 })
    }

    // targetUrl garantido aqui

    // Monta payload: aceita formato { resumeUrl, payload } ou body direto
    const basePayload = typeof body?.payload === 'object' && body?.payload !== null
      ? body.payload
      : Object.fromEntries(Object.entries(body || {}).filter(([k]) => k !== 'resumeUrl' && k !== 'webhook_url'))

    const payload = {
      ...basePayload,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
    }

    const start = Date.now()
    try {
      const n8nResponse = await fetch(targetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(20_000),
      })

      const elapsed = Date.now() - start
      let responseText = ''
      try {
        responseText = await n8nResponse.text()
      } catch {}

      let parsed: unknown
      try {
        parsed = responseText ? JSON.parse(responseText) : null
      } catch {
        parsed = { raw: responseText }
      }

      if (debug) {
        console.log('[confirm-details] n8n response', {
          ok: n8nResponse.ok,
          status: n8nResponse.status,
          elapsedMs: elapsed,
          target: maskUrl(targetUrl!),
          bodyPreview: responseText ? responseText.slice(0, 1000) : '',
        })
      }

      return NextResponse.json({ ok: n8nResponse.ok, status: n8nResponse.status, data: parsed }, { status: 200 })
    } catch (err: any) {
      if (debug) {
        console.error('[confirm-details] n8n fetch error', {
          target: maskUrl(targetUrl!),
          elapsedMs: Date.now() - start,
          error: err?.message || String(err),
        })
      }
      return NextResponse.json({ ok: false, status: 0, error: 'Erro ao repassar para n8n' }, { status: 502 })
    }
  } catch {
    const debug = process.env.NEXT_PUBLIC_DEBUG_WEBHOOKS === 'true'
    if (debug) {
      console.error('[confirm-details] Unhandled error parsing request')
    }
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}


