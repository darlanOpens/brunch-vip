"use client"

import { ReactNode, useEffect, useRef } from "react"
import TagManager from "react-gtm-module"
import { usePathname, useSearchParams } from "next/navigation"

type GTMProviderProps = {
  children: ReactNode
}

export default function GTMProvider({ children }: GTMProviderProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const hasInitializedRef = useRef(false)

  const gtmId = process.env.NEXT_PUBLIC_GTM_ID
  const gtmAuth = process.env.NEXT_PUBLIC_GTM_AUTH
  const gtmPreview = process.env.NEXT_PUBLIC_GTM_PREVIEW

  useEffect(() => {
    if (hasInitializedRef.current) return
    if (!gtmId) return

    TagManager.initialize({
      gtmId,
      ...(gtmAuth ? { auth: gtmAuth } : {}),
      ...(gtmPreview ? { preview: gtmPreview } : {}),
      dataLayer: {
        pagePath: typeof window !== "undefined" ? window.location.pathname + window.location.search : undefined,
        pageTitle: typeof document !== "undefined" ? document.title : undefined,
      },
    })

    hasInitializedRef.current = true
  }, [gtmAuth, gtmId, gtmPreview])

  useEffect(() => {
    if (!gtmId) return

    TagManager.dataLayer({
      dataLayer: {
        event: "pageview",
        pagePath: typeof window !== "undefined" ? window.location.pathname + window.location.search : pathname || "/",
        pageTitle: typeof document !== "undefined" ? document.title : undefined,
      },
    })
  }, [gtmId, pathname, searchParams])

  return <>{children}</>
}


