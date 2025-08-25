import { NextResponse } from "next/server";

/**
 * Endpoint JSON estruturado para crawlers e IA's
 * Fornece dados do evento em formato JSON padronizado
 */
export async function GET() {
  const eventData = {
    name: "Brunch Experience - O Futuro Agora da Experiência do Cliente",
    shortName: "Brunch VIP",
    description: "Um encontro exclusivo para líderes durante o Startup Summit 2025.",
    type: "business-event",
    category: "networking",
    startDate: "2025-08-28T09:00:00-03:00",
    endDate: "2025-08-28T12:00:00-03:00",
    timezone: "America/Sao_Paulo",
    location: {
      name: "Blackpot Floripa",
      address: "Florianópolis, Santa Catarina, Brasil",
      city: "Florianópolis",
      state: "Santa Catarina",
      country: "Brasil",
      countryCode: "BR",
      mapUrl: "https://maps.google.com/?q=Blackpot+Floripa"
    },
    organizer: {
      name: "Opens",
      website: "https://go.opens.com.br"
    },
    website: "https://go.opens.com.br/brunch-vip",
    registrationUrl: "https://go.opens.com.br/brunch-vip",
    eventStatus: "scheduled",
    attendanceMode: "offline",
    capacity: "limited",
    admissionType: "invitation-only",
    language: "pt-BR",
    speakers: [
      {
        name: "David Ledson",
        title: "Ex-sócio de Sympla, iFood, Sólides | Fundador GarantiaBR",
        role: "speaker"
      },
      {
        name: "Bento Meirelles",
        title: "Founder da Minimal",
        role: "speaker"
      },
      {
        name: "Marcela Zaidem",
        title: "Fundadora CNP | Ex-G4 Educação",
        role: "speaker"
      },
      {
        name: "Leonardo Superti",
        title: "CEO da CustomerX",
        role: "speaker"
      },
      {
        name: "Aline Simões",
        title: "Especialista em Marketing Digital",
        role: "speaker"
      },
      {
        name: "Douglas Conrad",
        title: "Empreendedor e Investidor",
        role: "speaker"
      },
      {
        name: "João Paulo",
        title: "CSO da Nextar",
        role: "speaker"
      },
      {
        name: "Dionara Conrad",
        title: "CEO Opens e mestre de cerimônia",
        role: "host"
      },
      {
        name: "Guilherme Ferreira",
        title: "CEO da Atomsix",
        role: "speaker"
      }
    ],
    topics: [
      "Experiência do Cliente",
      "Inovação e Tecnologia",
      "Networking de Alto Nível",
      "Estratégias de Negócio",
      "Empreendedorismo"
    ],
    targetAudience: [
      "Empreendedores",
      "Líderes empresariais",
      "Investidores",
      "Executivos",
      "Profissionais de tecnologia"
    ],
    sponsors: [
      { name: "Oracle", type: "main" },
      { name: "BeeWell", type: "supporter" },
      { name: "Grupo Leonora", type: "supporter" },
      { name: "Xplan", type: "supporter" },
      { name: "Indaiá", type: "supporter" },
      { name: "Economia SC", type: "supporter" }
    ],
    features: [
      "VIP experience",
      "Limited seats",
      "Invitation only",
      "Premium networking",
      "Exclusive content"
    ],
    socialMedia: {
      hashtags: ["#BrunchVIP", "#StartupSummit2025", "#ExperienciaDoCliente"]
    },
    metadata: {
      lastUpdated: new Date().toISOString(),
      version: "1.0",
      source: "brunch-vip-landing-page"
    }
  };

  return NextResponse.json(eventData, {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Content-Type": "application/json; charset=utf-8"
    }
  });
}