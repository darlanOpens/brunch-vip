import { NextRequest, NextResponse } from 'next/server'

// Lista de user agents de crawlers e bots
const CRAWLER_USER_AGENTS = [
  'googlebot',
  'bingbot',
  'slurp',
  'duckduckbot',
  'baiduspider',
  'yandexbot',
  'facebookexternalhit',
  'twitterbot',
  'linkedinbot',
  'whatsapp',
  'telegrambot',
  'applebot',
  'gptbot',
  'chatgpt',
  'claude',
  'anthropic'
]

// Conteúdo HTML estático para crawlers
const STATIC_CONTENT = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Brunch Experience - O Futuro Agora da Experiência do Cliente</title>
  <meta name="description" content="Um encontro exclusivo para líderes durante o Startup Summit 2025. 28 de agosto, 09h-12h no Blackpot Floripa.">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="canonical" href="https://go.opens.com.br/brunch-vip">
  
  <!-- Open Graph -->
  <meta property="og:title" content="Brunch Experience - O Futuro Agora da Experiência do Cliente">
  <meta property="og:description" content="Um encontro exclusivo para líderes durante o Startup Summit 2025. 28 de agosto, 09h-12h no Blackpot Floripa.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://go.opens.com.br/brunch-vip">
  <meta property="og:image" content="https://go.opens.com.br/brunch-vip/preview.png">
  
  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  {
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
    "url": "https://go.opens.com.br/brunch-vip"
  }
  </script>
</head>
<body>
  <main>
    <h1>Brunch Experience - O Futuro Agora da Experiência do Cliente</h1>
    <p>Um encontro exclusivo para líderes durante o Startup Summit 2025</p>
    
    <section>
      <h2>Detalhes do Evento</h2>
      <p><strong>Data:</strong> 28 de agosto de 2025</p>
      <p><strong>Horário:</strong> 09h às 12h</p>
      <p><strong>Local:</strong> Blackpot Floripa, Florianópolis - SC</p>
    </section>
    
    <section>
      <h2>Palestrantes Confirmados</h2>
      <ul>
        <li>David Ledson - Ex-sócio de Sympla, iFood, Sólides | Fundador GarantiaBR</li>
        <li>Bento Meirelles - Founder da Minimal</li>
        <li>Douglas Conrad - Empreendedor e Investidor</li>
        <li>Guilherme Ferreira - CEO da Atomsix</li>
        <li>Marcela Zaidem - Fundadora CNP | Ex-G4 Educação</li>
        <li>Dionara Conrad - CEO Opens e mestre de cerimônia</li>
        <li>João Paulo - CSO da Nextar</li>
        <li>Aline Simões - Especialista em Marketing Digital</li>
        <li>Leonardo Superti - CEO da CustomerX</li>
        <li>Veridiana Santos - Consultora em Experiência do Cliente</li>
      </ul>
    </section>
    
    <section>
      <h2>Sobre o Evento</h2>
      <p>Este não é um evento para todos. É uma experiência exclusiva, pensada para líderes que entendem que o futuro dos negócios está na experiência do cliente.</p>
      <p>Vagas limitadas. Apenas por convite.</p>
      
      <h3>Características do evento:</h3>
      <ul>
        <li>Exclusivo - Mais que networking, uma experiência curada para conexões humanas</li>
        <li>Apenas por Convite - Acesso restrito a empreendedores e líderes selecionados</li>
        <li>Networking de Alto Nível - Conexões estratégicas com quem realmente importa</li>
        <li>Experiência Premium - Ambiente exclusivo no melhor restaurante de Floripa</li>
        <li>Conteúdo Exclusivo - Insights e estratégias compartilhadas apenas entre nós</li>
      </ul>
    </section>
    
    <section>
      <h2>Organização</h2>
      <p>Evento organizado pela Opens durante o Startup Summit 2025</p>
      <p>Para mais informações: <a href="/brunch-vip.txt">Versão texto</a> | <a href="/brunch-vip.json">Dados JSON</a></p>
    </section>
  </main>
</body>
</html>
`

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || ''
  const pathname = request.nextUrl.pathname
  
  // Verifica se é um crawler e se está acessando a página principal ou /brunch-vip
  const isCrawler = CRAWLER_USER_AGENTS.some(crawler => userAgent.includes(crawler))
  const isTargetPath = pathname === '/' || pathname === '/brunch-vip'
  
  if (isCrawler && isTargetPath) {
    return new NextResponse(STATIC_CONTENT, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    })
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/brunch-vip']
}