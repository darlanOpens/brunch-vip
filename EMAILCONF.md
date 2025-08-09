## Detecção do parâmetro `emailconf` na URL e o “modo Confirmar Presença”

Este documento explica, de forma objetiva para um(a) dev júnior, como a página identifica o parâmetro `emailconf` na URL e altera a interface para exibir apenas um botão de “Confirmar Presença”, sem campo de digitar e‑mail.

### Objetivo do recurso
- **Agilizar a confirmação**: quando o convidado acessa com `?emailconf=<email>`, a página já reconhece o e‑mail e mostra apenas o botão de confirmação.

### Onde está no código
- Arquivo principal: `app/page.tsx`
- Hooks e estados envolvidos: `useSearchParams`, `useEffect`, `email`, `isEmailFromUrl`, `isLoading`

### Como a detecção funciona
Na montagem do componente, buscamos o parâmetro `emailconf` nos query params. Se existir, salvamos no estado e ativamos um “modo rápido” (sem input):

```tsx
useEffect(() => {
  const emailFromUrl = searchParams.get('emailconf')
  if (emailFromUrl) {
    setEmail(emailFromUrl)
    setIsEmailFromUrl(true)
  }
}, [searchParams])
```

### Renderização condicional (input vs. confirmação)
Quando `isEmailFromUrl` é verdadeiro, exibimos uma mensagem com o e‑mail detectado e um botão único de confirmação. Caso contrário, mostramos o campo para digitar e o botão.

```tsx
<div className="mt-10 space-y-4 w-full max-w-sm md:max-w-md">
  {isEmailFromUrl ? (
    <div className="text-center bg-background/50 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-primary/30">
      <p className="font-sans text-base md:text-lg text-text-high mb-4 break-words">
        Olá, identificamos seu email como <strong className="text-primary break-all">{email}</strong>
      </p>
      <Button size="lg" onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 md:h-6 md:w-6 animate-spin" /> : "Confirmar Presença"}
      </Button>
    </div>
  ) : (
    <>
      <Input
        type="email"
        placeholder="Digite seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />
      <Button size="lg" onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 md:h-6 md:w-6 animate-spin" /> : "Confirme sua Presença"}
      </Button>
    </>
  )}
}</div>
```

### Envio e redirecionamento
O clique no botão chama `handleSubmit`, que envia os dados ao webhook e redireciona conforme a resposta. Em caso de erro ou e‑mail não encontrado, redireciona para `elga/email-nao-encontrado`.

```tsx
const handleSubmit = async () => {
  setIsLoading(true)
  try {
    const response = await fetch("https://n8n.opens.com.br/webhook/hubspot-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, form_title: "ELGA", form_id: "ELGA" }),
    })

    const data = await response.json()

    if (response.ok && data.success && data.redirectUrl) {
      window.location.href = data.redirectUrl
    } else {
      router.push("elga/email-nao-encontrado")
    }
  } catch (error) {
    router.push("elga/email-nao-encontrado")
  } finally {
    setIsLoading(false)
  }
}
```

### Como gerar o link de convite
- Estrutura do link: `https://seu-dominio.com/elga?emailconf=<EMAIL_URL_ENCODED>`
- Sempre encode o e‑mail (ex.: `@` → `%40`).
- Exemplo: `https://seu-dominio.com/elga?emailconf=convidado%40empresa.com`

Helper sugerido (evita hardcode e erros de encoding):

```ts
function buildElgaInviteUrl(baseUrl: string, email: string) {
  const params = new URLSearchParams({ emailconf: email })
  return `${baseUrl}?${params.toString()}`
}
```

### Como testar rapidamente
- Acesse com `?emailconf=teste%40empresa.com` → deve aparecer apenas o botão “Confirmar Presença”.
- Acesse sem o parâmetro → deve aparecer o input + botão.
- Clique em confirmar e verifique o comportamento:
  - Se resposta contiver `success` e `redirectUrl` → redireciona para o link retornado.
  - Caso contrário/erro → vai para `elga/email-nao-encontrado`.

### Boas práticas e cuidados
- Encode sempre o e‑mail ao montar o link.
- O componente é client-side (usa `"use client"`, hooks e estado).
- Trate `isLoading` para evitar cliques múltiplos.
- A validação final do e‑mail é do backend; a UI redireciona para a página de “email não encontrado” quando necessário.

### Perguntas comuns
- Posso digitar outro e‑mail quando vier `emailconf`?
  - Não no comportamento atual. Para permitir edição, ajuste a renderização condicional para mostrar o input mesmo com `emailconf` presente.
- Onde altero o endpoint ou o comportamento de erro?
  - No `handleSubmit`, dentro de `app/page.tsx`.


