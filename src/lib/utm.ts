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
