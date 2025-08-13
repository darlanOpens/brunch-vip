import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const inputSchema = z.object({
  email: z.string().email(),
  form_title: z.string().optional(),
  form_id: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_term: z.string().optional(),
  utm_content: z.string().optional(),
  referrer_url: z.string().optional(),
})

const webhookResponseSchema = z.object({
  redirectUrl: z.string(),
  webhook_url: z.string().optional(),
  success: z.boolean().optional(),
})

const FALLBACK_REDIRECT = process.env.FALLBACK_REDIRECT_PATH || '/lista-espera'

async function getRedirectUrlFromWebhook(payload: object, url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      // Node 18+ nativo
      signal: AbortSignal.timeout(20_000),
    })
    if (!response.ok) return FALLBACK_REDIRECT
    const json = await response.json()
    const parsed = webhookResponseSchema.safeParse(json)
    if (!parsed.success) return FALLBACK_REDIRECT
    return parsed.data.redirectUrl
  } catch {
    return FALLBACK_REDIRECT
  }
}

export async function POST(request: NextRequest) {
  const webhookUrl = process.env.WEBHOOK_LEAD_URL
  if (!webhookUrl) {
    return NextResponse.json({ success: false, message: 'Webhook não configurado' }, { status: 503 })
  }

  try {
    const body = await request.json()
    const data = inputSchema.parse(body)
    const webhookPayload = {
      ...data,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
    }
    // Faz a chamada para obter redirectUrl e, se existir, também passamos webhook_url para o cliente
    try {
      const resp = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookPayload),
        signal: AbortSignal.timeout(20_000),
      })
      if (!resp.ok) {
        const fallback = await getRedirectUrlFromWebhook(webhookPayload, webhookUrl)
        return NextResponse.json({ success: true, redirectUrl: fallback }, { status: 200 })
      }
      const json = await resp.json().catch(() => ({}))
      const parsed = webhookResponseSchema.safeParse(json)
      if (!parsed.success) {
        const fallback = await getRedirectUrlFromWebhook(webhookPayload, webhookUrl)
        return NextResponse.json({ success: true, redirectUrl: fallback }, { status: 200 })
      }
      return NextResponse.json({ success: true, redirectUrl: parsed.data.redirectUrl, webhook_url: parsed.data.webhook_url }, { status: 200 })
    } catch {
      const fallback = await getRedirectUrlFromWebhook(webhookPayload, webhookUrl)
      return NextResponse.json({ success: true, redirectUrl: fallback }, { status: 200 })
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: 'Dados inválidos', errors: err.issues }, { status: 400 })
    }
    return NextResponse.json({ success: false, message: 'Erro interno' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ message: 'OK', timestamp: new Date().toISOString() })
}
