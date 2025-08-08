import fs from "fs";
import path from "path";

interface SpeakerData {
  id: string;
  name: string;
  subtitle?: string;
  image: string;
}

function toTitleCase(text: string): string {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getSpeakersFromPublic(): SpeakerData[] {
  const participantsDir = path.join(process.cwd(), "public", "Participantes");
  let files: string[] = [];
  try {
    files = fs.readdirSync(participantsDir);
  } catch {
    return [];
  }

  const nameOverrides: Record<string, string> = {
    aline_simoes: "Aline Simões",
    bento_meirelles: "Bento Meirelles",
    marcela_zaidem: "Marcela Zaidem",
    leonardo_superti: "Leonardo Superti",
    veridiana_santos: "Veridiana Santos",
    dionara_conrad: "Dionara Conrad",
    joao_paulo: "João Paulo",
  };

  const subtitles: Record<string, string> = {
    david_ledson:
      "Ex-sócio de Sympla, iFood, Sólides | Fundador GarantiaBR",
    bento_meirelles: "Founder da Minimal",
    marcela_zaidem: "Fundadora CNP | Ex-G4 Educação",
    leonardo_superti: "CEO da CustomerX",
    aline_simoes: "Especialista em Marketing Digital",
    douglas_conrad: "Empreendedor e Investidor",
    joao_paulo: "Tech Leader e Inovador",
    veridiana_santos: "Consultora em Experiência do Cliente",
    dionara_conrad: "CEO Opens e mestre de cerimônia",
    // mantém o que já existia para quem não foi especificado
    guilherme_ferreira: "CEO da Atomsix",
  };

  return files
    .filter((f) => /\.(png|jpg|jpeg|webp|avif|gif|svg)$/i.test(f))
    .map((file) => {
      const base = file.replace(/\.[^/.]+$/, "");
      const name = nameOverrides[base] || toTitleCase(base.replace(/_/g, " "));
      const subtitle = subtitles[base as keyof typeof subtitles];
      return {
        id: base,
        name,
        subtitle,
        image: `brunch-vip/Participantes/${file}`,
      } satisfies SpeakerData;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

const speakers: SpeakerData[] = getSpeakersFromPublic();

// Ordem preferida (3 colunas x N linhas)
const preferredOrder: string[] = [
  "david_ledson",
  "bento_meirelles",
  "douglas_conrad",
  "guilherme_ferreira",
  "marcela_zaidem",
  "dionara_conrad",
  "joao_paulo",
  "aline_simoes",
  "leonardo_superti",
];
const orderedSpeakers: SpeakerData[] = [
  ...preferredOrder
    .map((id) => speakers.find((s) => s.id === id))
    .filter((s): s is SpeakerData => Boolean(s)),
  ...speakers.filter((s) => !preferredOrder.includes(s.id)),
].filter((s) => s.id !== "veridiana_santos");

function SpeakerCard({ speaker }: { speaker: SpeakerData }) {
  return (
    <div className="relative bg-[rgba(255,255,255,0.05)] overflow-clip rounded-[8px] w-full aspect-[3/4]">
      <img
        src={speaker.image}
        alt={speaker.name}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center top" }}
        loading="lazy"
      />
      <div className="absolute left-0 right-0 bottom-0 bg-gradient-to-b from-[#00000000] to-[#000000] opacity-70 h-[40%]" />
      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 md:bottom-6 flex flex-col gap-2 items-center text-center text-[#ffffff] w-[80%]">
        <div className="font-['@butler/Regular',_serif] text-[18.889px] leading-none">
          <p className="leading-none">{speaker.name}</p>
        </div>
        {speaker.subtitle ? (
          <div className="font-['Helvetica_Neue:Regular',_sans-serif] text-[12.593px] leading-snug opacity-70">
            <p className="leading-snug">{speaker.subtitle}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function Speakers() {
  return (
    <div className="relative w-full py-16 mb-24">
      <div className="flex flex-col font-['@butler/Light',_serif] justify-center text-[#ffffff] text-[36px] md:text-[56px] text-center tracking-[-1.68px] w-full px-4 max-w-3xl mx-auto">
        <p className="adjustLetterSpacing leading-none">
          Você estará acompanhado dos melhores do mercado
        </p>
      </div>

      <div className="mt-12 w-full px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {orderedSpeakers.map((spk) => (
            <SpeakerCard key={spk.id} speaker={spk} />
          ))}
        </div>
        <h3 className="max-w-6xl mx-auto mt-8 text-center text-white font-['@butler/Regular',_serif] text-2xl md:text-3xl tracking-[-0.02em]">
          E muito mais...
        </h3>
      </div>
    </div>
  )
}
