# 06 — Plano de implementação

## Stack escolhida

| Camada | Escolha | Por quê |
|---|---|---|
| Framework | **Astro 7.4** (saída estática) | Site institucional sem login: HTML pré-renderizado, zero JS de framework, SEO e LCP ótimos, hospedagem barata (qualquer servidor Apache/Nginx/CDN) |
| Linguagem | TypeScript estrito | `astro check`: 0 erros |
| Estilo | **Tailwind CSS 4** (tokens em `@theme`) + CSS com escopo por componente | Tokens únicos; layouts editoriais complexos ficam mais legíveis em CSS do que em utilitários |
| Fonte | Archivo Variable via `@fontsource-variable/archivo` | Auto-hospedada (sem Google Fonts → sem terceiros, LGPD) |
| Imagens | `astro:assets` + sharp | AVIF/WebP com fallback JPG, `srcset`/`sizes`, dimensões fixas (CLS ≈ 0) |
| Motion | CSS + IntersectionObserver (~1 KB) | GSAP/Motion avaliados e **descartados**: os efeitos são simples transform/clip e não justificam ~30–60 KB |
| SEO | `@astrojs/sitemap`, canonical, Open Graph, Schema.org (Organization, BreadcrumbList, Service, FAQPage) | — |
| QA | `playwright-core` (Edge instalado, sem download de navegador), `axe-core`, `lighthouse` | Somente devDependencies |

**Next.js foi descartado:** não há rotas dinâmicas, área logada nem API própria; ele acrescentaria runtime e custo sem benefício. **Componentes do 21st.dev** (React/shadcn) serviram de referência de padrão (galeria com lightbox, marquee acessível de logos) e foram reimplementados em Astro para não incluir React.

## Estrutura

```
07_CODIGO_FONTE/
├── astro.config.mjs        site, sitemap, redirects, scopedStyleStrategy: 'class'
├── public/                 favicon, robots.txt, .htaccess (301 + cache), logo
├── qa/audit.mjs            auditoria automatizada (capturas, overflow, axe, links, motion)
└── src/
    ├── assets/             fotos (PDF), galeria/dicas/eucaflora/clientes (site atual), marca
    ├── components/         Header, Footer, MobileBar, SectionHead, PageHero, FluteLine, Indicadores,
    │                       Processo, Setores, Galeria, Clientes, VideoFacade, CtaFinal, ResultPanel, Pending, Icon
    ├── data/               site.ts (contato, STAGING), conteudo.ts (indicadores, soluções…), galeria.ts, redirects.mjs
    ├── layouts/Base.astro  <head> SEO, Schema, header/footer, motion
    ├── lib/leads.ts        adaptador de envio (sem simulação)
    ├── scripts/            motion.ts, form.ts
    ├── styles/global.css   tokens + componentes
    └── pages/              index, solucoes, estrutura, sustentabilidade, sobre, orcamento, contato,
                            duvidas, dicas, fornecedores, eucaflora, privacidade, 404
```

## Como executar

```bash
cd 07_CODIGO_FONTE
npm install
npm run dev          # http://localhost:4321
npm run build        # astro check + build em dist/
npm run preview      # serve dist/ em http://localhost:4321
node qa/audit.mjs http://localhost:4322 ../09_QA_SCREENSHOTS   # com o preview rodando na porta 4322
```

Variáveis (copiar `.env.example` para `.env`):

- `PUBLIC_STAGING` — padrão `true`: selos de pendência + `noindex`. Mudar para `false` só na publicação.
- `PUBLIC_LEAD_ENDPOINT` — URL https que recebe `POST multipart/form-data` e responde 2xx. Vazio = integração pendente (o envio oferece WhatsApp ou e-mail com o resumo).

## Integração do formulário (decisão pendente)

| Opção | Custo | Prós | Contras |
|---|---|---|---|
| Formspree / Web3Forms | Gratuito a baixo | Pronto em minutos, anti-spam, anexos (planos pagos) | Dados passam por terceiros (DPA) |
| Função serverless própria + SMTP do domínio | Baixo | Dados sob controle | Exige deploy e manutenção |
| RD Station / CRM | Variável | Leads direto no funil | Integração e custo |

O adaptador `src/lib/leads.ts` aceita qualquer uma delas sem mudar a interface.

## Fases executadas

A Discovery → B Estratégia → C Exploração (3 conceitos + matriz) → D/E Implementação (13 páginas) → F Validação automatizada (6 larguras × 13 páginas, axe, links, motion) → G Paridade de conteúdo com o site atual (portfólio de 54, dicas, Eucaflora, 18 clientes, contato).

## Próximas fases

1. ~~Hero com o mascote (FLORA)~~ — concluído (`HeroMascote.astro`, US$ 0,88).
2. Validação de dados e permissões (ver `10_PENDENCIAS_PARA_PUBLICACAO.md`).
3. Sessão fotográfica (máquinas, produtos em alta resolução).
4. Ativação do endpoint dos formulários + analytics com consentimento.
5. Homologação em subdomínio (`novo.goiaspel.com.br`) → publicação com os 301.
