"use client"

import TagManager from "react-gtm-module"

export const GTM_EVENTS = {
  PAGEVIEW: "pageview",
  FORM_SUBMIT: "form_submit",
  WAITLIST_SUBMIT: "waitlist_submit",
  CONFIRM_DETAILS_SUBMIT: "confirm_details_submit",
} as const

export type GtmEventName = typeof GTM_EVENTS[keyof typeof GTM_EVENTS]

export function pushToDataLayer(eventName: GtmEventName | string, data: Record<string, unknown> = {}): void {
  TagManager.dataLayer({
    dataLayer: {
      event: eventName,
      ...data,
    },
  })
}


