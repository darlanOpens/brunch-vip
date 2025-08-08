"use client";
import Image from 'next/image';

const imgLocalActivity = "/assets/c4c40af9a9b91935e00b23b6c06a93d15b3b1fdd.svg";
const imgHub = "/assets/cc7b515256823b54905f0014d74e636ca9ea214d.svg";
const imgCrown = "/assets/877c386dac6d7422019852336925d1b9edecd41f.svg";
const imgHandshake = "/assets/c672ab47c4985de7b4bac75f3786c7444820510d.svg";
const imgGroup8 = "/assets/c10d718abf23d99900e055028a514f91f4f6135a.svg";
const imgEllipse2 = "/assets/3dc0c2b29857b87837261866f66f49358e4d4578.svg";
const imgEllipse3 = "/assets/1887efad79848f83829bb980c00b0f1a7c952208.svg";

export default function Features() {
  const handleScrollToForm = () => {
    // Primeira tentativa: por ID
    let heroForm = document.getElementById('invite-hero');
    
    // Segunda tentativa: por seletor
    if (!heroForm) {
      heroForm = document.querySelector('form[id="invite-hero"]');
    }
    
    // Terceira tentativa: formulário no Hero
    if (!heroForm) {
      heroForm = document.querySelector('form');
    }
    
    if (heroForm) {
      heroForm.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
      
      // Foca no campo de email após o scroll
      setTimeout(() => {
        const emailInput = heroForm!.querySelector('input[type="email"]') as HTMLInputElement;
        if (emailInput) {
          emailInput.focus();
        }
      }, 1000);
    } else {
      // Fallback: scroll para o topo da página
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  return (
    <div className="box-border content-stretch flex flex-col gap-12 md:gap-[83px] items-center justify-start overflow-clip pb-10 md:pb-[61px] pt-12 md:pt-[73px] px-4 md:px-[108px] relative shrink-0 w-full">
      <div className="box-border content-stretch flex flex-col gap-5 md:gap-[30px] items-center justify-start leading-[0] max-w-[1224px] p-0 relative shrink-0 text-[#ffffff] text-center w-full">
        <div className="flex flex-col font-['Work_Sans:Regular',_sans-serif] font-normal justify-center opacity-50 relative shrink-0 text-[20px] text-nowrap tracking-[10px] uppercase">
          <p className="adjustLetterSpacing block leading-[1.2] whitespace-pre">Exclusivo</p>
        </div>
        <div className="flex flex-col font-['@butler/Light',_serif] justify-center not-italic relative shrink-0 text-[36px] md:text-[56px] tracking-[-1.68px] w-full md:w-[932px] px-2">
          <p className="adjustLetterSpacing block leading-none">
            Mais que networking — uma experiência curada para conexões humanas.
          </p>
        </div>
      </div>
      
      <div className="box-border content-stretch flex flex-col items-start justify-start max-w-[1224px] p-0 relative shrink-0 w-full">
        <div className="box-border content-stretch grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-0 md:flex md:flex-row h-auto md:h-[246px] items-stretch justify-start p-0 relative shrink-0 w-full">
          <div className="basis-0 box-border content-stretch flex flex-col grow h-full items-start justify-between min-h-px min-w-px p-[24px] relative shrink-0">
            <div aria-hidden="true" className="absolute border border-[#343434] border-solid inset-[-0.5px] pointer-events-none" />
            <div className="relative rounded-xl shrink-0 size-12">
              <div className="absolute left-3 size-6 top-3">
                <Image alt="" className="block max-w-none size-full" src={imgLocalActivity} width={24} height={24} />
              </div>
            </div>
            <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start leading-[0] p-0 relative shrink-0 text-[#ffffff] text-left w-full">
              <div className="css-b9h0bn flex flex-col font-['@butler/Medium',_serif] h-7 justify-center not-italic relative shrink-0 text-[20px] w-full">
                <p className="block leading-[28px]">Apenas por Convite</p>
              </div>
              <div className="flex flex-col font-['Work_Sans:Regular',_sans-serif] font-normal justify-center opacity-50 relative shrink-0 text-[16px] w-full">
                <p className="block leading-[1.2]">Acesso restrito a empreendedores e líderes selecionados.</p>
              </div>
            </div>
          </div>
          
          <div className="basis-0 box-border content-stretch flex flex-col gap-[49px] grow h-full items-start justify-start min-h-px min-w-px p-[24px] relative shrink-0">
            <div aria-hidden="true" className="absolute border border-[#343434] border-solid inset-[-0.5px] pointer-events-none" />
            <div className="relative rounded-xl shrink-0 size-12">
              <div className="absolute left-3 size-6 top-3">
                <Image alt="" className="block max-w-none size-full" src={imgHub} width={24} height={24} />
              </div>
            </div>
            <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start leading-[0] p-0 relative shrink-0 text-[#ffffff] text-left w-full">
              <div className="css-b9h0bn flex flex-col font-['@butler/Medium',_serif] h-7 justify-center not-italic relative shrink-0 text-[20px] w-full">
                <p className="block leading-[28px]">Networking de Alto Nível</p>
              </div>
              <div className="flex flex-col font-['Work_Sans:Regular',_sans-serif] font-normal justify-center opacity-50 relative shrink-0 text-[16px] w-full">
                <p className="block leading-[1.2]">Conexões estratégicas com quem realmente importa.</p>
              </div>
            </div>
          </div>
          
          <div className="basis-0 box-border content-stretch flex flex-col gap-[49px] grow h-full items-start justify-start min-h-px min-w-px p-[24px] relative shrink-0">
            <div aria-hidden="true" className="absolute border border-[#343434] border-solid inset-[-0.5px] pointer-events-none" />
            <div className="relative rounded-xl shrink-0 size-12">
              <div className="absolute left-3 size-6 top-3">
                <Image alt="" className="block max-w-none size-full" src={imgCrown} width={24} height={24} />
              </div>
            </div>
            <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start leading-[0] p-0 relative shrink-0 text-[#ffffff] text-left w-full">
              <div className="css-b9h0bn flex flex-col font-['@butler/Medium',_serif] h-7 justify-center not-italic relative shrink-0 text-[20px] w-full">
                <p className="block leading-[28px]">Experiência Premium</p>
              </div>
              <div className="flex flex-col font-['Work_Sans:Regular',_sans-serif] font-normal justify-center opacity-50 relative shrink-0 text-[16px] w-full">
                <p className="block leading-[1.2]">Ambiente exclusivo no melhor restaurante de Floripa.</p>
              </div>
            </div>
          </div>
          
          <div className="basis-0 box-border content-stretch flex flex-col grow h-full items-start justify-between min-h-px min-w-px p-[24px] relative shrink-0">
            <div aria-hidden="true" className="absolute border border-[#343434] border-solid inset-[-0.5px] pointer-events-none" />
            <div className="relative rounded-xl shrink-0 size-12">
              <div className="absolute left-3 size-6 top-3">
                <Image alt="" className="block max-w-none size-full" src={imgHandshake} width={24} height={24} />
              </div>
            </div>
            <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start leading-[0] p-0 relative shrink-0 text-[#ffffff] text-left w-full">
              <div className="css-b9h0bn flex flex-col font-['@butler/Medium',_serif] h-7 justify-center not-italic relative shrink-0 text-[20px] w-full">
                <p className="block leading-[28px]">Conteúdo Exclusivo</p>
              </div>
              <div className="flex flex-col font-['Work_Sans:Regular',_sans-serif] font-normal justify-center leading-[1.2] opacity-50 relative shrink-0 text-[16px] w-full">
                <p className="block mb-0">Insights e estratégias</p>
                <p className="block">compartilhadas apenas entre nós.</p>
              </div>
            </div>
          </div>
        </div>
        
      <div className="relative shrink-0 w-full">
          <div className="box-border content-stretch flex flex-col md:flex-row gap-8 md:gap-14 items-start md:items-center justify-start overflow-clip p-6 md:p-[56px] relative w-full">
            <div className="absolute size-[799px] top-1/2 translate-x-[-50%] translate-y-[-50%]" style={{ left: "calc(50% + 301.5px)" }}>
              <Image alt="" className="block max-w-none size-full" src={imgGroup8} width={799} height={799} />
            </div>
            <div className="box-border content-stretch flex flex-col gap-6 items-start justify-start p-0 relative shrink-0">
              <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start leading-[0] p-0 relative shrink-0 text-[#ffffff] text-left w-full md:w-[546px]">
                <div className="css-b9h0bn flex flex-col font-['@butler/Regular',_serif] justify-center not-italic relative shrink-0 text-[32px] w-full">
                  <p className="block leading-[1.2]">Seu convite está esperando</p>
                </div>
                <div className="flex flex-col font-['Work_Sans:Regular',_sans-serif] font-normal h-[41px] justify-center opacity-70 relative shrink-0 text-[16px] w-full">
                  <p className="block leading-[1.2]">
                    Este não é um evento para todos. É para quem está pronto para elevar o nível das suas conexões e do seu negócio.
                  </p>
                </div>
              </div>
              <div className="bg-[rgba(255,255,255,0.1)] box-border content-stretch flex flex-row gap-2 items-center justify-start px-4 py-2 relative shrink-0">
                <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
                <div className="css-b9h0bn flex flex-col font-['@butler/Regular',_serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-center text-nowrap">
                  <p className="block leading-[24px] whitespace-pre">Vagas limitadas</p>
                </div>
                <div className="relative shrink-0 size-1">
                  <Image alt="" className="block max-w-none size-full" src={imgEllipse2} width={4} height={4} />
                </div>
                <div className="css-b9h0bn flex flex-col font-['@butler/Regular',_serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-center text-nowrap">
                  <p className="block leading-[24px] whitespace-pre">Apenas convidados</p>
                </div>
              </div>
            </div>
            <div className="basis-0 box-border content-stretch flex flex-row gap-1 grow items-center justify-center min-h-px min-w-px p-0 relative shrink-0">
              <button 
                type="button"
                onClick={handleScrollToForm}
                className="bg-gradient-to-r from-[#fb1b1f] to-[#5b00b6] box-border content-stretch flex flex-row gap-1 h-12 items-center justify-center px-6 py-0 relative rounded-[1000px] shrink-0 cursor-pointer hover:opacity-90 transition-opacity duration-200 z-10"
                style={{ pointerEvents: 'auto' }}
              >
                <span className="css-s9x6m5 flex flex-col font-['Work_Sans:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#ffffff] text-[16px] text-center text-nowrap pointer-events-none">
                  <span className="block leading-[24px] whitespace-pre">Confirmar Convite</span>
                </span>
              </button>
            </div>
            <div className="absolute left-[715px] size-[970.885px] top-14">
              <div className="absolute inset-[-61.799%]">
                <Image alt="" className="block max-w-none size-full" src={imgEllipse3} width={971} height={971} />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#343434] border-solid inset-[-0.5px] pointer-events-none" />
        </div>
      </div>
    </div>
  )
}
