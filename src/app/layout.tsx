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
    type: "website",
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
        {/* Fallback de conteúdo para crawlers que não executam JavaScript */}
        <noscript>
          <div style={{padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6'}}>
            <h1>Brunch Experience - O Futuro Agora da Experiência do Cliente</h1>
            <p><strong>Data:</strong> 28 de agosto de 2025</p>
            <p><strong>Horário:</strong> 09h – 12h</p>
            <p><strong>Local:</strong> Blackpot Floripa, Florianópolis, SC</p>
            <p><strong>Descrição:</strong> Um encontro exclusivo para líderes durante o Startup Summit 2025.</p>
            <p><strong>Características:</strong> Evento VIP, vagas limitadas, apenas por convite</p>
            <p><strong>Palestrantes:</strong> David Ledson, Bento Meirelles, Marcela Zaidem, Leonardo Superti, Dionara Conrad e outros</p>
            <p><strong>Organização:</strong> Opens</p>
            <p><strong>Website:</strong> https://go.opens.com.br/brunch-vip</p>
            <p><strong>Informações completas:</strong> <a href="/brunch-vip/brunch-vip.txt">Versão texto</a> | <a href="/brunch-vip/brunch-vip.json">Dados estruturados</a></p>
          </div>
        </noscript>
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
        
        {/* Conteúdo crítico para SEO - renderizado no servidor */}
        <div style={{
          position: 'absolute',
          left: '-9999px',
          top: '-9999px',
          width: '1px',
          height: '1px',
          overflow: 'hidden'
        }}>
          <h1>Brunch Experience - O Futuro Agora da Experiência do Cliente</h1>
          <p>Um encontro exclusivo para líderes durante o Startup Summit 2025</p>
          <div>
            <p>Data: 28 de agosto de 2025</p>
            <p>Horário: 09h às 12h</p>
            <p>Local: Blackpot Floripa, Florianópolis - SC</p>
          </div>
          <div>
            <h2>Palestrantes Confirmados:</h2>
            <p>David Ledson - Ex-sócio de Sympla, iFood, Sólides | Fundador GarantiaBR</p>
            <p>Bento Meirelles - Founder da Minimal</p>
            <p>Douglas Conrad - Empreendedor e Investidor</p>
            <p>Guilherme Ferreira - CEO da Atomsix</p>
            <p>Marcela Zaidem - Fundadora CNP | Ex-G4 Educação</p>
            <p>Dionara Conrad - CEO Opens e mestre de cerimônia</p>
            <p>João Paulo - CSO da Nextar</p>
            <p>Aline Simões - Especialista em Marketing Digital</p>
            <p>Leonardo Superti - CEO da CustomerX</p>
            <p>Veridiana Santos - Consultora em Experiência do Cliente</p>
          </div>
          <div>
            <h2>Sobre o Evento:</h2>
            <p>Este não é um evento para todos. É uma experiência exclusiva, pensada para líderes que entendem que o futuro dos negócios está na experiência do cliente.</p>
            <p>Vagas limitadas. Apenas por convite.</p>
          </div>
        </div>
        
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

