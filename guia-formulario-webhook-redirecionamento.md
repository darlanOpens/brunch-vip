## Guia: Formulário → Webhook → Redirecionamento (com UTM e Metadados)

Este guia descreve, passo a passo, como implementar a funcionalidade em que um formulário envia os dados para um webhook externo, aguarda a resposta e redireciona o usuário conforme o retorno. Inclui captura de UTMs, envio de metadados (timestamp, userAgent, IP) e boas práticas.

### Visão geral da arquitetura
- Cliente envia formulário para uma rota interna de API
- A rota valida os dados e chama o webhook externo (com timeout)
- O webhook responde `{ redirectUrl: "..." }`
- A rota devolve `{ success, redirectUrl }` ao cliente
- O cliente redireciona para `redirectUrl`
- UTM e metadados (timestamp, userAgent, ip) são enviados ao webhook

### Requisitos
- Next.js (App Router) com TypeScript
- `zod` para validação de entrada/saída
- Ambiente Node 18+ (suporte a `AbortSignal.timeout`)

---

### 1) Variáveis de ambiente (.env.local)
Crie um arquivo `.env.local` no projeto destino (não comite). Evite hardcodes — use variáveis.

```env
# URL do webhook que decide para onde redirecionar
WEBHOOK_LEAD_URL=https://seu-webhook.com/lead

# Se o projeto usar basePath no Next (ex.: "/brunch-vip"), exponha como pública para uso no cliente
NEXT_PUBLIC_BASE_PATH=/seu-base-path

# Caminhos de fallback (server e client)
FALLBACK_REDIRECT_PATH=/lista-espera
NEXT_PUBLIC_FALLBACK_REDIRECT_PATH=/lista-espera
```

Observações:
- `WEBHOOK_LEAD_URL` nunca deve ficar exposta no cliente.
- Se não usar `basePath`, deixe `NEXT_PUBLIC_BASE_PATH` vazio.

---

### 2) Utilitário de UTM (cliente)
Crie `src/lib/utm.ts` para capturar UTMs e adicionar ao payload enviado.

```ts
// src/lib/utm.ts
export interface UTMData {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  referrer_url?: string
}

export function getUTMData(): UTMData {
  if (typeof window === 'undefined') return {}
  const qs = new URLSearchParams(window.location.search)
  const referrer = document.referrer || window.location.href
  return {
    utm_source: qs.get('utm_source') || undefined,
    utm_medium: qs.get('utm_medium') || undefined,
    utm_campaign: qs.get('utm_campaign') || undefined,
    utm_term: qs.get('utm_term') || undefined,
    utm_content: qs.get('utm_content') || undefined,
    referrer_url: referrer,
  }
}

export function addUTMToFormData<T extends Record<string, unknown>>(data: T): T & UTMData {
  return { ...data, ...getUTMData() }
}
```

---

### 3) Helper para montar URL de API (cliente)
Evite hardcode do `basePath`. Crie `src/lib/url.ts`.

```ts
// src/lib/url.ts
export function getApiUrl(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  return `${basePath}${path.startsWith('/') ? path : `/${path}`}`
}
```

---

### 4) Rota interna que chama o webhook (server)
Crie `src/app/api/lead/route.ts` (App Router). Valide entrada e saída com `zod` e implemente fallback seguro.

```ts
// src/app/api/lead/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const inputSchema = z.object({
  email: z.string().email(),
  form_title: z.string().optional(),
  form_id: z.string().optional(),
  // Campos UTM opcionais vindos do cliente
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_term: z.string().optional(),
  utm_content: z.string().optional(),
  referrer_url: z.string().optional(),
})

const webhookResponseSchema = z.object({
  redirectUrl: z.string(),
})

const FALLBACK_REDIRECT = process.env.FALLBACK_REDIRECT_PATH || '/lista-espera'

async function getRedirectUrlFromWebhook(payload: object, url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
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
    const redirectUrl = await getRedirectUrlFromWebhook(webhookPayload, webhookUrl)
    return NextResponse.json({ success: true, redirectUrl }, { status: 200 })
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
```

