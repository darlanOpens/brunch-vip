# Brunch Experience - Landing Page

Esta é uma landing page para o evento "Brunch Experience", desenvolvida com Next.js, TypeScript e Tailwind CSS.

## 🚀 Tecnologias utilizadas

- **Next.js 14** - Framework React para produção
- **TypeScript** - Superset JavaScript com tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **React 18** - Biblioteca JavaScript para interfaces

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- Node.js (versão 16 ou superior)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório ou navegue até a pasta do projeto:
```bash
cd "C:\Users\darla\OneDrive\Documentos\brunch vip"
```

2. Instale as dependências:
```bash
npm install
```

## 🎨 Assets

Os assets (imagens e ícones) devem estar localizados na pasta `public/assets/`. Certifique-se de que todos os arquivos de imagem extraídos do Figma estejam nesta pasta.

## 💻 Executando o projeto

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

O projeto estará disponível em [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do projeto

```
brunch-vip/
├── public/
│   └── assets/         # Imagens e ícones
├── src/
│   ├── app/
│   │   ├── globals.css # Estilos globais
│   │   ├── layout.tsx  # Layout principal
│   │   └── page.tsx    # Página principal
│   └── components/     # Componentes React
│       ├── Hero.tsx
│       ├── Features.tsx
│       ├── Speakers.tsx
│       ├── Gallery.tsx
│       ├── Sponsors.tsx
│       ├── CTA.tsx
│       └── Footer.tsx
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## 🌟 Funcionalidades

- Design responsivo (desktop-first)
- Componentes modulares e reutilizáveis
- Otimização de imagens
- Gradientes e efeitos visuais modernos
- Formulário de confirmação de convite

## 📦 Scripts disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a versão de produção
- `npm run start` - Inicia o servidor em produção
- `npm run lint` - Executa o linter

## 🎨 Personalização

### Cores
As cores principais do projeto estão definidas em `tailwind.config.ts`:
- Vermelho: `#fb1b1f`
- Roxo: `#5b00b6`

### Fontes
O projeto utiliza as fontes:
- Butler (serif)
- Work Sans (sans-serif)
- Helvetica Neue (sans-serif)

Para adicionar as fontes, você precisará baixá-las e colocá-las na pasta `public/fonts/`.

## 📝 Notas

- As imagens de fundo utilizam mix-blend-mode para efeitos visuais
- Os formulários possuem backdrop-filter para efeito de blur
- A galeria utiliza máscaras SVG para criar layouts interessantes

## 🤝 Contribuindo

Para contribuir com o projeto:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
