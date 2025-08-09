import { Calendar, Clock, MapPin } from "lucide-react"
import Footer from "@/components/Footer"
import WaitlistForm from "./waitlist-form"
import { withBasePath } from "@/utils/basePath"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pré-seleção — Brunch VIP",
  description:
    "Pouquíssimas confirmações adicionais por seleção. Envie seus dados para participar da pré-seleção.",
  openGraph: {
    title: "Pré-seleção — Brunch VIP",
    description:
      "Pouquíssimas confirmações adicionais por seleção. Envie seus dados para participar da pré-seleção.",
  },
}

export default function PreSelecaoPage() {
  const EVENT_DETAILS = [
    { icon: Calendar, label: "28 de agosto" },
    { icon: Clock, label: "09h – 12h" },
    { icon: MapPin, label: "Blackpot Floripa" },
  ]

  return (
    <div className="bg-[#000000] flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="relative flex flex-col items-center gap-12 px-4 py-14 overflow-clip">
          {/* ornament arcs */}
          <div
            className="pointer-events-none absolute size-[1400px] -z-10"
            style={{
              top: "calc(50% + 520px)",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundImage: `url('${withBasePath("/figma/convite-confirmado/353ce4c7ab73b5367a4a59e3dbe1251231916b72.svg")}')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
              opacity: 0.45,
            }}
          />

          {/* Brand */}
          <div className="flex items-center gap-4">
            <div className="font-['@butler/Regular',_serif] text-white text-[24px] md:text-[28px] uppercase tracking-[2px]">
              <p className="leading-none">Brunch</p>
            </div>
            <div className="h-9 w-[1px] bg-gradient-to-b from-white/10 via-white/70 to-white/10" />
            <div className="font-['Work_Sans:Regular',_sans-serif] text-[14px] md:text-[16px] tracking-[4px] text-white/60">
              <p className="leading-none">EXPERIENCE</p>
            </div>
          </div>

          {/* Títulos */}
          <div className="flex max-w-[860px] flex-col items-center gap-5 text-center">
            <h1 className="font-['@butler/Medium',_serif] text-white text-[32px] md:text-[44px] leading-tight">
              Pré-seleção
            </h1>
            <p className="font-['Work_Sans:SemiBold',_sans-serif] text-[18px] md:text-[20px] text-white max-w-[760px] leading-snug">
              Estamos finalizando as presenças do Brunch VIP. Algumas confirmações adicionais serão liberadas por seleção.
            </p>
            <p className="font-['Work_Sans:Regular',_sans-serif] text-[14px] md:text-[15px] text-white/60 max-w-[720px] mt-2 leading-relaxed">
              Quer participar? Apresente-se agora. Leva menos de 1 minuto. Nossa curadoria é contínua e as confirmações extras são limitadas.
            </p>

            <div className="mt-1 flex flex-wrap items-center justify-center gap-6 opacity-70">
              {EVENT_DETAILS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-white">
                  <Icon className="h-5 w-5" />
                  <span className="font-['Work_Sans:Regular',_sans-serif] text-[14px] md:text-[16px] leading-[1.2]">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card de pré-seleção */}
          <div className="w-full max-w-[920px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 md:p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset]">
            <h2 className="text-center text-white font-['Work_Sans:SemiBold',_sans-serif] text-[18px] md:text-[20px] mb-6">
              Envie seus dados para entrar na pré-seleção
            </h2>
            <WaitlistForm />
          </div>

          {/* Seções curtas */}
          <div className="w-full max-w-[920px] px-2 md:px-0">
            <div className="mt-8 grid grid-cols-1 gap-6 text-white/90">
              <div>
                <h3 className="font-['Work_Sans:SemiBold',_sans-serif] text-[16px] md:text-[18px] mb-2">Como funciona</h3>
                <p className="font-['Work_Sans:Regular',_sans-serif] text-[14px] md:text-[15px]">Nossa equipe valida as últimas presenças ao longo do dia. Se o seu perfil se encaixar nesta edição, confirmaremos por e-mail e WhatsApp.</p>
              </div>
              <div>
                <h3 className="font-['Work_Sans:SemiBold',_sans-serif] text-[16px] md:text-[18px] mb-2">Tempo & exclusividade</h3>
                <p className="font-['Work_Sans:Regular',_sans-serif] text-[14px] md:text-[15px]">As confirmações adicionais são raras e saem rápido — envie sua apresentação agora.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}


