import Image from 'next/image';

const imgGroup4 = "brunch-vip/assets/0341e9c0a86b3f98698956e4119f5e265ee2f292.svg";
const img = "brunch-vip/assets/fdf89fc0856d3e738f2d3f5a857c22b4d935bd45.svg";
const img1 = "brunch-vip/assets/76ed304f0976a302915119c90c5d41da1b55c6f0.svg";
const img3 = "brunch-vip/assets/bb74eafa9b664cdd188d0cda32c1fbe869ed5b1c.svg";
const imgIndaia = "/brunch-vip/apoiadores/indaia.svg";
const imgXplan = "/brunch-vip/apoiadores/Xplan.svg";
const imgBeeWell = "/brunch-vip/apoiadores/BeeWell.svg";
const imgEconomiaSc = "/brunch-vip/apoiadores/Economia%20Sc.svg";
const imgGrupoLeonora = "/brunch-vip/apoiadores/Grupo%20Leonora.svg";
const imgOracle = "/brunch-vip/apoiadores/Oracle.svg";

export default function Sponsors() {
  return (
    <div className="box-border content-stretch flex flex-col gap-12 md:gap-20 items-center justify-start p-8 md:p-[108px] relative shrink-0 w-full">
      <div className="flex flex-col font-['@butler/Light',_serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[36px] md:text-[56px] text-center text-nowrap tracking-[-1.68px]">
        <p className="adjustLetterSpacing block leading-none whitespace-pre">Nossos patrocinadores</p>
      </div>
      
      <div className="box-border grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 grid-rows-2 h-auto md:h-[215px] max-w-[1224px] p-0 relative shrink-0 w-full">
        {/* First row */}
        <div className="box-border content-stretch flex flex-col gap-1 h-[108px] items-center justify-center px-6 py-10 relative shrink-0">
          <div aria-hidden="true" className="absolute border border-[#343434] border-solid inset-[-0.5px] pointer-events-none" />
          <div className="relative shrink-0 h-[32px] w-[120px]">
            <Image alt="Indaia" className="block max-w-none size-full object-contain" src={imgIndaia} width={120} height={32} />
          </div>
        </div>
        
        <div className="box-border content-stretch flex flex-col gap-1 h-[108px] items-center justify-center px-6 py-10 relative shrink-0">
          <div aria-hidden="true" className="absolute border border-[#343434] border-solid inset-[-0.5px] pointer-events-none" />
          <div className="relative shrink-0 h-[32px] w-[140px]">
            <Image alt="Xplan" className="block max-w-none size-full object-contain" src={imgXplan} width={140} height={32} />
          </div>
        </div>
        
        <div className="box-border content-stretch flex flex-col gap-1 h-[108px] items-center justify-center px-6 py-10 relative shrink-0">
          <div aria-hidden="true" className="absolute border border-[#343434] border-solid inset-[-0.5px] pointer-events-none" />
          <div className="relative shrink-0 h-[32px] w-[120px]">
            <Image alt="BeeWell" className="block max-w-none size-full object-contain" src={imgBeeWell} width={120} height={32} />
          </div>
        </div>
        
        <div className="box-border content-stretch flex flex-col gap-1 h-[108px] items-center justify-center px-6 py-10 relative shrink-0">
          <div aria-hidden="true" className="absolute border border-[#343434] border-solid inset-[-0.5px] pointer-events-none" />
          <div className="relative shrink-0 h-[32px] w-[140px]">
            <Image alt="Economia SC" className="block max-w-none size-full object-contain" src={imgEconomiaSc} width={140} height={32} />
          </div>
        </div>
        
        <div className="box-border content-stretch flex flex-col gap-1 h-[108px] items-center justify-center px-6 py-10 relative shrink-0">
          <div aria-hidden="true" className="absolute border border-[#343434] border-solid inset-[-0.5px] pointer-events-none" />
          <div className="relative shrink-0 h-[32px] w-[140px]">
            <Image alt="Grupo Leonora" className="block max-w-none size-full object-contain" src={imgGrupoLeonora} width={140} height={32} />
          </div>
        </div>
        
        <div className="box-border content-stretch flex flex-col gap-1 h-[108px] items-center justify-center px-6 py-10 relative shrink-0">
          <div aria-hidden="true" className="absolute border border-[#343434] border-solid inset-[-0.5px] pointer-events-none" />
          <div className="relative shrink-0 h-[32px] w-[120px]">
            <Image alt="Oracle" className="block max-w-none size-full object-contain" src={imgOracle} width={120} height={32} />
          </div>
        </div>
      </div>
    </div>
  )
}
