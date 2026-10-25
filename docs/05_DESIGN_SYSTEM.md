# 05 — Design System Goiaspel

Fonte de verdade: `07_CODIGO_FONTE/src/styles/global.css` (tokens em `@theme` do Tailwind 4 + componentes em `@layer components`).

## 1. Cores — paleta oficial 2027

> “Azul sustenta. Verde renova. Papel acolhe. Terra ancora.”

| Nome | Hex | Token(s) | Uso |
|---|---|---|---|
| **Azul Estrutura** | #14395A | `blue-700`, `--gp-azul` | Títulos, botão primário, seção de capacidade (`tone-blue`) |
| **Verde Circular** | #2A7654 | `green-700`/`green-600`, `--gp-verde` | Destaques, botão verde, seção ambiental (`tone-green`) |
| **Azul Inovação** | #246E74 | `teal`, `--gp-teal` | CTA final (`tone-teal`), chapa de capacidade |
| **Verde Fibra** | #9BB89A | `sage`, `--gp-fibra` | Seções suaves (`tone-sage`), acentos sobre fundos escuros |
| **Papel Natural** | #F1ECE1 | `paper`, `--gp-papel` | Base; seções ímpares (com fibra de papel sutil) |
| **Terra Profunda** | #3B302A | `ink`, `terra`, `--gp-terra` | Texto, rodapé, linhas de papelão |
| **Branco Técnico** | #FFFFFF | `white`, `--gp-branco` | Seções pares (limpas), superfícies de formulário |

Derivados: `blue-900` #0F2C46, `blue-950` #0B2135, `green-800` #215E43, `paper-2` #E8E1D3, `paper-3` #DCD3C1, `ink-2` #574B42, `ink-3` #6B5F55, `kraft-deep` #6B5C50 (números decorativos, texto grande).
Os tokens `--gp-*` são **puros**: não mudam dentro de seções com tom (chapas, botão de vídeo, ilustrações).

### Tons de seção (redefinem os tokens dentro da seção)