Notas:
- A rota nunca expõe a URL do webhook ao cliente.
- O fallback de redirecionamento é aplicado no servidor.

---

### 5) Formulário no cliente (React)
Monte o payload com os campos + UTM. Use `getApiUrl('/api/lead')` para compatibilidade com `basePath`. Em sucesso, redirecione.

```tsx
// Exemplo mínimo de formulário de lead
"use client"
import { useState } from "react"
import { addUTMToFormData } from "@/lib/utm"
import { getApiUrl } from "@/lib/url"

export function LeadForm() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = addUTMToFormData({
        email,
        form_title: "Meu Form",
        form_id: "lead_form_v1",
      })

      const res = await fetch(getApiUrl("/api/lead"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const json = await res.json()

      if (res.ok && json.success && json.redirectUrl) {
        window.location.assign(json.redirectUrl)
      } else {
        const base = process.env.NEXT_PUBLIC_BASE_PATH || ""
        const fb = process.env.NEXT_PUBLIC_FALLBACK_REDIRECT_PATH || "/lista-espera"
        window.location.assign(`${base}${fb}`)
      }
    } catch {
      const base = process.env.NEXT_PUBLIC_BASE_PATH || ""
      const fb = process.env.NEXT_PUBLIC_FALLBACK_REDIRECT_PATH || "/lista-espera"
      window.location.assign(`${base}${fb}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
      <button type="submit" disabled={loading}>{loading ? "Enviando..." : "Confirmar"}</button>
    </form>
  )
}
```

---

### 6) Contrato do webhook (destino)
O webhook deve responder JSON com o campo `redirectUrl`:

```json
{ "redirectUrl": "https://seu-dominio.com/confirmar-presenca" }
```

O endpoint pode decidir o redirecionamento com base no email, UTM, origem, etc. Se houver erro HTTP ou formato inválido, o fallback será usado.

---

### 7) Boas práticas
- Não exponha a URL do webhook no cliente; mantenha em variáveis de ambiente do servidor
- Valide entrada e saída com `zod`
- Use timeout ao chamar o webhook (ex.: 20s) para não travar a UX
- Envie `timestamp`, `userAgent` e `ip` para auditoria
- Se usar `basePath` no Next (`next.config.ts`), utilize `getApiUrl` para montar as URLs no cliente

---

### 8) Teste local (Windows / PowerShell)
1. Configure `.env.local` conforme a seção de variáveis
2. Opcional: simule o webhook com `https://webhook.site` e aponte `WEBHOOK_LEAD_URL` para a URL de teste; responda no painel com:
   ```json
   { "redirectUrl": "https://example.com/sucesso" }
   ```
3. Instale dependências e inicie o ambiente de desenvolvimento (comando para você executar):
   - npm: `npm run dev`
   - pnpm: `pnpm dev`

---

### 9) Checklist final
- [ ] `.env.local` com `WEBHOOK_LEAD_URL`, `NEXT_PUBLIC_BASE_PATH`, `FALLBACK_REDIRECT_PATH`, `NEXT_PUBLIC_FALLBACK_REDIRECT_PATH`
- [ ] `src/lib/utm.ts` criado e utilizado no submit
- [ ] `src/lib/url.ts` criado e utilizado para montar URL da API
- [ ] `src/app/api/lead/route.ts` valida dados, chama webhook, aplica fallback e retorna `{ success, redirectUrl }`
- [ ] Formulário no cliente envia payload (+ UTM), trata resposta e redireciona

---

### Observação (Pages Router)
Se o projeto alvo usar Pages Router, crie `pages/api/lead.ts` com a mesma lógica (muda a assinatura do handler), mantendo a validação com `zod` e o mesmo contrato de resposta.



