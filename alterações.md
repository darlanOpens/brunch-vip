# Brunch VIP — Instruções de ajuste de cópias (para DEV)

Este documento orienta **o que** mudar e **onde** nas páginas do Brunch VIP.  
Foco: ajustar mensagens para reforçar exclusividade e a jornada de confirmação/p pré-seleção.

---

## 1) Página inicial do evento
**URL:** `https://go.opens.com.br/brunch-vip`  
**Seção:** Formulário principal (campo + botão ao lado)

### O que mudar
- **Placeholder do input:**  
  - De: (o que estiver hoje, ex.: “Email do convite pessoal”)  
  - **Para:** `Email de acesso`
- **Texto do botão (CTA):**  
  - De: (ex.: “Confirmar Convite”)  
  - **Para:** `Prosseguir para confirmação`
- **Microcopy (texto pequeno abaixo do campo):**  
  - **Adicionar:** `VIP • vagas limitadas`

### Observações de implementação
- **Acessibilidade:** mantenha `label` visível ou `aria-label="Email de acesso"` (placeholder não substitui label).
- **Estilo do microcopy:** tipicamente `<small>` com opacidade/80% e espaçamento superior de 4–8px.
- **Tracking (opcional):** ao clicar no CTA, dispare um evento `brunchvip_form_start` no seu analytics.

---

## 2) Página de pré-seleção (quando o e-mail não está na lista)
**URL atual:** `https://go.opens.com.br/brunch-vip/lote-esgotado`  
**Novo posicionamento:** conteúdo passa a comunicar **pré-seleção** (sem “lote esgotado”).

> **Opcional (recomendado):** renomear o slug para  
> `https://go.opens.com.br/brunch-vip/pre-selecao`  
> e criar **redirect 301** de `/lote-esgotado` → `/pre-selecao`.

### O que mudar (copys exatas)
- **Título (H1):**  
  `Pré-seleção`
- **Lead (parágrafo abaixo do H1):**  
  `Seu e-mail não está na lista principal. Estamos liberando pouquíssimas confirmações adicionais por seleção.`
- **Form header (título do formulário):**  
  `Envie seus dados para entrar na pré-seleção`
- **CTA (botão do formulário):**  
  `Entrar na pré-seleção`
- **Rodapé sutil do formulário (microcopy):**  
  `Fique atento! Se aprovado, você receberá um contato do nosso time!`

### Observações de implementação
- **Remover** qualquer ocorrência de “lote esgotado” no conteúdo, **title**, **meta description** e **OG tags**.
- **SEO (opcional):**  
  - Title: `Pré-seleção — Brunch VIP`  
  - Description: `Pouquíssimas confirmações adicionais por seleção. Envie seus dados para participar da pré-seleção.`
- **Tracking (opcional):** no submit bem-sucedido, evento `brunchvip_preselecao_submit`.

---

## 3) Página de e-mail encontrado (fluxo já existente)
**URL:** `https://go.opens.com.br/brunch-vip/convite-confirmado`  
*(Sem mudanças obrigatórias neste pacote. Mantemos o fluxo atual.)*

---

## 4) Checklist de QA (antes de publicar)
- [ ] Placeholder do input na **/brunch-vip** é “Email de acesso”.
- [ ] CTA do formulário na **/brunch-vip** é “Prosseguir para confirmação”.
- [ ] Microcopy “VIP • vagas limitadas” aparece abaixo do campo/botão.
- [ ] Página de não-encontrado exibe **H1 “Pré-seleção”** e **não** fala “lote esgotado”.
- [ ] Lead, Form header, CTA e Rodapé do formulário estão exatamente como acima.
- [ ] (Se renomear slug) Redirect 301 de `/lote-esgotado` → `/pre-selecao` funcionando.
- [ ] Titles/Descriptions/OG atualizados para refletir “Pré-seleção”.
- [ ] Fluxos continuam corretos:
  - E-mail na lista → `/convite-confirmado`
  - E-mail fora da lista → `/pre-selecao` (ou `/lote-esgotado` se manter slug)

---

## 5) Dicas rápidas para localizar no código (caso seja Next/React)
- Formulário da **/brunch-vip**: procure pelo componente do **Hero/Form** onde estão:
  - `placeholder="Email do convite pessoal"` → **trocar** para `"Email de acesso"`.
  - Texto do botão (children do `<Button>` ou prop `label`) → **trocar** para `"Prosseguir para confirmação"`.
  - Inserir o microcopy logo após o form:  
    ```jsx
    <small className="opacity-80 block mt-2">VIP • vagas limitadas</small>
    ```
- Página de pré-seleção: localizar o template da rota (`/brunch-vip/lote-esgotado`), substituir H1/lead e textos do formulário conforme seção 2.  
  Se criar `/pre-selecao`, duplicar o template, ajustar textos e configurar 301.

---

### Commit sugerido
`feat(brunch-vip): ajustar cópias do formulário inicial e página de pré-seleção; opcional redirect /lote-esgotado -> /pre-selecao`

Qualquer dúvida, me chama que eu aponto o trecho exato no repositório.
