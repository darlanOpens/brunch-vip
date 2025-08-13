"use client";
import { useState } from "react";
import Image from 'next/image';
import { withBasePath } from '@/utils/basePath';
import { Button } from "@/components/ui/button";
import { addUTMToFormData } from "@/lib/utm";
import { getApiUrl } from "@/lib/url";
import { savePreSelecaoEmail, savePreSelecaoWebhookUrl } from "@/lib/client-storage";

// Para next/image, use caminhos absolutos do public sem basePath;
// o Next adiciona o basePath automaticamente.
const imgImage1 = "brunch-vip/assets/5cff422875440c9add4bdb28e9892cc5b0241fd1.png";
const imgCalendarToday = "brunch-vip/assets/798ebcfe4e7d2570319351ba482e4f0733320dbd.svg";
const imgSchedule = "brunch-vip/assets/f75f5a0a5737e0b27a8464f9b1d9b8fb5dd23477.svg";
const imgLocationOn = "brunch-vip/assets/7c340c2e8d8da36c55235e6326ca7a5f012d6328.svg";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  /**
   * Função para lidar com o submit do formulário de convite
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null);
    
    try {
      const payload = addUTMToFormData({
        email: email.trim(),
        form_title: "Brunch VIP",
        form_id: "Brunch VIP CTA",
      })
      const response = await fetch(getApiUrl('/api/lead'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      
      const data = await response.json()
      
      // Debug logs
      const debugEnabled = process.env.NEXT_PUBLIC_DEBUG_WEBHOOKS === 'true'
      if (debugEnabled) {
        console.log('[CTA] Resposta da API lead:', JSON.stringify(data, null, 2))
      }
      
      if (response.ok && data.success && data.redirectUrl) {
        try {
          if (data?.webhook_url && typeof data.webhook_url === 'string') {
            if (debugEnabled) {
              console.log('[CTA] Salvando webhook_url:', data.webhook_url)
            }
            savePreSelecaoWebhookUrl(data.webhook_url)
          }
          if (typeof data.redirectUrl === 'string' && data.redirectUrl.includes('/pre-selecao')) {
            if (debugEnabled) {
              console.log('[CTA] Salvando e-mail para pré-seleção:', email.trim())
            }
            savePreSelecaoEmail(email.trim())
          }
        } catch (err) {
          if (debugEnabled) {
            console.error('[CTA] Erro ao salvar dados:', err)
          }
        }
        window.location.href = data.redirectUrl
      } else if (response.ok && data?.ok) {
        setMessage('Convite confirmado! Verifique seu e-mail.');
        setEmail('')
        setIsSubmitted(true);
      } else {
        setMessage(data?.error || 'Falha ao confirmar convite.');
      }
    } catch (error) {
      console.error('Erro:', error)
      setMessage('Erro de rede. Tente novamente.');
    } finally {
      setLoading(false)
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
      
      {/* Formulário de inscrição */}
      <div className="w-full px-5 sm:px-6 md:px-0 flex justify-center relative z-20">
        <div className="hero-form w-full max-w-[538px] mx-auto">
           {!isSubmitted ? (
            <form 
              id="invite-cta" 
              onSubmit={handleSubmit} 
              className="relative flex flex-col sm:flex-row sm:items-center w-full bg-white/5 backdrop-blur-md border border-white/25 rounded-lg sm:rounded-full p-2 sm:p-1 sm:pl-4 sm:pr-1 gap-2 sm:gap-0 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset]"
            >
              <input
                id="invite-email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="Email de acesso"
                className="flex-1 h-20 md:h-14 bg-transparent text-white placeholder-white/70 focus:outline-none border-none rounded-lg sm:rounded-full px-4 md:px-5 text-base md:text-lg text-center sm:text-left"
                aria-label="Email de acesso"
              />
              <Button
                type="submit"
                disabled={loading}
                size="lg"
                className="text-white text-sm md:text-base px-5 md:px-6 h-10 md:h-14 w-full sm:w-auto whitespace-nowrap rounded-lg sm:rounded-full bg-gradient-to-r from-[#fb1b1f] to-[#5b00b6] hover:from-[#e0181c] hover:to-[#4d0099] disabled:opacity-50 border-0 shadow-[0_0_0_1px_rgba(255,255,255,0.12)_inset]"
              >
                {loading ? 'Enviando...' : 'Prosseguir para confirmação'}
              </Button>
            </form>
          ) : (
            <div className="bg-green-500/20 backdrop-blur-md border border-green-400/30 rounded-lg p-4 text-center">
              <p className="text-green-300 font-semibold">✅ Convite confirmado com sucesso!</p>
              <p className="text-green-200 text-sm mt-1">Você receberá mais informações em breve.</p>
            </div>
          )}
          
          {!isSubmitted && (
            <>
              {message && (
                <p className="mt-3 text-center text-sm text-white/80">{message}</p>
              )}
              <small className="opacity-80 block mt-2 text-center text-white/80">VIP • vagas limitadas</small>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
