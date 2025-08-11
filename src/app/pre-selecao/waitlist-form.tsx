"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { addUTMToFormData } from "@/lib/utm"
import { GTM_EVENTS, pushToDataLayer } from "@/lib/gtm"

export default function WaitlistForm() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [telefone, setTelefone] = useState("")
  const [empresa, setEmpresa] = useState("")
  const [cargo, setCargo] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  function ensureUrlScheme(value: string): string {
    if (!value) return value
    const trimmed = value.trim()
    if (/^https?:\/\//i.test(trimmed) || /^\/\//.test(trimmed)) return trimmed
    return `https://${trimmed}`
  }

  function validate(): boolean {
    const nextErrors: Record<string, string> = {}
    if (!nome || nome.trim().length < 2) {
      nextErrors.nome = 'Informe seu nome completo.'
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      nextErrors.email = 'Informe um e-mail válido.'
    }
    if (telefone && !/^\+?[0-9()\s-]{7,}$/.test(telefone.trim())) {
      nextErrors.telefone = 'Informe um telefone válido (apenas números, +, -, espaço, parênteses).'
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const fieldWrapper =
    "relative w-full h-14 md:h-16 rounded-full overflow-hidden border border-white/10 bg-white/5 backdrop-blur-lg shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] focus-within:border-white/20 transition-colors"
  const inputBase =
    "h-full w-full rounded-full bg-transparent px-6 text-white placeholder-white/70 outline-none"

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      if (!validate()) {
        setSubmitting(false)
        return
      }
      const payload = addUTMToFormData({
        nomeCompleto: nome,
        email,
        telefone,
        empresa,
        cargo,
        origem: "waitlist-pre-selecao",
      })
      // Dispara webhook fire-and-forget para waitlist
      fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {})

      // GTM: evento de envio com identificação do formulário
      pushToDataLayer(GTM_EVENTS.WAITLIST_SUBMIT, {
        formName: 'pre-selecao_waitlist',
        status: 'submitted',
      })

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
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/15 p-4 text-center text-emerald-200">
            ✅ Recebemos sua inscrição! Nossa equipe vai avaliar e, se aprovado, você receberá sua confirmação em breve.
          </div>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto grid max-w-[720px] grid-cols-1 gap-3 md:gap-4">
      <div className={fieldWrapper}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome Completo"
          className={inputBase}
          required
        />
        {errors.nome && (
          <small className="absolute -bottom-5 left-4 text-red-400">{errors.nome}</small>
        )}
      </div>
      <div className={fieldWrapper}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className={inputBase}
          required
        />
        {errors.email && (
          <small className="absolute -bottom-5 left-4 text-red-400">{errors.email}</small>
        )}
      </div>
      <div className={fieldWrapper}>
        <input
          type="tel"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          placeholder="Telefone"
          className={inputBase}
        />
        {errors.telefone && (
          <small className="absolute -bottom-5 left-4 text-red-400">{errors.telefone}</small>
        )}
      </div>
      <div className={fieldWrapper}>
        <input
          type="text"
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
          placeholder="Empresa"
          className={inputBase}
        />
      </div>
      <div className={fieldWrapper}>
        <input
          type="text"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          placeholder="Cargo"
          className={inputBase}
        />
      </div>
      <div className="mt-1">
        <Button
          type="submit"
          disabled={submitting}
          className="h-12 md:h-14 w-full rounded-full bg-gradient-to-r from-[#fb1b1f] to-[#5b00b6] text-white hover:from-[#e0181c] hover:to-[#4d0099]"
        >
          {submitting ? "Enviando..." : "Entrar na pré-seleção"}
        </Button>
      </div>
      <p className="text-center text-white/70 text-sm mt-2">Fique atento! Se aprovado, você receberá um contato do nosso time!</p>
      <p className="text-center text-white/60 text-xs mt-1">Seus dados são usados apenas para a avaliação de presença.</p>
    </form>
  )
}



