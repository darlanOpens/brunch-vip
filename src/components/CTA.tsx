"use client";
import { useState } from "react";
import Image from 'next/image';
const imgImage1 = "/assets/5cff422875440c9add4bdb28e9892cc5b0241fd1.png";
const imgCalendarToday = "/assets/798ebcfe4e7d2570319351ba482e4f0733320dbd.svg";
const imgSchedule = "/assets/f75f5a0a5737e0b27a8464f9b1d9b8fb5dd23477.svg";
const imgLocationOn = "/assets/7c340c2e8d8da36c55235e6326ca7a5f012d6328.svg";

export default function CTA() {
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
    <div className="box-border content-stretch flex flex-col gap-10 md:gap-14 h-[520px] md:h-[584px] items-center justify-center overflow-clip p-0 relative shrink-0 w-full">
      <div className="absolute contents left-0 top-0">
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url('${imgImage1}')` }}
        />
        <div className="absolute bg-[rgba(0,0,0,0.5)] inset-0" />
        <div className="absolute bg-gradient-to-b bottom-[54.8%] from-[#000000] left-0 right-0 to-[#00000000] top-0" />
        <div className="absolute bg-gradient-to-b bottom-0 from-[#00000000] h-[184px] left-0 right-0 to-[#000000]" />
        <div className="absolute bg-[#000000] inset-0 mix-blend-soft-light opacity-50" />
      </div>
      
      <div className="box-border content-stretch flex flex-col gap-4 md:gap-6 items-center justify-start p-0 relative shrink-0 px-4">
        <div className="flex flex-col font-['@butler/Regular',_serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[36px] md:text-[56px] text-center w-full md:w-[1084px]">
          <p className="block leading-none">Seu convite te espera!</p>
        </div>
        
        <div className="box-border content-stretch flex flex-row flex-wrap gap-4 md:gap-6 items-center justify-center md:justify-start p-0 relative shrink-0 text-sm md:text-[16px]">
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
      </div>
      
      <form id="invite-cta" onSubmit={handleSubmit} className="backdrop-blur-[6px] backdrop-filter bg-[#ffffff] box-border content-stretch flex flex-row items-center justify-start overflow-clip p-[4px] relative rounded-[1000px] shrink-0 w-full max-w-[700px] px-2">
        <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
          <div className="basis-0 box-border content-stretch flex flex-row gap-1 grow h-full items-center justify-center min-h-px min-w-px overflow-clip px-6 py-0 relative shrink-0">
            <input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="Email do convite pessoal"
              className="basis-0 grow bg-transparent text-black placeholder-black/70 outline-none text-[16px]"
              aria-label="Email do convite pessoal"
            />
          </div>
        </div>
        <button type="submit" disabled={loading} className="bg-gradient-to-r from-[#fb1b1f] to-[#5b00b6] box-border content-stretch flex flex-row gap-1 h-12 items-center justify-center px-6 py-0 relative rounded-[1000px] shrink-0 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer active:scale-95 transition-transform">
          <span className="css-s9x6m5 flex flex-col font-['Work_Sans:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#ffffff] text-[16px] text-center text-nowrap">
            {loading ? 'Enviando...' : 'Confirmar Convite'}
          </span>
        </button>
      </form>
      {message && (
        <p className="mt-2 text-center text-sm text-white/80">{message}</p>
      )}
    </div>
  )
}
