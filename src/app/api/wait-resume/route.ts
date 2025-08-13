import { NextRequest, NextResponse } from 'next/server'

function isAllowedResumeUrl(resumeUrl: string): boolean {
	const csv = process.env.N8N_RESUME_ALLOWED_PREFIXES || ''
	const prefixes = csv.split(',').map((s) => s.trim()).filter(Boolean)
	if (prefixes.length === 0) return false
	return prefixes.some((prefix) => resumeUrl.startsWith(prefix))
}

export async function POST(request: NextRequest) {
	try {
		const { resumeUrl, payload } = await request.json()
		if (!resumeUrl || typeof resumeUrl !== 'string') {
			return NextResponse.json({ ok: false, message: 'resumeUrl ausente' }, { status: 400 })
		}
		if (!isAllowedResumeUrl(resumeUrl)) {
			return NextResponse.json({ ok: false, message: 'Destino não permitido' }, { status: 403 })
		}

		const response = await fetch(resumeUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload ?? {}),
			// Timeout para evitar pendurar o server
			signal: AbortSignal.timeout(20_000),
		})

		let data: unknown = null
		try {
			data = await response.json()
		} catch {
			data = await response.text().catch(() => null)
		}

		return NextResponse.json({ ok: response.ok, status: response.status, data }, { status: 200 })
	} catch (e) {
		return NextResponse.json({ ok: false, message: 'Requisição inválida' }, { status: 400 })
	}
}


