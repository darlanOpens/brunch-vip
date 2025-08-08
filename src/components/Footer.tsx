import Image from 'next/image';


const imgGroup4 = "brunch-vip/assets/0341e9c0a86b3f98698956e4119f5e265ee2f292.svg";
const img = "brunch-vip/assets/fdf89fc0856d3e738f2d3f5a857c22b4d935bd45.svg";
const img1 = "brunch-vip/assets/76ed304f0976a302915119c90c5d41da1b55c6f0.svg";
const img3 = "brunch-vip/assets/bb74eafa9b664cdd188d0cda32c1fbe869ed5b1c.svg";

export default function Footer() {
  return (
    <div className="box-border content-stretch flex flex-col gap-12 md:gap-20 items-center justify-start p-8 md:p-[108px] relative shrink-0 w-full">
      <div className="box-border content-stretch flex flex-row gap-4 md:gap-[20.04px] items-center justify-start p-0 relative shrink-0">
        <div className="flex flex-col font-['Work_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] opacity-50 relative shrink-0 text-[#ffffff] text-[12px] text-center text-nowrap">
          <p className="block leading-[1.2] whitespace-pre">Organizado por:</p>
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
            <Image alt="" className="block max-w-none size-full" src={img3} width={40} height={30} />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col font-['@butler/Regular',_serif] justify-center leading-[0] relative shrink-0 text-[12px] md:text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap">
        <p className="block leading-[18px] md:leading-[20px] whitespace-pre">© 2025 - Todos os direitos reservados.</p>
      </div>
    </div>
  )
}
