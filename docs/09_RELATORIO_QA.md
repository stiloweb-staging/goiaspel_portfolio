# 09 — Relatório de QA e red team

**Build testada:** `npm run build` (astro check: **0 erros, 0 avisos**) servida por `astro preview` em `localhost:4322`, em 25/10/2026.
**Ferramentas:** `qa/audit.mjs` (Playwright + Edge), `axe-core` 4.x, Lighthouse, `qa/form-test.mjs`. Capturas em `09_QA_SCREENSHOTS/`.

## 1. Resultados automatizados

### Responsividade — 13 páginas × 6 larguras (360, 390, 768, 1024, 1440, 1920)

| Verificação | Resultado |
|---|---|
| Rolagem horizontal | **0** ocorrências (78 combinações) |
| Imagens sem `alt` / quebradas | **0** |
| `<h1>` por página | exatamente 1 em todas |
| Erros de console | 0 (exceto o 404 esperado em `/nao-existe/`, que retorna status 404 de propósito) |
| Links internos | 16 verificados, **0** quebrados |
| Elementos animados que ficam ocultos após rolar | **0** de 268 |

### Acessibilidade — axe-core (WCAG 2.0/2.1/2.2 A + AA + best practices), 1440 px

**0 violações nas 13 páginas.** Corrigido durante o QA: contraste dos números decorativos (kraft → kraft-deep), eyebrows e leads em fundo escuro, aviso de homologação fora de landmark, links de texto sem sublinhado, checkbox abaixo de 24 px.

### Lighthouse (mobile simulado, 4G lento; homologação com `noindex`)

| Página | Perf. | Acess. | Boas práticas | SEO* | LCP | CLS |
|---|---|---|---|---|---|---|
| Início (paleta 2027, dobras, texturas, mascote) | 96 | 100 | 100 | 69* | 2,7 s | 0 |
| Início (desktop) | 100 | 100 | 100 | 69* | 0,59 s | 0 |
| Soluções | 96 | 100 | 100 | 69* | 2,7 s | 0 |
| Orçamento | 99 | 100 | 100 | 69* | 1,8 s | 0 |
| Sobre | 98 | 100 | 100 | 69* | 2,2 s | 0 |

\* **SEO 69 é intencional:** a única auditoria reprovada é `is-crawlable`, por causa do `noindex` da homologação. Com `PUBLIC_STAGING=false`, todas as auditorias de SEO restantes passam.

**Metas do brief:** Performance ≥ 90 ✅ · Acessibilidade ≥ 95 ✅ · Boas práticas ≥ 95 ✅ · CLS ≤ 0,1 ✅ · INP: TBT 0–30 ms ✅ · LCP ≤ 2,5 s: ✅ no desktop e nas internas; **home no celular com 2,7 s** (simulação; era 2,6 s antes do mascote — as imagens do mascote têm `fetchpriority="low"` para não disputar com a foto do hero). O LCP é a foto do hero, que fica abaixo do título no celular; o tempo restante é de renderização, não de download. Reavaliar com dados reais (PageSpeed/CrUX) na homologação hospedada em CDN.

Correções de performance feitas no QA: preload da fonte (CLS da home **0,124 → 0**), CSS embutido no HTML, variantes de 240–480 px para as imagens do hero, vídeos do YouTube só no clique, nenhum JS de framework.

### Formulário de orçamento (`qa/form-test.mjs`, 390 px) — 14/14 aprovados

Pré-seleção por `?tipo=` · campos condicionais (medidas, arte) · resumo de erros com foco e 8 itens · `aria-invalid` · mensagem de e-mail inválido · máscara `(62) 99999-8888` · estado `not-configured` sem simular sucesso · resumo correto no link do WhatsApp e do e-mail · honeypot bloqueia robô.

## 2. Problemas encontrados e corrigidos

