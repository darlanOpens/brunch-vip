"use client";
import { useEffect, useState } from "react";
import Image from 'next/image';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { addUTMToFormData } from "@/lib/utm";
import { getApiUrl } from "@/lib/url";
import { ArrowDown, Calendar, Clock, MapPin } from "lucide-react";
import { useSearchParams } from "next/navigation";
// Imagens decorativas removidas do topo do hero
const imgGroup4 = "brunch-vip/assets/0341e9c0a86b3f98698956e4119f5e265ee2f292.svg";
const img = "brunch-vip/assets/fdf89fc0856d3e738f2d3f5a857c22b4d935bd45.svg";
const img1 = "brunch-vip/assets/76ed304f0976a302915119c90c5d41da1b55c6f0.svg";
const img2 = "brunch-vip/assets/d3b14860ba16eee325b22ce7722dd4e5343c6dcc.svg";

/**
 * Componente Hero da landing page
 * Implementa o cabeçalho principal com animações e CTA
 */
export default function Hero() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEmailFromUrl, setIsEmailFromUrl] = useState(false);
  const searchParams = useSearchParams();

  /**
   * Função para scroll suave até o formulário
   */
  const scrollToForm = () => {
    const formElement = document.getElementById('inscricao-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const emailFromUrl = searchParams.get('emailconf');
    if (emailFromUrl) {
      setEmail(emailFromUrl);
      setIsEmailFromUrl(true);
    }
  }, [searchParams]);

  async function submitLead() {
    setLoading(true);
    setMessage(null);
    try {
      const payload = addUTMToFormData({
        email: email.trim(),
        form_title: "Brunch VIP",
        form_id: "Brunch VIP Hero",
      });
      const response = await fetch(getApiUrl('/api/lead'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok && data.success && data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else if (response.ok && data?.ok) {
        setMessage('Convite confirmado! Verifique seu e-mail.');
        setEmail('');
        setIsSubmitted(true);
      } else {
        setMessage(data?.error || 'Falha ao confirmar convite.');
      }
    } catch (error) {
      console.error('Erro:', error);
      setMessage('Erro de rede. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitLead();
  }

  return (
    <section className="hero-section bg-[#000000] bg-hero bg-cover bg-center bg-no-repeat h-[620px] md:h-[811px] overflow-clip relative shrink-0 w-full">
      
      {/* Mantém o gradient original */}
      <div className="absolute bg-gradient-to-b from-[#00000000] from-[23.424%] h-[273.212px] left-0 to-[#000000] to-[85.477%] bottom-0 md:top-[537.79px] w-full" />
      
      {/* Conteúdo principal */}
      <div className="hero-content relative z-10 max-w-7xl mx-auto pt-6 md:pt-14 px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-center justify-center w-full px-4 sm:px-6 md:px-16 lg:px-[108px]">
          
          {/* Conteúdo centralizado */}
          <div className="text-center flex flex-col items-center max-w-[90vw] sm:max-w-[80vw] md:max-w-[938px] w-full">
            
            {/* Logo/Branding - com SEO adequado */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="w-full mb-6 md:mb-10"
            >
              <div className="box-border content-stretch flex flex-row gap-2 md:gap-4 items-center justify-center p-0 relative shrink-0">
                <div
                  className="bg-clip-text flex flex-col font-['@butler/Regular',_serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[20px] md:text-[32px] text-center text-nowrap tracking-[2px] md:tracking-[3.2px] uppercase"
                  style={{
                    WebkitTextFillColor: "transparent",
                    backgroundImage: "linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%), linear-gradient(163.392deg, rgb(255, 255, 255) 28.461%, rgba(255, 255, 255, 0) 115.99%)",
                  }}
                >
                  <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">Brunch</p>
                </div>
                <div className="relative shrink-0 mx-2 md:mx-4 h-10 md:h-12 w-[1px]">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/70 to-white/10" />
                </div>
                <div
                  className="flex flex-col font-['Work_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[12px] md:text-[20px] text-center text-nowrap tracking-[3px] md:tracking-[6px] text-gray-300"
                >
                  <p className="adjustLetterSpacing block leading-none whitespace-pre">EXPERIENCE</p>
                </div>
              </div>
            </motion.div>
            
            {/* Informações do evento - com ícones lucide */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8 md:mb-[51px]"
            >
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 opacity-70 text-sm md:text-[16px] text-white">
                <div className="flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-white" />
                  <span className="font-['Work_Sans:Regular',_sans-serif] font-normal leading-[1.2]">28 de agosto</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-6 w-6 text-white" />
                  <span className="font-['Work_Sans:Regular',_sans-serif] font-normal leading-[1.2]">09h – 12h</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-white" />
                  <span className="font-['Work_Sans:Regular',_sans-serif] font-normal leading-[1.2]">Blackpot Floripa</span>
                </div>
              </div>
            </motion.div>
            
            {/* Título principal - H1 para SEO */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hero-title font-['@butler/Light',_serif] text-[#ffffff] text-[40px] md:text-[84.011px] text-center tracking-[-2.5203px] leading-none mb-6 md:mb-8 max-w-[817px]"
            >
              <span className="adjustLetterSpacing block">O Futuro Agora da Experiência do Cliente</span>
            </motion.h1>
            
            {/* Descrição */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hero-subtitle font-['Work_Sans:Regular',_sans-serif] font-normal text-[#ffffff] text-base md:text-[20px] text-center leading-[1.3] mb-8 md:mb-10 max-w-[34ch] sm:max-w-[46ch] md:max-w-none"
            >
              Um encontro exclusivo para líderes durante o Startup Summit 2025.
            </motion.p>
            
            {/* Formulário de inscrição */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hero-form w-full max-w-[538px] mx-auto"
            >
              {!isSubmitted ? (
                isEmailFromUrl ? (
                  <div className="relative w-full bg-white/5 backdrop-blur-md border border-white/25 rounded-lg p-4 text-center">
                    <p className="text-white mb-3">Identificamos seu e-mail como <span className="font-semibold break-all">{email}</span></p>
                    <Button
                      type="button"
                      onClick={submitLead}
                      disabled={loading}
                      size="lg"
                      className="text-white text-sm md:text-base px-5 md:px-6 h-10 md:h-14 w-full sm:w-auto whitespace-nowrap rounded-lg sm:rounded-full bg-gradient-to-r from-[#fb1b1f] to-[#5b00b6] hover:from-[#e0181c] hover:to-[#4d0099] disabled:opacity-50 border-0 shadow-[0_0_0_1px_rgba(255,255,255,0.12)_inset]"
                    >
                      {loading ? 'Confirmando...' : 'Confirmar Presença'}
                    </Button>
                  </div>
                ) : (
                  <form 
                    id="invite-hero" 
                    onSubmit={handleSubmit} 
                    className="relative flex flex-col sm:flex-row sm:items-center w-full bg-white/5 backdrop-blur-md border border-white/25 rounded-lg sm:rounded-full p-2 sm:p-1 sm:pl-4 sm:pr-1 gap-2 sm:gap-0 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset]"
                  >
                    <input
                      id="email-hero"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      required
                      placeholder="Email do convite pessoal"
                      className="flex-1 h-20 md:h-14 bg-transparent text-white placeholder-white/70 focus:outline-none border-none rounded-lg sm:rounded-full px-4 md:px-5 text-base md:text-lg text-center sm:text-left"
                      aria-label="Email do convite pessoal"
                    />
                    <Button
                      type="submit"
                      disabled={loading}
                      size="lg"
                      className="text-white text-sm md:text-base px-5 md:px-6 h-10 md:h-14 w-full sm:w-auto whitespace-nowrap rounded-lg sm:rounded-full bg-gradient-to-r from-[#fb1b1f] to-[#5b00b6] hover:from-[#e0181c] hover:to-[#4d0099] disabled:opacity-50 border-0 shadow-[0_0_0_1px_rgba(255,255,255,0.12)_inset]"
                    >
                      {loading ? 'Enviando...' : 'Confirmar Convite'}
                    </Button>
                  </form>
                )
              ) : (
                <div className="bg-green-500/20 backdrop-blur-md border border-green-400/30 rounded-lg p-4 text-center">
                  <p className="text-green-300 font-semibold">✅ Convite confirmado com sucesso!</p>
                  <p className="text-green-200 text-sm mt-1">Você receberá mais informações em breve.</p>
                </div>
              )}
              
              {message && !isSubmitted && (
                <p className="mt-3 text-center text-sm text-white/80">{message}</p>
              )}
            </motion.div>
            
            {/* Logos dos sponsors */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 md:mt-12"
            >
              <div className="flex flex-row gap-[20.04px] items-center justify-center opacity-50">
                <div className="flex flex-col font-['Work_Sans:Regular',_sans-serif] font-normal justify-center text-[#ffffff] text-[12px] text-center">
                  <p className="leading-[1.2]">Apresentado por:</p>
                </div>
                <div className="h-8 w-[48.934px]">
                  <Image alt="Logo sponsor 1" className="block max-w-none size-full" src={imgGroup4} width={49} height={32} />
                </div>
                <div className="h-[24.291px] w-[86.876px] relative">
                  <div className="absolute bottom-0 left-0 right-[72.04%] top-0">
                    <div className="absolute inset-0">
                      <Image alt="Logo sponsor 2" className="block max-w-none size-full" src={img} width={24} height={24} />
                    </div>
                    <div className="absolute bottom-1/4 left-[25.27%] right-[25.26%] top-1/4">
                      <Image alt="Logo sponsor 2 overlay" className="block max-w-none size-full" src={img1} width={12} height={12} />
                    </div>
                  </div>
                  <div className="absolute bottom-[25.2%] left-[34.95%] right-0 top-[24.8%]">
                    <Image alt="Logo sponsor 3" className="block max-w-none size-full" src={img2} width={57} height={12} />
                  </div>
                </div>
              </div>
            </motion.div>
          
          </div>


        </div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/80 cursor-pointer"
          onClick={scrollToForm}
        >
          <ArrowDown className="h-6 w-6" />
        </motion.div>
      </motion.div>
    </section>
  )
}

