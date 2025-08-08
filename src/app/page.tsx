import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Speakers from '@/components/Speakers'
import Gallery from '@/components/Gallery'
import Sponsors from '@/components/Sponsors'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function LandingPage() {
  return (
    <div className="bg-[#000000] box-border content-stretch flex flex-col gap-1 items-start justify-start p-0 relative size-full">
      <Hero />
      <Features />
      <Speakers />
      <Gallery />
      <Sponsors />
      <CTA />
      <Footer />
    </div>
  )
}
