# Goiaspel — site institucional (redesign 2026)

Novo site da **Goiaspel Embalagens de Papelão** (Goiânia-GO): 21 páginas estáticas em Astro, com os mesmos caminhos do site atual (goiaspel.com.br), redesign premium, motion e acessibilidade AA.

> **Homologação:** https://stiloweb-staging.github.io/goiaspel_portfolio/
> Ambiente de revisão. As páginas saem com `noindex` e o domínio oficial **não** foi alterado. Antes de ir para produção, veja [Pendências para publicação](docs/10_PENDENCIAS_PARA_PUBLICACAO.md).

---

## Sumário

- [Stack](#stack)
- [Começando](#começando)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Onde editar o conteúdo](#onde-editar-o-conteúdo)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Publicação](#publicação)
- [Qualidade (QA)](#qualidade-qa)
- [Documentação](#documentação)
- [Regras do projeto](#regras-do-projeto)

## Stack

| Camada | Escolha | Por quê |
|---|---|---|
| Framework | [Astro 7](https://astro.build), saída estática | HTML pronto, JS só onde há interação |
| Estilo | Tailwind 4 (`@theme`) + CSS com escopo por componente | tokens da marca num só lugar |
| Tipografia | Archivo Variable (self-hosted, com fallback métrico) | sem CLS na troca de fonte |
| Imagens | `astro:assets` (AVIF/WebP responsivos) | peso e nitidez por tela |
| Linguagem | TypeScript estrito (`astro check` na build) | erros de tipo bloqueiam o deploy |
| Deploy | GitHub Actions → GitHub Pages | a cada push na `main` |

## Começando

Requisitos: **Node 22+** (o projeto usa a versão do [`.nvmrc`](.nvmrc)) e npm.

```bash
npm ci            # instala exatamente o que está no package-lock.json
npm run dev       # http://localhost:4321
```

| Script | O que faz |
|---|---|
| `npm run dev` | servidor de desenvolvimento com recarga |
| `npm run build` | `astro check` (tipos) + build em `dist/` |
| `npm run build:fast` | só a build, sem checagem de tipos |
| `npm run preview` | serve `dist/` localmente |
| `npm run content-map` | regenera [`docs/MAPA_DE_CONTEUDO.md`](docs/MAPA_DE_CONTEUDO.md) a partir de `dist/` |

## Estrutura do projeto

```
.
├── .github/workflows/deploy.yml   # build + deploy no GitHub Pages
├── astro.config.mjs               # site/base vindos do ambiente, redirects, sitemap
├── integrations/prefix-base.mjs   # prefixa caminhos absolutos quando publicado em subpasta
├── public/                        # arquivos servidos como estão (vídeo do hero, favicons, .htaccess)
├── src/
│   ├── pages/                     # uma rota por arquivo — caminhos idênticos ao site original
│   ├── layouts/Base.astro         # <head>, SEO, JSON-LD, header/footer, abertura com a logo
│   ├── components/                # seções e peças reutilizáveis (ver tabela abaixo)
│   ├── data/                      # conteúdo e configuração (textos, rotas, galeria, contatos)
│   ├── styles/global.css          # tokens da marca, tons de seção, dobras, padrões, recortes
│   ├── scripts/                   # motion (IntersectionObserver) e formulário
│   ├── lib/leads.ts               # envio do formulário (só com endpoint configurado)
│   └── assets/                    # imagens otimizadas na build
├── qa/                            # scripts de auditoria (Playwright + axe) e o gerador do mapa
└── docs/                          # estratégia, design system, QA, pendências, mapa de conteúdo
```

Componentes principais:

| Componente | Papel |
|---|---|
| `Intro` | abertura com a logo oficial (uma vez por sessão, respeita movimento reduzido) |
| `Header` | mega-menu com cartão de destaque, menu sanfonado no celular |
| `HeroCinematico` | vídeo da fábrica com carimbos dos números quando cada caixa para |
| `Setores` | setores atendidos; cada um mostra só as embalagens do portfólio daquele segmento |
| `Galeria` | as 54 embalagens do portfólio, filtráveis por categoria |
| `MedirCaixa` / `TiposPapelao` | guias técnicos (C × L × A; face simples a parede tripla) |
| `CtaFinal` | chamada final com foto sangrada (rodízio determinístico por página) |
| `Instagram` | faixa com postagens em fila contínua e ordem aleatória |
| `SectionHead`, `CutLine`, `FluteLine`, `Icon` | blocos de linguagem visual |

## Onde editar o conteúdo

| Quero mudar… | Arquivo |
|---|---|
| Menu, caminhos e cartões do mega-menu | [`src/data/rotas.ts`](src/data/rotas.ts) — fonte única de links |
| Telefone, e-mail, WhatsApp, endereço, redes | [`src/data/site.ts`](src/data/site.ts) |
| Soluções, setores, práticas ambientais, clientes | [`src/data/conteudo.ts`](src/data/conteudo.ts) |
| Embalagens do portfólio (fotos + legendas) | [`src/data/galeria.ts`](src/data/galeria.ts) + `src/assets/galeria/<categoria>/<n>.png` |
| Embalagens mostradas em cada setor | `porSetor` em [`src/components/Setores.astro`](src/components/Setores.astro) |
| Postagens da faixa do Instagram | coloque as imagens em `src/assets/instagram/` (a faixa some se a pasta estiver vazia) |
| Imagens geradas (tipos de papelão etc.) | `src/assets/gerado/` — prompts em [`docs/11_PROMPTS_IMAGENS.md`](docs/11_PROMPTS_IMAGENS.md) |
| Cores, tons de seção, dobras, padrões | [`src/styles/global.css`](src/styles/global.css) — ver [Design system](docs/05_DESIGN_SYSTEM.md) |
| Redirecionamentos das URLs antigas `/site/...` | [`src/data/redirects.mjs`](src/data/redirects.mjs) e [`public/.htaccess`](public/.htaccess) |

Depois de mexer em páginas, rode `npm run build:fast && npm run content-map` para atualizar o mapa de conteúdo.

## Variáveis de ambiente

Copie [`.env.example`](.env.example) para `.env`. **Nenhuma credencial secreta vai para o repositório** (só variáveis `PUBLIC_*`, que ficam visíveis no navegador).

| Variável | Padrão | Uso |
|---|---|---|
| `PUBLIC_STAGING` | `true` | `noindex` em todas as páginas; `false` só na produção autorizada |
| `PUBLIC_LEAD_ENDPOINT` | vazio | URL que recebe o formulário (POST multipart). Vazio = o formulário oferece WhatsApp/e-mail e **não finge envio** |
| `PUBLIC_SHOW_PENDING` | `false` | mostra selos de “pendente de validação” para revisão interna |
| `SITE_URL` | `https://www.goiaspel.com.br` | domínio para canonical e sitemap (usada na build) |
| `BASE_PATH` | `/` | subpasta de publicação (ex.: `/goiaspel_portfolio` no Pages) |

## Publicação

**Homologação (automática).** Todo push na `main` dispara [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): `npm ci` → `npm run build` com `SITE_URL`/`BASE_PATH` do repositório → upload para o GitHub Pages. O passo [`integrations/prefix-base.mjs`](integrations/prefix-base.mjs) reescreve os caminhos absolutos para a subpasta. Acompanhe em *Actions*.

**Produção (somente com autorização do cliente).** Build com domínio próprio, na raiz:

```bash
PUBLIC_STAGING=false SITE_URL=https://www.goiaspel.com.br npm run build
```

Envie `dist/` para o servidor (Apache lê o `.htaccess` com os 301 de `/site/...`). Checklist completo, DNS e rollback: [docs/10_PENDENCIAS_PARA_PUBLICACAO.md](docs/10_PENDENCIAS_PARA_PUBLICACAO.md).

## Qualidade (QA)

Os scripts em [`qa/`](qa/) usam `playwright-core` com o Microsoft Edge instalado e apontam para `http://localhost:4322` (`npx astro preview --port 4322`). As saídas vão para `qa/output/`, que não é versionada.

| Script | Verifica |
|---|---|
| `audit.mjs` | axe-core (WCAG), transbordo horizontal de 360 a 1920 px, erros de console, links internos |
| `full.mjs`, `shots.mjs` | capturas de página inteira por largura |
| `cls.mjs`, `hero-cine.mjs`, `intro.mjs` | estabilidade de layout, vídeo do hero, abertura |
| `content-map.mjs` | gera o mapa de conteúdo |

Último resultado: 21 páginas com **0 violações axe**, nenhum transbordo entre 360 e 1920 px, 24 links internos sem erro. Detalhes em [docs/09_RELATORIO_QA.md](docs/09_RELATORIO_QA.md).

## Documentação

Índice completo em [`docs/README.md`](docs/README.md). Destaques:

- [Mapa de conteúdo](docs/MAPA_DE_CONTEUDO.md): árvore de navegação e o conteúdo de cada página
- [Estratégia e sitemap](docs/03_ESTRATEGIA_E_SITEMAP.md)
- [Design system](docs/05_DESIGN_SYSTEM.md)
- [Pendências para publicação](docs/10_PENDENCIAS_PARA_PUBLICACAO.md)

## Regras do projeto

- Não publicar no domínio oficial, alterar DNS ou remover o site antigo sem aprovação do cliente.
- Não publicar como fato informação institucional não verificada. Itens em validação estão marcados em `src/data/conteudo.ts` (`status: 'pendente'`).
- Marcas de clientes só aparecem com autorização (`CLIENTES_AUTORIZADOS` em `src/data/conteudo.ts`, hoje `false`).
- Não simular integrações: sem endpoint configurado, o formulário não diz que enviou.
- Nunca versionar `.env` nem credenciais.

---

© Goiaspel Embalagens de Papelão. Todos os direitos reservados. Código e imagens deste repositório não são de uso livre.
