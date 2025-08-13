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
  success: z.boolean().optional(),
  redirectUrl: z.string(),
  webhook_url: z.string().optional(),
})

const FALLBACK_REDIRECT = process.env.FALLBACK_REDIRECT_PATH || '/pre-selecao'

export async function POST(request: NextRequest) {
  // Usar somente WEBHOOK_LEAD_URL conforme solicitado
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

    // Enviar para n8n e repassar resposta exatamente como vem
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(webhookPayload),
      signal: AbortSignal.timeout(20_000),
    })

    if (!response.ok) {
      // Fallback se n8n não responder adequadamente
      return NextResponse.json({ 
        success: true, 
        redirectUrl: FALLBACK_REDIRECT 
      }, { status: 200 })
    }

    const responseData = await response.json()

    // Validar estrutura da resposta
    const parsed = webhookResponseSchema.safeParse(responseData)
    if (!parsed.success) {
      return NextResponse.json({ 
        success: true, 
        redirectUrl: FALLBACK_REDIRECT 
      }, { status: 200 })
    }

    // Repassar resposta do n8n EXATAMENTE como recebida
    const finalResponse = {
      success: true,
      redirectUrl: parsed.data.redirectUrl,
      ...(parsed.data.webhook_url && { webhook_url: parsed.data.webhook_url }),
    }

    return NextResponse.json(finalResponse, { status: 200 })

  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: 'Dados inválidos', errors: err.issues }, { status: 400 })
    }
    
    // Em caso de erro, usar fallback
    return NextResponse.json({ 
      success: true, 
      redirectUrl: FALLBACK_REDIRECT 
    }, { status: 200 })
  }
}

export async function GET() {
  return NextResponse.json({ message: 'OK', timestamp: new Date().toISOString() })
}
