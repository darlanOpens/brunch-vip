import type { Metadata } from "next"
import { Calendar, Clock, MapPin } from "lucide-react"
import Footer from "@/components/Footer"
import { withBasePath } from "@/utils/basePath"
import Form from "./Form"
import ConfettiOnMount from "./ConfettiOnMount"

export const metadata: Metadata = {
  title: "Convite confirmado • Brunch Experience",
  description:
    "Página de confirmação do Brunch Experience. Complete seus dados para garantir sua presença.",
}

const EVENT_DETAILS = [
  { icon: Calendar, label: "28 de agosto" },
  { icon: Clock, label: "09h – 12h" },
  { icon: MapPin, label: "Blackpot Floripa" },
]

export default function ConviteConfirmadoPage() {
  return (
    <div className="bg-[#000000] flex min-h-screen flex-col">
      <ConfettiOnMount />
      <main className="flex-1">
        <section className="relative flex flex-col items-center gap-16 px-4 py-14 overflow-clip">
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
              opacity: 0.6,
            }}
          />
          <div className="flex items-center gap-4">
            <div className="font-['@butler/Regular',_serif] text-white text-[24px] md:text-[28px] uppercase tracking-[2px]">
              <p className="leading-none">Brunch</p>
            </div>
            <div className="h-9 w-[1px] bg-gradient-to-b from-white/10 via-white/70 to-white/10" />
            <div className="font-['Work_Sans:Regular',_sans-serif] text-[14px] md:text-[16px] tracking-[4px] text-white/60">
              <p className="leading-none">EXPERIENCE</p>
            </div>
          </div>

          <div className="flex max-w-[828px] flex-col items-center gap-6 text-center">
            <p className="font-['Work_Sans:Regular',_sans-serif] text-[16px] md:text-[18px] uppercase tracking-[7.2px] text-white/50">
              Parabéns
            </p>
            <h1 className="font-['@butler/Medium',_serif] text-[32px] leading-[1.05] tracking-[-1.68px] text-white md:text-[48px]">
              Você está entre os convidados exclusivos para o Brunch VIP Startup Summit
            </h1>
            <p className="font-['Work_Sans:Regular',_sans-serif] text-[16px] leading-[1.35] text-white md:text-[18px]">
              Para garantir sua vaga, só falta um último passo: confirme sua presença preenchendo o formulário abaixo.
              Estamos animados para ter você conosco em uma experiência incrível de aprendizado e networking!
            </p>

            <div className="mt-1 flex flex-wrap items-center justify-center gap-6 opacity-70">
              {EVENT_DETAILS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-white">
                  <Icon className="h-6 w-6" />
                  <span className="font-['Work_Sans:Regular',_sans-serif] text-[14px] md:text-[16px] leading-[1.2]">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full max-w-[1224px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 md:p-20 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset]">
            <p className="mb-8 text-center font-['Work_Sans:Bold',_sans-serif] text-[18px] font-semibold tracking-[-0.72px] text-white md:text-[20px]">
              Preencha suas informações e nos vemos em breve!
            </p>

            <Form />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}


