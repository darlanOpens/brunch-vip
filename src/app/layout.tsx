import type { Metadata } from 'next'
import './globals.css'
import GTMProvider from '@/components/GTMProvider'
import { Toaster } from 'sonner'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: "Brunch Experience - O Futuro Agora da Experiência do Cliente",
  description: "Um encontro exclusivo para líderes durante o Startup Summit 2025. 28 de agosto, 09h-12h no Blackpot Floripa.",
  keywords: "brunch, vip, networking, experiência do cliente, startup summit, florianópolis, empreendedorismo, evento exclusivo",
  authors: [{ name: "Opens" }],
  creator: "Opens",
  publisher: "Opens",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: '/brunch-vip/manifest.webmanifest',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://go.opens.com.br'),
  alternates: {
    canonical: '/brunch-vip',
  },
  openGraph: {
    title: "Brunch Experience - O Futuro Agora da Experiência do Cliente",
    description: "Um encontro exclusivo para líderes durante o Startup Summit 2025. 28 de agosto, 09h-12h no Blackpot Floripa.",
    type: "event",
    url: "/brunch-vip",
    siteName: "Opens",
    locale: "pt_BR",
    images: [
      {
        url: "/brunch-vip/preview.png",
        width: 1200,
        height: 630,
        alt: "Brunch Experience - O Futuro Agora da Experiência do Cliente",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@opens",
    creator: "@opens",
    title: "Brunch Experience - O Futuro Agora da Experiência do Cliente",
    description: "Um encontro exclusivo para líderes durante o Startup Summit 2025. 28 de agosto, 09h-12h no Blackpot Floripa.",
    images: {
      url: "/brunch-vip/preview.png",
      alt: "Brunch Experience - O Futuro Agora da Experiência do Cliente",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Preload background principal para melhorar LCP */}
        <link rel="preload" as="image" href="/brunch-vip/Bg.png" imageSrcSet="/brunch-vip/Bg.png" />
        <link rel="icon" href="/brunch-vip/icon.svg" type="image/svg+xml" />
        {/* Exemplos de preload de fontes se necessário */}
        {/* <link rel="preload" as="font" href="/brunch-vip/butler/Butler_Webfont/Butler.woff2" type="font/woff2" crossOrigin="anonymous" /> */}
        
        {/* Schema.org JSON-LD para dados estruturados do evento */}
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              "name": "Brunch Experience - O Futuro Agora da Experiência do Cliente",
              "description": "Um encontro exclusivo para líderes durante o Startup Summit 2025.",
              "startDate": "2025-08-28T09:00:00-03:00",
              "endDate": "2025-08-28T12:00:00-03:00",
              "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
              "eventStatus": "https://schema.org/EventScheduled",
              "location": {
                "@type": "Place",
                "name": "Blackpot Floripa",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Florianópolis",
                  "addressRegion": "SC",
                  "addressCountry": "BR"
                }
              },
              "organizer": {
                "@type": "Organization",
                "name": "Opens",
                "url": "https://go.opens.com.br"
              },
              "url": "https://go.opens.com.br/brunch-vip",
              "image": "https://go.opens.com.br/brunch-vip/preview.png",
              "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InvitationOnly",
                "price": "0",
                "priceCurrency": "BRL",
                "validFrom": "2025-01-01T00:00:00-03:00"
              },
              "performer": [
                {
                  "@type": "Person",
                  "name": "David Ledson",
                  "jobTitle": "Ex-sócio de Sympla, iFood, Sólides | Fundador GarantiaBR"
                },
                {
                  "@type": "Person",
                  "name": "Bento Meirelles",
                  "jobTitle": "Founder da Minimal"
                },
                {
                  "@type": "Person",
                  "name": "Marcela Zaidem",
                  "jobTitle": "Fundadora CNP | Ex-G4 Educação"
                },
                {
                  "@type": "Person",
                  "name": "Leonardo Superti",
                  "jobTitle": "CEO da CustomerX"
                },
                {
                  "@type": "Person",
                  "name": "Dionara Conrad",
                  "jobTitle": "CEO Opens e mestre de cerimônia"
                }
              ],
              "audience": {
                "@type": "Audience",
                "audienceType": "Empreendedores, líderes empresariais, investidores"
              },
              "keywords": "brunch, vip, networking, experiência do cliente, startup summit, florianópolis, empreendedorismo",
              "inLanguage": "pt-BR"
            })
          }}
        />
      </head>
      <body>
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            {/* Fallback noscript do GTM */}
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <Suspense fallback={null}>
          <GTMProvider>
            {children}
            <Toaster richColors position="top-center" />
          </GTMProvider>
        </Suspense>
      </body>
    </html>
  )
}

