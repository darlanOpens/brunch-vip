"use client"
import { useEffect } from "react"
import confetti from "canvas-confetti"

export default function ConfettiOnMount() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const colors = [
        "#ffffff", // branco
        "#f1f5f9", // slate-50
        "#e5e7eb", // gray-200
        "#cbd5e1", // slate-300
        "#94a3b8", // slate-400
        "#64748b", // slate-500
      ]

      // Burst único, mais intenso e com queda mais lenta (menos altura)
      confetti({
        particleCount: 220,
        spread: 75,
        startVelocity: 38, // sobe menos
        decay: 0.96, // desacelera de forma mais suave
        gravity: 0.45, // queda mais lenta
        ticks: 320, // permanece mais tempo em tela
        origin: { y: 0.6 },
        colors,
      })
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return null
}