| # | Problema (evidência) | Gravidade | Correção |
|---|---|---|---|
| 1 | Ícones em componentes filhos sem o estilo do pai (ícone gigante no aviso do orçamento) | Crítica | `scopedStyleStrategy: 'class'` + tamanho padrão no `Icon` |
| 2 | Hero empilhava a imagem abaixo do texto no desktop (grade sobreposta) | Crítica | Colunas 1–7 / 8–12 com `grid-row: 1` |
| 3 | Revelações com `clip-path` nunca disparavam (observer não vê área recortada) — 9 elementos ocultos na home | Crítica | Revelação por camada `::after` sobre o elemento visível |
| 4 | Hero oculto até o JS → risco para o LCP | Alta | Animação por keyframes no carregamento; conteúdo já pintado |
| 5 | 27 px de rolagem horizontal no orçamento em 360 px | Alta | `minmax(0,1fr)` e `min-width: 0` |
| 6 | CLS 0,124 por troca de fonte | Alta | Preload do woff2 |
| 7 | Grade dos indicadores com vazio e “1992” encostando na borda | Média | Posições explícitas e escala menor |
| 8 | Botões contornados sem borda no canto chanfrado | Média | Sem chanfro nos contornados |
| 9 | Cartões de rádio cobriam o `<input>` | Média | `z-index` no input |
| 10 | Play do vídeo não cobria o ícone desenhado nas capas originais | Baixa | Play centralizado e maior |
| 11 | `<img>` sem `src` no lightbox | Baixa | Criado sob demanda |
| 12 | Volume de conteúdo menor que o do site atual (feedback do cliente) | Alta | Portfólio de 54, dicas, Eucaflora, 18 clientes, contato com “nós ligamos”, história e vídeo na home |
| 13 | Recorte do mascote “comia” luvas e tênis brancos (fundo branco) | Alta | Fundo trocado para magenta no FLORA + chroma key |
| 14 | Título em 5 linhas a 1920 px e mascote encostando no botão a 1024 px | Média | Tamanho máximo do título limitado a 4,85rem; posição do mascote por breakpoint |
| 15 | Recorte aplicado a `<picture>` inline escondia a foto do hero | Crítica | `.cut > picture { display: block }` |
| 16 | Fibra forte demais nas chapas coloridas (efeito carpete) | Média | Versão suave da fibra; a forte só na chapa Papel |
| 17 | CLS de 0,126 em rede lenta (a troca da fonte refluía o título) | Alta | `@font-face` próprio com `font-display: optional` + preload: CLS 0 em todas as páginas |

## 3. Red team — cinco perspectivas

| Perspectiva | Avaliação crítica |
|---|---|
| **Designer sênior** | Tem identidade (FluteLine, chanfro, chapas, tipografia condensada) e não parece template. Ponto fraco: as fotos de produto antigas (~375 px) são visivelmente mais pobres que as do PDF; uma sessão fotográfica elevaria o portfólio. |
| **Diretor de marketing B2B** | Capacidade, processo, pós-venda e clientes estão claros. Faltam cases reais e números validados — hoje 2 dos 4 indicadores estão pendentes, o que enfraquece a seção “Precisão”. |
| **Comprador industrial** | Orçamento a 1 clique em qualquer tela, formulário em 3 blocos, WhatsApp sempre à mão no celular. Sem as medidas, o formulário oferece uma visita. Pedido mínimo ainda sem valor (pendente). |
| **Engenheiro frontend** | Estático, 0 erros de tipo, 0 violações axe, JS mínimo, tokens centralizados, dados com fonte e status. Risco: o logo é raster (pedir SVG); integração dos formulários pendente. |
| **Auditor editorial** | Nenhum dado conflitante publicado como fato: anos calculados, 1.500 t sem período presumido, “100% solar” e “R$ 2.500” retirados, greenwashing evitado. A imagem da impressora (aparência de banco de imagens) está sinalizada. |

## 4. Notas (0–10, com base em evidência)

| Critério | Nota | Evidência |
|---|---|---|
| Estética | 8,5 | Sistema visual próprio; fotos antigas de produto limitam |
| Posicionamento | 8,5 | Pilares com prova em cada página |
| Clareza | 9 | Uma ideia por seção, títulos diretos |
| Navegação | 9 | 4 itens + CTA, trilha, 301 para 18 URLs antigas |
| Responsividade | 9,5 | 78 combinações sem overflow |
| Performance | 9 | Lighthouse 97–100; LCP mobile da home 2,6 s |
| Acessibilidade | 9,5 | axe 0, Lighthouse 100, teclado e movimento reduzido |
| Consistência | 9 | Tokens e componentes únicos |
| Conversão | 8 | Orçamento estruturado; aguarda o endpoint real |
| Qualidade editorial | 8,5 | Pendências sinalizadas; faltam validações do cliente |

## 5. Limitações dos testes

- Testado no Edge/Chromium. **Safari e Firefox não foram testados** (sem esses navegadores no ambiente) — recomenda-se BrowserStack ou um iPhone real na homologação.
- Leitor de tela: estrutura validada por axe e pela árvore de acessibilidade; **não houve teste manual com NVDA ou VoiceOver**.
- Desempenho medido em localhost com throttling simulado, não em hospedagem real.
- Hero com mascote verificado em 390/768/1024/1280/1440/1920 px: sem sobreposição com título/lead/CTAs e sem rolagem horizontal; estado de hover do CTA capturado em `hero-mascote-1440-hover-cta.png`.
