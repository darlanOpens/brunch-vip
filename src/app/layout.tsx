import type { Metadata } from 'next'
import './globals.css'
import GTMProvider from '@/components/GTMProvider'
import { Toaster } from 'sonner'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Brunch Experience - O Futuro Agora da Experiência do Cliente',
  description: 'Um encontro exclusivo para líderes durante o Startup Summit 2025.',
  manifest: '/brunch-vip/manifest.webmanifest',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://go.opens.com.br'),
  openGraph: {
    type: 'website',
    url: '/brunch-vip',
    title: 'Brunch Experience - O Futuro Agora da Experiência do Cliente',
    description: 'Um encontro exclusivo para líderes durante o Startup Summit 2025.',
    images: [
      { url: '/brunch-vip/preview.png', width: 1200, height: 630, alt: 'Brunch VIP' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brunch Experience - O Futuro Agora da Experiência do Cliente',
    description: 'Um encontro exclusivo para líderes durante o Startup Summit 2025.',
    images: ['/brunch-vip/preview.png'],
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

