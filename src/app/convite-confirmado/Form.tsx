"use client"
import React, { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { addUTMToFormData } from "@/lib/utm"

type BusinessChannel = "chat" | "email" | "phone" | "social" | "app"

// Opções alinhadas ao snippet de referência
const COMPANY_SIZES = [
  "Entre 1 e 10 funcionários",
  "Entre 11 e 50 funcionários",
  "Entre 51 e 100 funcionários",
  "Entre 101 e 500 funcionários",
  "Entre 501 e 1000 funcionários",
  "Mais de 1000 funcionários",
]

const SECTORS = [
  "Tecnologia e Software",
  "Finanças e Bancos",
  "Saúde e Bem-Estar",
  "Varejo e E-commerce",
  "Educação e Treinamento",
  "Logística e Transporte",
  "Imobiliário e Construção",
  "Indústria e Manufatura",
  "Serviços Profissionais (Consultoria, Jurídico, Contabilidade)",
  "Mídia e Entretenimento",
  "Hotelaria e Turismo",
  "Energia e Utilidades",
  "Agronegócio e Alimentação",
  "Telecomunicações",
  "Outros",
]

const REVENUE_RANGES = [
  "Até R$500 mil",
  "Entre R$500 mil e R$5 milhões",
  "Entre R$5 milhões e R$20 milhões",
  "Entre R$20 milhões e R$50 milhões",
  "Acima de R$50 milhões",
]

const BUSINESS_MODELS = [
  "B2B (Business to Business)",
  "B2C (Business to Consumer)",
  "B2B e B2C (Atende ambos)",
  "B2G (Business to Government)",
]

export default function Form() {
  const [fullName, setFullName] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [companySize, setCompanySize] = useState<string>("")
  const [sector, setSector] = useState<string>("")
  const [products, setProducts] = useState("")
  const [hasCXArea, setHasCXArea] = useState<"Sim" | "Não" | "">("Sim")
  const [teamSize, setTeamSize] = useState("")
  const [channels, setChannels] = useState<Record<BusinessChannel, boolean>>({
    chat: false,
    email: false,
    phone: false,
    social: false,
    app: false,
  })
  const [challenges, setChallenges] = useState("")
  const [revenueRange, setRevenueRange] = useState<string>("")
  const [businessModel, setBusinessModel] = useState<string>("")
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const selectedChannels = useMemo(
    () =>
      Object.entries(channels)
        .filter(([, v]) => v)
        .map(([k]) => k as BusinessChannel),
    [channels],
  )

  const toggleChannel = (key: BusinessChannel) =>
    setChannels((prev) => ({ ...prev, [key]: !prev[key] }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const payload = addUTMToFormData({
        nomeCompleto: fullName,
        linkedin,
        tamanhoEmpresa: companySize,
        setorAtuacao: sector,
        principaisProdutos: products,
        areaExperiencia: hasCXArea,
        quantasPessoas: teamSize,
        canaisAtendimento: selectedChannels.map((c) =>
          c === "chat"
            ? "Chat Online"
            : c === "email"
            ? "E-mail"
            : c === "phone"
            ? "Telefone"
            : c === "social"
            ? "Redes Sociais"
            : "Aplicativo próprio",
        ),
        desafios: challenges,
        faturamento: revenueRange,
        modeloNegocio: businessModel,
      })
      // Fire-and-forget para o webhook de convite confirmado
      fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: '', form_title: 'Convite Confirmado - Detalhes', form_id: 'convite-confirmado-extra' }),
      }).catch(() => {})

      // Também envia payload completo para auditoria (se configurado)
      const auditUrl = process.env.NEXT_PUBLIC_AUDIT_URL
      if (auditUrl) {
        fetch(auditUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).catch(() => {})
      }

      setSubmitted(true)
      setShowSuccess(true)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-[640px]">
        {showSuccess && (
          <div className="mb-4 rounded-lg border border-emerald-500/30 bg-emerald-500/15 p-4 text-center text-emerald-200">
            ✅ Obrigado! Recebemos suas informações. Em breve nosso time poderá entrar em contato com próximos passos do evento.
          </div>
        )}
      </div>
    )
  }

  const fieldWrapper =
    "relative w-full h-14 md:h-16 rounded-full overflow-hidden border border-white/10 bg-white/5 backdrop-blur-lg shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] transition-colors duration-200 focus-within:border-white/20"
  const inputBase =
    "h-full w-full rounded-full bg-transparent px-6 pr-10 text-white placeholder-white/70 outline-none"
  const selectBase =
    "h-full w-full appearance-none rounded-full bg-transparent px-6 pr-10 text-white outline-none"

  return (
    <form onSubmit={handleSubmit} className="mx-auto grid max-w-[640px] grid-cols-1 gap-3 md:gap-4">
      {/* Nome */}
      <div className={fieldWrapper}>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Como você gostaria de ser chamado(a)?"
          className={inputBase}
          required
          aria-label="Nome completo"
        />
      </div>

      {/* Linkedin */}
      <div className={fieldWrapper}>
        <input
          type="url"
          inputMode="url"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          placeholder="Qual seu LinkedIn? (URL)"
          className={inputBase}
          aria-label="URL do LinkedIn"
        />
      </div>

      {/* Tamanho da Empresa */}
      <div className={fieldWrapper}>
        <select
          value={companySize}
          onChange={(e) => setCompanySize(e.target.value)}
          className={selectBase}
          aria-label="Tamanho da Empresa"
        >
          <option value="" className="text-black">Tamanho da Empresa</option>
          {COMPANY_SIZES.map((opt) => (
            <option key={opt} value={opt} className="text-black">
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/70" />
      </div>

      {/* Setor de Atuação */}
      <div className={fieldWrapper}>
        <select
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          className={selectBase}
          aria-label="Setor de Atuação"
        >
          <option value="" className="text-black">Setor de Atuação</option>
          {SECTORS.map((opt) => (
            <option key={opt} value={opt} className="text-black">
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/70" />
      </div>

      {/* Produtos/Serviços */}
      <div className={fieldWrapper}>
        <input
          type="text"
          value={products}
          onChange={(e) => setProducts(e.target.value)}
          placeholder="Principais produtos/serviços"
          className={inputBase}
          aria-label="Principais produtos/serviços"
        />
      </div>

      {/* Área dedicada para Experiência do Cliente (CX) */}
      <div className="mt-2 flex flex-col gap-2 text-white">
        <p className="text-sm opacity-90">Empresa possui uma área dedicada para Experiência do Cliente (CX)?</p>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="hasCX"
              value="Sim"
              checked={hasCXArea === "Sim"}
              onChange={() => setHasCXArea("Sim")}
              className="h-5 w-5 accent-white"
            />
            <span>Sim</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="hasCX"
              value="Não"
              checked={hasCXArea === "Não"}
              onChange={() => setHasCXArea("Não")}
              className="h-5 w-5 accent-white"
            />
            <span>Não</span>
          </label>
        </div>
      </div>

      {/* Tamanho do time */}
      <div className={fieldWrapper}>
        <input
          type="text"
          inputMode="numeric"
          value={teamSize}
          onChange={(e) => setTeamSize(e.target.value)}
          placeholder="Quantas pessoas compõem a equipe de atendimento?"
          className={inputBase}
          aria-label="Tamanho do time de atendimento"
        />
      </div>

      {/* Canais de atendimento */}
      <div className="mt-2 flex flex-col gap-2 text-white">
        <p className="text-sm opacity-90">Quais são os principais canais de atendimento ao cliente na sua empresa?</p>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="h-5 w-5 accent-white" checked={channels.chat} onChange={() => toggleChannel("chat")} />
            <span>Chat online</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="h-5 w-5 accent-white" checked={channels.email} onChange={() => toggleChannel("email")} />
            <span>E-mail</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="h-5 w-5 accent-white" checked={channels.phone} onChange={() => toggleChannel("phone")} />
            <span>Telefone</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="h-5 w-5 accent-white" checked={channels.social} onChange={() => toggleChannel("social")} />
            <span>Redes Sociais</span>
          </label>
          <label className="flex items-center gap-2 md:col-span-2">
            <input type="checkbox" className="h-5 w-5 accent-white" checked={channels.app} onChange={() => toggleChannel("app")} />
            <span>Aplicativo próprio</span>
          </label>
        </div>
      </div>

      {/* Desafios em CX */}
      <div className={fieldWrapper}>
        <input
          type="text"
          value={challenges}
          onChange={(e) => setChallenges(e.target.value)}
          placeholder="Quais são os principais desafios que a empresa enfrenta em CX?"
          className={inputBase}
          aria-label="Desafios em CX"
        />
      </div>

      {/* Faturamento anual */}
      <div className={fieldWrapper}>
        <select
          value={revenueRange}
          onChange={(e) => setRevenueRange(e.target.value)}
          className={selectBase}
          aria-label="Faixa de faturamento anual"
        >
          <option value="" className="text-black">Qual é a faixa de faturamento anual da empresa?</option>
          {REVENUE_RANGES.map((opt) => (
            <option key={opt} value={opt} className="text-black">
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/70" />
      </div>

      {/* Modelo de negócio */}
      <div className={fieldWrapper}>
        <select
          value={businessModel}
          onChange={(e) => setBusinessModel(e.target.value)}
          className={selectBase}
          aria-label="Modelo de negócio"
        >
          <option value="" className="text-black">O modelo de negócio da sua empresa é principalmente voltado para</option>
          {BUSINESS_MODELS.map((opt) => (
            <option key={opt} value={opt} className="text-black">
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/70" />
      </div>

      <div className="mt-2">
        <Button
          type="submit"
          disabled={submitting}
          className="h-12 md:h-14 w-full rounded-full bg-gradient-to-r from-[#fb1b1f] to-[#5b00b6] text-white hover:from-[#e0181c] hover:to-[#4d0099]"
        >
          {submitting ? "Enviando..." : "Enviar"}
        </Button>
      </div>
    </form>
  )
}


