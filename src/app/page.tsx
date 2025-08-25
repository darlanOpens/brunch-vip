import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Speakers from '@/components/Speakers'
import Gallery from '@/components/Gallery'
import Sponsors from '@/components/Sponsors'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import ServerContent from '@/components/ServerContent'
import { Suspense } from 'react'

/**
 * Página principal do evento Brunch Experience
 * Renderizada no servidor para melhor SEO e acessibilidade para crawlers
 */
export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Conteúdo crítico renderizado no servidor para SEO */}
      <ServerContent />
      
      <div className="bg-[#000000] box-border content-stretch flex flex-col gap-1 items-start justify-start p-0 relative size-full">

      
      <Suspense fallback={null}>
        <Hero />
      </Suspense>
      <Features />
      <Speakers />
      <Gallery />
      <Sponsors />
      <CTA />
      <Footer />
      </div>
    </main>
  )
}
