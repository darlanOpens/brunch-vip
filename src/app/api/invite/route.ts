export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({} as any));
    const email: string | undefined = body?.email?.toString();

    if (!email) {
      return new Response(JSON.stringify({ ok: false, error: 'E-mail é obrigatório.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ ok: false, error: 'E-mail inválido.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Simula persistência (poderia integrar com serviço externo ou DB)
    console.log('[invite] Novo e-mail recebido:', email);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ ok: false, error: 'Erro interno.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


