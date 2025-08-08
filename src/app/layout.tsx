import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Brunch Experience - O Futuro Agora da Experiência do Cliente',
  description: 'Um encontro exclusivo para líderes durante o Startup Summit 2025.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}

