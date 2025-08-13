# Fluxo de Pré-seleção com n8n Wait (On Webhook Call) + Next.js

Este guia documenta o processo de duas etapas usando n8n (Wait: On Webhook Call) e Next.js:

- Primeiro formulário (landing `/`) envia para um webhook principal (n8n).
- A resposta SEMPRE é sucesso. Se o e-mail não for convidado, a resposta inclui `webhook_url` (URL de retomada do Wait, `$execution.resumeUrl`).
- A página de pré-seleção (`/pre-selecao`) usa essa `webhook_url` para enviar o formulário secundário e retomar o mesmo workflow no n8n.
- O e-mail informado na primeira etapa é salvo no navegador e pré-preenche o formulário da pré-seleção.
- O envio da pré-seleção exibe um toast de sucesso, oculta o formulário e exibe ícone de check.

Referência do Wait node: [n8n — Wait | On Webhook Call](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.wait/?utm_source=n8n_app&utm_medium=node_settings_modal-credential_link&utm_campaign=n8n-nodes-base.wait#on-webhook-call)

---

## 1) Variáveis de ambiente (EasyPanel)

Defina em produção:

```
NEXT_PUBLIC_BASE_PATH=/elga
NEXT_PUBLIC_ENABLE_TOOLBAR=false
NEXT_PUBLIC_SILENCE_GTM_LOGS=true
NEXT_PUBLIC_GTM_ALLOW_PREVIEW=false
NEXT_PUBLIC_DEBUG_WEBHOOKS=false
NEXT_PUBLIC_GTM_ID=GTM-K3SBSHG5

WEBHOOK_RSVP_URL=https://n8n.opens.com.br/webhook/confirmacao
WEBHOOK_NEWSLETTER_URL=https://n8n.opens.com.br/webhook/pre-selecao-form
WEBHOOK_CONTACT_URL=https://n8n.opens.com.br/webhook/contact-form

# Opcional: reforço de segurança do proxy server-side
N8N_RESUME_ALLOWED_PREFIXES=https://n8n.opens.com.br/webhook-waiting/,https://n8n.opens.com.br/webhook/
```

Observação: com `basePath: '/elga'` no `next.config.mjs`, chamadas internas no cliente devem usar `/elga/...`.

---

## 2) Backend Next.js (API Routes)

### 2.1) API interna de webhooks

- Arquivo: `app/api/webhook/route.ts`
- Recebe POST do front e encaminha ao n8n conforme o tipo (`RSVP`, `NEWSLETTER`, `CONTACT`).
- O cliente chama via `fetch("${basePath}/api/webhook", ...)`.

### 2.2) Proxy para evitar CORS na `resumeUrl`

- Arquivo: `app/api/wait-resume/route.ts`
- Entrada (POST JSON):

```json
{
  "resumeUrl": "https://n8n.opens.com.br/webhook-waiting/abc123",
  "payload": { "name": "...", "email": "..." }
}
```

- Comportamento:
  - Valida `resumeUrl` por whitelist (`N8N_RESUME_ALLOWED_PREFIXES`).
  - Faz POST server-side para o n8n com o `payload` e retorna `{ ok, status, data }`.

Motivo: o navegador não consegue postar diretamente na `resumeUrl` do n8n por CORS; o proxy contorna com segurança.

---

## 3) Utilitários de storage no cliente

- Arquivo: `lib/client-storage.ts`
- Chaves:
  - `preSelecaoEmail` (localStorage)
  - `preSelecaoWebhookUrl` (sessionStorage)
- Funções:
  - `savePreSelecaoEmail`, `getPreSelecaoEmail`, `clearPreSelecaoEmail`
  - `savePreSelecaoWebhookUrl`, `getPreSelecaoWebhookUrl`, `clearPreSelecaoWebhookUrl`

Recomendação: e-mail em localStorage (UX) e `webhook_url` em sessionStorage (vida da aba).

---

## 4) Página inicial (`/`) — Primeiro formulário

- Arquivo: `app/page.tsx`
- Fluxo:
  1. Envia `RSVP` via `sendToWebhook("RSVP", { email })` para `/api/webhook`.
  2. Ignora `success` da resposta. Use apenas:
     - `redirectUrl` para redirecionar;
     - `webhook_url` para armazenar.
  3. Se `redirectUrl` aponta para `/pre-selecao`, salvar e-mail para pré-preencher a próxima etapa.

Exemplo (conceito):

```ts
const data = await response.json()
if (data.webhook_url) savePreSelecaoWebhookUrl(data.webhook_url)
if (data.redirectUrl?.includes('/pre-selecao')) savePreSelecaoEmail(email)
if (data.redirectUrl) window.location.href = data.redirectUrl
else router.push('/pre-selecao')
```

Modelos de resposta do n8n:

- Convidado:
```json
{ "success": true, "redirectUrl": "https://go.opens.com.br/elga/presenca-confirmada" }
```

- Não convidado (com Wait):
```json
{
  "success": true,
  "redirectUrl": "https://go.opens.com.br/elga/pre-selecao",
  "webhook_url": "https://n8n.opens.com.br/webhook-waiting/abc123"
}
```

---

## 5) Página de pré-seleção (`/pre-selecao`) — Segundo formulário

- Arquivo: `app/pre-selecao/page.tsx`
- Implementado:
  - **Inputs sem labels** (placeholders apenas).
  - **E-mail pré-preenchido** com `getPreSelecaoEmail()`.
  - **Máscara de telefone** dinâmica:
    - Até 10 dígitos: `(XX) XXXX-XXXX`
    - 11 dígitos: `(XX) 9XXXX-XXXX`
  - **Envio**:
    - Se existir `webhookUrl` (do Wait): POST em `${BASE_PATH}/api/wait-resume` com `{ resumeUrl, payload }`.
    - Caso contrário: fallback para `sendToWebhook('NEWSLETTER', payload)`.
  - **Feedback**: toast Sonner (sucesso/erro) e, se sucesso, oculta o formulário e exibe ícone de check.

Exemplo de envio via proxy (conceito):

```ts
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
await fetch(`${basePath}/api/wait-resume`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ resumeUrl: webhookUrl, payload: formData })
})
```

Toast (Sonner):

```ts
import { toast } from 'sonner'

// Sucesso
toast.success('Dados enviados com sucesso!')

// Erro
toast.error('Não foi possível enviar seus dados. Tente novamente.')
```

Toaster global em `app/layout.tsx`:

```tsx
<SonnerToaster richColors position="top-center" />
```

UI de sucesso:

```tsx
{isSubmitted ? (
  <div className="flex flex-col items-center justify-center py-8">
    <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
    <p className="font-sans text-lg text-text-high">Recebemos seus dados. Obrigado!</p>
  </div>
) : (
  // Formulário aqui
)}
```

---

## 6) Fluxo no n8n (conceito)

```
[Webhook Inicial]
  → [Verifica se é convidado]
    ├─ SIM → [Processa presença] → [Response com redirectUrl confirmação]
    └─ NÃO → [Wait (On Webhook Call)] → [Response imediato com redirectUrl + $execution.resumeUrl]
            ↓ (quando a resumeUrl recebe os dados da pré-seleção)
          [Processa pré-seleção] → [continua o workflow]
```

No Wait node, configure **Respond = Immediately** e retorne algo como:

```json
{
  "success": true,
  "redirectUrl": "{{ $node[\"Webhook\"].json[\"headers\"][\"referer\"] }}elga/pre-selecao",
  "webhook_url": "{{ $execution.resumeUrl }}"
}
```

---

## 7) Segurança

- Use o proxy `/api/wait-resume` (não poste direto na `resumeUrl`).
- Restrinja destinos com `N8N_RESUME_ALLOWED_PREFIXES`.
- Guarde `webhook_url` em **sessionStorage**; e-mail em **localStorage** (UX).

---

## 8) Teste end-to-end

1. Na landing (`/`), envie o e-mail.
2. Resposta do n8n:
   - Convidado: redireciona para confirmação.
   - Não convidado: redireciona para `/pre-selecao` com `webhook_url`.
3. Em `/pre-selecao`:
   - E-mail pré-preenchido, máscara no telefone.
   - Envie: verifique o toast e o sumiço do formulário com ícone de check.
4. No n8n: a execução do Wait deve **retomar** quando a `resumeUrl` recebe o POST.

---

## 9) Problemas comuns

- **404 em `/api/webhook`**: confirmar `NEXT_PUBLIC_BASE_PATH=/elga` e reiniciar app.
- **CORS ao chamar `webhook-waiting`**: usar `/api/wait-resume` (proxy).
- **Logs de GTM/Preview**: fechar Preview/Debug no GTM.
- **`postMessage` de widget**: pausar/remover no GTM para o domínio atual.

---

## 10) Arquivos-chave

- `app/page.tsx` — salva `webhook_url`/e-mail e redireciona.
- `app/pre-selecao/page.tsx` — pré-preenche e-mail, máscara de telefone, envia via proxy, toast + ícone de sucesso.
- `app/api/webhook/route.ts` — API interna (RSVP/NEWSLETTER/CONTACT).
- `app/api/wait-resume/route.ts` — proxy seguro para a `resumeUrl` do n8n.
- `lib/client-storage.ts` — storage no cliente (local/session).
- `app/layout.tsx` — Toaster Sonner global e GTM (produção).

---

## 11) Referência

- [n8n Wait (On Webhook Call) — docs oficiais](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.wait/?utm_source=n8n_app&utm_medium=node_settings_modal-credential_link&utm_campaign=n8n-nodes-base.wait#on-webhook-call)
