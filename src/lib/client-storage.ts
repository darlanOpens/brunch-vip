// Utilitários de storage do cliente para o fluxo de pré-seleção
// Guarda o telefone (localStorage) e a webhook_url de retomada (sessionStorage)

const PHONE_KEY = 'preSelecaoPhone'
const EMAIL_KEY = 'preSelecaoEmail' // Mantido para compatibilidade
const WEBHOOK_KEY = 'preSelecaoWebhookUrl'

// Funções para telefone (nova implementação)
export function savePreSelecaoPhone(phone: string): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(PHONE_KEY, phone)
  } catch {}
}

export function getPreSelecaoPhone(): string {
  if (typeof window === 'undefined') return ''
  try {
    return localStorage.getItem(PHONE_KEY) || ''
  } catch {
    return ''
  }
}

export function clearPreSelecaoPhone(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(PHONE_KEY)
  } catch {}
}

// Funções para email (mantidas para compatibilidade)
export function savePreSelecaoEmail(email: string): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(EMAIL_KEY, email)
  } catch {}
}

export function getPreSelecaoEmail(): string {
  if (typeof window === 'undefined') return ''
  try {
    return localStorage.getItem(EMAIL_KEY) || ''
  } catch {
    return ''
  }
}

export function clearPreSelecaoEmail(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(EMAIL_KEY)
  } catch {}
}

export function savePreSelecaoWebhookUrl(url: string): void {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(WEBHOOK_KEY, url)
  } catch {}
}

export function getPreSelecaoWebhookUrl(): string {
  if (typeof window === 'undefined') return ''
  try {
    return sessionStorage.getItem(WEBHOOK_KEY) || ''
  } catch {
    return ''
  }
}

export function clearPreSelecaoWebhookUrl(): void {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.removeItem(WEBHOOK_KEY)
  } catch {}
}