| Classe | Fundo | O que muda | Contraste-chave |
|---|---|---|---|
| `tone-white` / `tone-paper` | Branco / Papel | — | Terra sobre Papel 11,6:1 |
| `tone-sage` | Verde Fibra | destaque verde vira Terra; textos de apoio escurecem | Terra sobre Fibra 7,0:1 · Azul sobre Fibra 4,9:1 |
| `tone-blue` / `tone-green` / `tone-teal` / `tone-terra` | cores escuras | títulos e texto ficam brancos; destaques em Verde Fibra (ou #D6E6D5 em verde/teal); botões invertidos | Branco sobre Azul 12:1 · Fibra sobre Azul 5,9:1 |

Validado por axe-core: **0 violações de contraste** nas 13 páginas.

## 1b. Sistema de dobras

Toda seção depois da primeira **dobra sobre a anterior**: avança `--fold-h` (22 a 60 px) sobre ela e recorta o topo numa forma de papelão. **Uma regra** (mesma altura, cortes a 45°) dá a harmonia; **quatro formas** em ciclo e a **alternância de fundos** evitam a monotonia.

| Ciclo | Forma | Classe para forçar |
|---|---|---|
| 2ª, 6ª… | **Aba**: uma aba de caixa sobe do topo | `.fold-flap`, `.fold-flap-r` (aba à direita) |
| 3ª, 7ª… | **Subida**: diagonal leve para a direita | `.fold-rise` |
| 4ª, 8ª… | **Vinco em V**: entalhe de faca | `.fold-notch` (`--notch-x`) |
| 5ª, 9ª… | **Descida**: diagonal leve para a esquerda | `.fold-fall` |

Uma sombra suave no topo imita o papel dobrado e acompanha o recorte. Fundos padrão: seções ímpares Papel, pares Branco; seções com `tone-*` fixam a cor. Ritmo da home: Papel, Branco, **Azul**, Branco, Papel, **Verde**, Papel, **Fibra**, Papel, **Inovação** e rodapé **Terra**.

## 1c. Materiais e padrões (hiper-realismo controlado)

- **Fibra real do papel** (`texturas/fibra.jpg`, `fibra-suave.jpg`): extraída da área lisa da chapa kraft da p. 6 do PDF, com filtro passa-alta e emendas cruzadas (ladrilho sem costura). Aplicada com `background-blend-mode: soft-light` sobre qualquer cor da paleta.
- **Miolo ondulado real** (`texturas/miolo-tile.png`): borda da chapa “35” da p. 6, ladrilhada no período exato da onda (66 px, medido por autocorrelação).
- **Chapas de indicadores:** cor da paleta + fibra + miolo real na borda + luz no topo + sombra projetada (aplicada no contêiner, para respeitar o chanfro).
- **Padrões por tom:** Papel = fibra suave · Branco = limpo · Escuros = **faca de caixa FEFCO 0201** (corte contínuo, vinco tracejado) em branco a 13% · Fibra = ondas de miolo em Terra a 9% + faca. No celular, só um desenho de faca, no canto inferior.

## 1d. Recortes de imagem (estilo da apresentação)

`<figure class="cut cut-{bl|tr|tl|slant}">` + `<CutLine shape=…/>`: o recorte vale para a mídia e para a camada de revelação; um **fio** (Verde Circular, ou Verde Fibra em fundos escuros) corre paralelo ao corte, do lado de fora, e se desenha quando entra na tela.

| Forma | Referência no PDF | Onde |
|---|---|---|
| `cut-bl`: diagonal grande no canto inferior esquerdo | p. 2 (vista aérea) | Hero (o mascote “sai” do corte), Assistência, aberturas internas, Sobre |
| `cut-tr`: diagonal no canto superior direito | p. 3 (impressora) | Precisão, Estrutura, Flexografia, galerias |
| `cut-tl` | p. 3 espelhado | Policromia, Sustentabilidade |
| `cut-slant`: lado inclinado + contorno completo | p. 10 (equipe) | CTA final, Assistência técnica |

## 2. Tipografia — Archivo Variable

| Classe | Tamanho | Eixos |
|---|---|---|
| `.display-xl` | clamp(2.6rem, 5.3vw, 6rem) | wdth 70 · 800 · caixa-alta · lh 0.92 |
| `.display-lg` | clamp(2.4rem, 6.4vw, 5.5rem) | idem |
| `.display-md` | clamp(2rem, 4.4vw, 3.75rem) | idem |
| `.num` | contexto | wdth 62 · 800 · algarismos tabulares |
| `.eyebrow` | 0.8125rem | 650 · tracking 0.14em · traço verde de 2,25rem |
| `.lead` | clamp(1.125rem, 1.6vw, 1.375rem) | 400 · máx. 38ch |
| corpo | 1.0625rem / 1.6 | wdth 100 · 400 |

## 3. Espaço, grade e forma

- Container 84rem; gutter `clamp(1rem, 4vw, 3rem)` (16 px no celular); seção `clamp(4.5rem, 10vw, 9rem)`.
- Grade de 12 colunas a partir de 64rem; mobile-first em 1 coluna.
- Breakpoints usados: 36 / 40 / 48 / 64 / 80 / 90 rem.
- **Chanfro** `--chamfer: clamp(18px, 3vw, 40px)` → `.chamfer` (dois cantos), `.chamfer-tr` (canto superior direito). Botões: 12 px. Tags: 8 px.
- Raios: 2/4/8 px, usados quase só em inputs. Sombras: nenhuma — a profundidade vem de camadas e cor.

## 4. Motion tokens

| Token | Valor | Uso |
|---|---|---|
| `--dur-1` | 160 ms | hover, cor |
| `--dur-2` | 320 ms | menus, sublinhados, setas |
| `--dur-3` | 700 ms | revelação editorial |
| `--dur-4` | 1400 ms | linha de papelão, contagem |
| `--ease-out-quart` | cubic-bezier(.25,1,.5,1) | entradas |
| `--ease-in-out-cut` | cubic-bezier(.65,0,.35,1) | camadas/cortes |

Atributos: `data-reveal` (sobe + fade), `data-reveal="mask"` (camada de papel recolhe para cima), `data-reveal="layer"` (recolhe para a direita), `data-reveal-group` (escalonamento automático), `.kinetic` + `data-auto` (linhas de título; `data-auto` anima no carregamento, acima da dobra), `data-wipe` (camada no carregamento), `data-count` (contagem; **apenas dados validados**). Nada fica oculto sem `html.js-motion`, que só é aplicada sem `prefers-reduced-motion`.

## 5. Componentes (`src/components/`)

| Componente | Função | Estados / acessibilidade |
|---|---|---|
| `Header` | Logo, nav (4), telefone, CTA, menu do celular | `aria-current`, `aria-expanded`, Esc fecha, foco preso no menu, borda ao rolar |
| `MobileBar` | WhatsApp + Orçamento fixos no celular | Aparece após o hero; some perto do rodapé |
| `Footer` | Navegação, contatos, endereço, redes | Links com rótulo de nova aba |
| `.btn` (+ `-green`, `-ghost`, `-light`, `-ghost-light`, `-sm`) | Ações | hover, focus-visible (o chanfro sai para não cortar o anel), active, disabled, `aria-busy` (spinner) |
| `.link-arrow` | Links secundários | Sublinhado cresce no hover, seta desliza |
| `SectionHead` | Eyebrow numerado + título com destaque + lead | `level` h1/h2, variante em fundo escuro |
| `PageHero` | Abertura das internas + breadcrumb (Schema BreadcrumbList) | — |
| `FluteLine` | Corte do papelão (simples/dupla) | `aria-hidden`; desenha ao entrar na tela |
| `Indicadores` | Chapas de números | Selo de pendente; contagem só para validados |
| `Processo` | 5 etapas | `<ol>` semântico; horizontal ≥ 64rem |
| `Setores` | Lista + foto | botões `aria-pressed`; não depende de hover |
| `Galeria` | Portfólio filtrável + lightbox | `<dialog>`, ← → Esc, foco devolvido, status `aria-live` |
| `Clientes` | `marquee` / `grid` | Botão de pausa (WCAG 2.2.2), pausa no hover/foco, estático com movimento reduzido |
| `VideoFacade` | YouTube sob demanda (nocookie) | Botão rotulado; nenhum pedido a terceiros antes do clique |
| `CtaFinal` | Fechamento comercial | — |
| `Pending` | Selo “pendente de validação” | Renderizado só em homologação |
| Formulários (`.f-*`) | input, select, textarea, radio em cartão, checkbox, arquivo, dimensões | default, hover, focus, `aria-invalid`, disabled, resumo de erros com `role="alert"`, painel de resultado com `role="status"` |
| `ResultPanel` | Sucesso / integração pendente / erro | Foco programático |

## 6. Regras de uso

1. Um componente por função — não criar variações de cartão para a mesma tarefa.
2. Toda imagem tem `alt` descritivo, exceto as decorativas (`alt=""`).
3. Todo número factual vem de `src/data/conteudo.ts`, com `fonte` e `status`.
4. Novos ícones entram em `Icon.astro` (traço de 1,75 sobre grade de 24 px).
