# 01 — Auditoria do site atual (goiaspel.com.br)

**Data da inspeção:** 25/10/2026 · **Método:** download e análise do HTML de todas as 17 páginas internas, inspeção no navegador (desktop 1440 px e celular 375 px), verificação de links, metadados e scripts.

## 1. Inventário

| URL (prefixo real: `/site/`, via `<base href>`) | Conteúdo | Classificação |
|---|---|---|
| `/` | Carrossel (7 slides), diferenciais, mix de produtos, 7 segmentos, números (34 anos, 250 cx/min, 900 t, 11.000 m²), história, vídeo 30 anos, mascote, 12 clientes | **ATUALIZAR** |
| `/conheca-a-goiaspel-embalagens-de-papelao/` | História 1992 → 1997 → 2003 → 2015, vídeo institucional | **FUNDIR** → `/sobre/` |
| `/valores-e-missao-goiaspel/` | 4 valores + missão | **FUNDIR** → `/sobre/#valores` |
| `/cultura-e-relacionamento-goiaspel/` | Cultura de relacionamento + frase da direção | **FUNDIR** → `/sobre/#relacionamento` |
| `/know-how-e-infraestrutura-goiaspel/` | Investimentos em pessoas, processos, software | **FUNDIR** → `/estrutura/` |
| `/responsabilidade-ambiental-goiaspel/` | Eucalipto, resíduos, efluentes, “100% movida a energia solar” | **ATUALIZAR** → `/sustentabilidade/` |
| `/produtos-goiaspel-embalagens-de-papelao/` | Texto da linha de produtos + 4 categorias | **FUNDIR** → `/solucoes/` |
| `/produtos-goiaspel/caixa-em-flexografia/` | Galeria 25 fotos | **FUNDIR** → `/solucoes/#portfolio` |
| `/produtos-goiaspel/caixa-em-policromia/` | Galeria 18 fotos | **FUNDIR** → `/solucoes/#portfolio` |
| `/produtos-goiaspel/caixas-especiais/` | Galeria 7 fotos | **FUNDIR** → `/solucoes/#portfolio` |
| `/produtos-goiaspel/acessorios-de-papelao/` | Galeria 4 fotos | **FUNDIR** → `/solucoes/#portfolio` |
| `/criacao-de-layout-e-amostras-de-produtos/` | Setor de layout e amostras | **FUNDIR** → `/solucoes/#desenvolvimento` |
| `/tire-suas-duvidas-sobre-nossos-produtos-goiaspel/` | Tipos de papelão, ondas, como medir, 6 perguntas, mercado | **ATUALIZAR** → `/duvidas/` |
| `/dicas-e-curiosidades-goiaspel/` | 8 fotos de reaproveitamento de caixas | **ATUALIZAR** → `/dicas/` |
| `/canais-de-contato-com-a-goiaspel/` | Formulário + “nós ligamos” | **ATUALIZAR** → `/contato/` |
| `/seja-um-fornecedor-da-goiaspel/` | Formulário de fornecedor | **MANTER** (redesenhado) → `/fornecedores/` |
| `/eucaflora-uma-empresa-do-grupo-goiaspel/` | Empresa do grupo | **MANTER** (redesenhado) → `/eucaflora/` |
| `/videos-da-goiaspel/` | 2 vídeos do YouTube | **FUNDIR** → `/sobre/#videos` |
| — | Orçamento estruturado, política de privacidade, 404 | **CRIAR** |

**Nada foi REMOVIDO.** Todo conteúdo com valor comercial ou de SEO foi migrado ou fundido, e cada URL antiga tem um 301 (ver `07_CODIGO_FONTE/public/.htaccess`).

## 2. UX

- **Caminho para orçamento fraco:** não existe orçamento estruturado; apenas um formulário genérico de “comentários, dúvidas ou sugestões” sem dados da embalagem.
- **Arquitetura fragmentada:** 17 páginas finas (valores, cultura e know-how têm 1–2 parágrafos cada), com menus “A Goiaspel / Produtos e serviços / Goiaspel responde”.
- **Galerias sem contexto:** listas numeradas de imagens, sem legenda, filtro ou indicação de aplicação.
- **Celular:** hero em carrossel com 7 pontos de navegação; os diferenciais ocupam a tela inteira com um ícone grande cada (muita rolagem e pouca informação).
- **Links quebrados:** `clientes.php`, `servicos.php` e `formulario_ligamos_voce.php` retornam 404 a partir da raiz; o “Nós te ligamos!” do topo não funciona.

## 3. UI

- Paleta dourada/bege no site que **não corresponde** ao azul e ao verde do logotipo e da apresentação 2026.
- Tipografia fina, com contraste baixo nos subtítulos; hierarquia confusa (6 `<h1>` na home).
- Ícones genéricos de linha substituem as fotografias reais da fábrica e dos produtos.
- Carrossel automático como hero, sem mensagem de valor nem CTA.

## 4. Conteúdo

- **Desatualizado:** 34 anos / 250 cx/min / 900 t (a apresentação 2026 traz 35 / 500 / 1.500+).
- **Afirmações a revisar:** “Empresa 100% movida a energia solar”; “devolve a água limpa ao meio ambiente” (o PDF diz “tratada e reutilizada”); pedido mínimo de “R$ 2.500,00 por referência”.
- **Valor a preservar:** história detalhada, guia técnico (NBR 5985, tabela de ondas, como medir), FAQ, portfólio de 54 embalagens reais, clientes, conteúdo da Eucaflora.
- E-mail do `mailto` no `<head>` é `contato@`, enquanto o rodapé usa `atendimento@` (o PDF confirma `atendimento@`).

## 5. Tecnologia

| Item | Achado | Severidade |
|---|---|---|
| Acessibilidade | 65 de 65 imagens **sem `alt`**; `<html>` sem `lang`; `user-scalable=no` bloqueia o zoom (WCAG 1.4.4) | Crítica |
| Segurança | jQuery 1.12.4 (2016, com vulnerabilidades conhecidas) e plugins antigos | Alta |
| SEO | Sem `robots.txt` e sem `sitemap.xml` (404); `og:url` em http; uma única meta description para o site inteiro | Alta |
| Estrutura | `<base href="/site/">`: cada página existe em duas URLs (com e sem `/site`), o que gera conteúdo duplicado | Média |
| Formulários | CAPTCHA por imagem; sem consentimento LGPD; sem validação acessível | Média |
| Desempenho | 7 imagens de carrossel e Font Awesome 4.5 via CDN carregados no primeiro acesso | Média |

## 6. Capturas de referência

Desktop: hero em carrossel + seção de diferenciais com ícones. Celular: logo, menu e carrossel; os diferenciais ocupam uma tela por item. (Capturas tiradas no painel do navegador durante a inspeção.)
