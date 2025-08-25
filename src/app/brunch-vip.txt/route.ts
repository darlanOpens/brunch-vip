import { NextResponse } from "next/server";

/**
 * Endpoint de fallback em texto puro para crawlers e IA's
 * Fornece informações estruturadas do evento em formato legível
 */
export async function GET() {
  const body = [
    "Evento: Brunch Experience - O Futuro Agora da Experiência do Cliente",
    "Tipo: Evento VIP exclusivo para líderes",
    "Data: 28 de agosto de 2025",
    "Horário: 09h – 12h",
    "Local: Blackpot Floripa",
    "Endereço: Florianópolis, Santa Catarina, Brasil",
    "Mapa: https://maps.google.com/?q=Blackpot+Floripa",
    "",
    "Descrição: Um encontro exclusivo para líderes durante o Startup Summit 2025.",
    "Características: VIP, vagas limitadas, apenas por convite",
    "Público-alvo: Empreendedores, líderes, investidores",
    "",
    "Palestrantes confirmados:",
    "- David Ledson: Ex-sócio de Sympla, iFood, Sólides | Fundador GarantiaBR",
    "- Bento Meirelles: Founder da Minimal",
    "- Marcela Zaidem: Fundadora CNP | Ex-G4 Educação",
    "- Leonardo Superti: CEO da CustomerX",
    "- Aline Simões: Especialista em Marketing Digital",
    "- Douglas Conrad: Empreendedor e Investidor",
    "- João Paulo: CSO da Nextar",
    "- Dionara Conrad: CEO Opens e mestre de cerimônia",
    "- Guilherme Ferreira: CEO da Atomsix",
    "",
    "Organizado por: Opens",
    "Website: https://go.opens.com.br/brunch-vip",
    "Confirmação: Apenas por convite pessoal",
    "Status: Vagas limitadas",
    "",
    "Temas abordados:",
    "- Experiência do Cliente",
    "- Inovação e Tecnologia",
    "- Networking de Alto Nível",
    "- Estratégias de Negócio",
    "- Empreendedorismo",
    "",
    "Patrocinadores:",
    "- Oracle",
    "- BeeWell",
    "- Grupo Leonora",
    "- Xplan",
    "- Indaiá",
    "- Economia SC"
  ].join("\n");
  
  return new NextResponse(body, { 
    headers: { 
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}