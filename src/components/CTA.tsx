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
      <div className="absolute contents left-0 top-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url('${imgImage1}')` }}
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)]" />
        <div className="absolute left-0 right-0 top-0 bottom-[54.8%] bg-gradient-to-b from-[#000000] to-[#00000000]" />
        <div className="absolute left-0 right-0 bottom-0 h-[184px] bg-gradient-to-b from-[#00000000] to-[#000000]" />
        <div className="absolute inset-0 bg-[#000000] mix-blend-soft-light opacity-50" />
      </div>
      
      <div className="box-border content-stretch flex flex-col gap-4 md:gap-6 items-center justify-start p-0 relative z-10 shrink-0 px-4">
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
      
      <div className="w-full px-5 sm:px-6 md:px-0 flex justify-center relative z-20">
      <form id="invite-cta" onSubmit={handleSubmit} className="w-full max-w-[560px] flex flex-col md:flex-row items-stretch gap-3">
        <div className="flex-1">
          <label htmlFor="invite-email" className="sr-only">Email do convite pessoal</label>
          <div className="bg-white/95 rounded-full shadow-md px-5 py-3 flex items-center focus-within:ring-2 focus-within:ring-white/50">
            <input
              id="invite-email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="Email do convite pessoal"
              className="w-full bg-transparent text-black placeholder-black/60 outline-none text-[16px]"
              aria-label="Email do convite pessoal"
              autoComplete="email"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="rounded-full h-[52px] px-8 w-full md:w-auto bg-gradient-to-r from-[#fb1b1f] to-[#5b00b6] text-white font-semibold shadow-md hover:shadow-lg hover:from-[#e61619] hover:to-[#5200a3] active:scale-[0.98] transition-all"
        >
          {loading ? 'Enviando...' : 'Confirmar Convite'}
        </button>
      </form>
      </div>
      {message && (
        <div className="mt-3 mx-4">
          <p className={`text-center text-sm px-4 py-2 rounded-lg backdrop-blur-sm ${
            message.includes('confirmado') || message.includes('Convite confirmado') 
              ? 'text-green-300 bg-green-900/20 border border-green-700/30' 
              : 'text-red-300 bg-red-900/20 border border-red-700/30'
          }`}>
            {message}
          </p>
        </div>
      )}
    </div>
  )
}
