"use client";
import { useState } from "react";
import Image from 'next/image';
// Imagens decorativas removidas do topo do hero
const imgVector7 = "/assets/186afd778d8566810f9778056c62e1450c92fc6f.svg";
const imgCalendarToday = "/assets/798ebcfe4e7d2570319351ba482e4f0733320dbd.svg";
const imgSchedule = "/assets/f75f5a0a5737e0b27a8464f9b1d9b8fb5dd23477.svg";
const imgLocationOn = "/assets/7c340c2e8d8da36c55235e6326ca7a5f012d6328.svg";
const imgGroup4 = "/assets/0341e9c0a86b3f98698956e4119f5e265ee2f292.svg";
const img = "/assets/fdf89fc0856d3e738f2d3f5a857c22b4d935bd45.svg";
const img1 = "/assets/76ed304f0976a302915119c90c5d41da1b55c6f0.svg";
const img2 = "/assets/d3b14860ba16eee325b22ce7722dd4e5343c6dcc.svg";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    const trimmed = email.trim();
    if (!trimmed) {
      setMessage("Informe um e-mail válido.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        setMessage(data?.error || 'Falha ao confirmar convite.');
      } else {
        setMessage('Convite confirmado! Verifique seu e-mail.');
        setEmail("");
      }
    } catch (e) {
      setMessage('Erro de rede. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#000000] bg-hero bg-cover bg-center bg-no-repeat h-[620px] md:h-[811px] overflow-clip relative shrink-0 w-full">
      
      <div className="absolute bg-gradient-to-b from-[#00000000] from-[23.424%] h-[273.212px] left-0 to-[#000000] to-[85.477%] bottom-0 md:top-[537.79px] w-full" />
      
      <div className="absolute box-border content-stretch flex flex-col gap-6 md:gap-10 items-center justify-center left-4 right-4 top-6 md:left-[108px] md:right-[108px] md:top-14 p-0">
        <div className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0">
          <div
            className="bg-clip-text flex flex-col font-['@butler/Regular',_serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[32px] text-center text-nowrap tracking-[3.2px] uppercase"
            style={{
              WebkitTextFillColor: "transparent",
              backgroundImage: "linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%), linear-gradient(163.392deg, rgb(255, 255, 255) 28.461%, rgba(255, 255, 255, 0) 115.99%)",
            }}
          >
            <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">Brunch</p>
          </div>
          <div className="h-9 relative shrink-0 w-0">
            <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
              <Image alt="" className="block max-w-none size-full" src={imgVector7} width={1} height={36} />
            </div>
          </div>
          <div
            className="flex flex-col font-['Work_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[20px] text-center text-nowrap tracking-[6px] text-gray-300"
          >
            <p className="adjustLetterSpacing block leading-none whitespace-pre">EXPERIENCE</p>
          </div>
        </div>
      </div>
      
      <div className="absolute box-border content-stretch flex flex-col gap-8 md:gap-[51px] items-center justify-center left-1/2 max-w-[938px] w-full p-0 top-28 md:top-[157px] translate-x-[-50%] px-4">
        <div className="box-border content-stretch flex flex-row flex-wrap gap-4 md:gap-6 items-center justify-center md:justify-start opacity-70 p-0 relative shrink-0 text-sm md:text-[16px]">
          <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0">
            <div className="relative shrink-0 size-6">
              <Image alt="" className="block max-w-none size-full" src={imgCalendarToday} width={24} height={24} />
            </div>
            <div className="css-s9x6m5 flex flex-col font-['Work_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
              <p className="block leading-[1.2] whitespace-pre">28 de agosto</p>
            </div>
          </div>
          <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0">
            <div className="relative shrink-0 size-6">
              <Image alt="" className="block max-w-none size-full" src={imgSchedule} width={24} height={24} />
            </div>
            <div className="css-s9x6m5 flex flex-col font-['Work_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
              <p className="block leading-[1.2] whitespace-pre">09h – 12h</p>
            </div>
          </div>
          <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0">
            <div className="relative shrink-0 size-6">
              <Image alt="" className="block max-w-none size-full" src={imgLocationOn} width={24} height={24} />
            </div>
            <div className="css-s9x6m5 flex flex-col font-['Work_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
              <p className="block leading-[1.2] whitespace-pre">Blackpot Floripa</p>
            </div>
          </div>
        </div>
        
        <div className="css-advv0k flex flex-col font-['@butler/Light',_serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[40px] md:text-[84.011px] text-center tracking-[-2.5203px] w-full md:w-[817.999px]">
          <p className="adjustLetterSpacing block leading-none">O Futuro Agora da Experiência do Cliente</p>
        </div>
        
        <div className="css-s9x6m5 flex flex-col font-['Work_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#ffffff] text-base md:text-[20px] text-center">
          <p className="block leading-[1.2] whitespace-pre">Um encontro exclusivo para líderes durante o Startup Summit 2025.</p>
        </div>
        
        <form id="invite-hero" onSubmit={handleSubmit} className="backdrop-blur-[6px] backdrop-filter relative rounded-[1000px] shrink-0 w-full max-w-[538px]">
          <div className="box-border content-stretch flex flex-row items-center justify-start overflow-clip p-[4px] relative w-full">
            <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
              <div className="basis-0 box-border content-stretch flex flex-row gap-1 grow h-full items-center justify-center min-h-px min-w-px overflow-clip px-6 py-0 relative shrink-0">
                <input
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="Email do convite pessoal"
                  className="basis-0 grow bg-transparent text-white placeholder-white/70 outline-none text-[16px]"
                  aria-label="Email do convite pessoal"
                />
              </div>
            </div>
            <button type="submit" disabled={loading} className="bg-gradient-to-r from-[#fb1b1f] to-[#5b00b6] box-border content-stretch flex flex-row gap-1 h-12 items-center justify-center px-6 py-0 relative rounded-[1000px] shrink-0 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer transition-transform duration-150 active:scale-95">
              <span className="css-s9x6m5 flex flex-col font-['Work_Sans:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#ffffff] text-[16px] text-center text-nowrap select-none">
                {loading ? 'Enviando...' : 'Confirmar Convite'}
              </span>
            </button>
          </div>
          <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[1000px]" />
          {message && (
            <p className="mt-2 text-center text-sm text-white/80">{message}</p>
          )}
        </form>
        
        <div className="box-border content-stretch flex flex-row gap-[20.04px] items-center justify-start p-0 relative shrink-0">
          <div className="flex flex-col font-['Work_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] opacity-50 relative shrink-0 text-[#ffffff] text-[12px] text-center text-nowrap">
            <p className="block leading-[1.2] whitespace-pre">Apresentado por:</p>
          </div>
          <div className="h-8 relative shrink-0 w-[48.934px]">
            <Image alt="" className="block max-w-none size-full" src={imgGroup4} width={49} height={32} />
          </div>
          <div className="h-[24.291px] relative shrink-0 w-[86.876px]">
            <div className="absolute bottom-0 left-0 right-[72.04%] top-0">
              <div className="absolute inset-0">
                <Image alt="" className="block max-w-none size-full" src={img} width={24} height={24} />
              </div>
              <div className="absolute bottom-1/4 left-[25.27%] right-[25.26%] top-1/4">
                <Image alt="" className="block max-w-none size-full" src={img1} width={12} height={12} />
              </div>
            </div>
            <div className="absolute bottom-[25.2%] left-[34.95%] right-0 top-[24.8%]">
              <Image alt="" className="block max-w-none size-full" src={img2} width={57} height={12} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

