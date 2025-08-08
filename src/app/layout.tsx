import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Brunch Experience - O Futuro Agora da Experiência do Cliente',
  description: 'Um encontro exclusivo para líderes durante o Startup Summit 2025.',
  manifest: '/brunch-vip/manifest.webmanifest',
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
      <body>{children}</body>
    </html>
  )
}

