# 04 — Direção criativa

## Três conceitos avaliados

**A — Industrial Editorial.** Fotografia real em grandes recortes, títulos condensados em caixa-alta (herdados do PDF), grade suíça, muito respiro em off-white.

**B — Materialidade em Movimento.** O papelão como linguagem: corte transversal capa–miolo–capa como divisor, cantos chanfrados (“corte e vinco”), chapas kraft com borda ondulada, camadas que se recolhem como chapas sobre chapas.

**C — Tecnologia e Escala.** Fundos escuros, macrofotografia de máquinas, painel de números em destaque.

## Matriz ponderada (0–10)

| Critério (peso) | A | B | C |
|---|---|---|---|
| Autoridade industrial (25%) | 9 | 7 | 9 |
| Qualidade estética (20%) | 8 | 9 | 7 |
| Usabilidade (20%) | 9 | 7 | 7 |
| Coerência da marca (15%) | 8 | 9 | 6 |
| Viabilidade técnica (10%) | 9 | 8 | 7 |
| Performance (10%) | 9 | 8 | 6 |
| **Total** | **8,65** | **7,90** | **7,25** |

C depende de fotos de máquinas que **não existem** em qualidade real (a única do PDF parece banco de imagens) e de números que ainda estão pendentes.

## Escolha: **A como estrutura + B como assinatura**

A combinação é coerente porque B não disputa a composição de A: ele entra só nos **detalhes** que dizem “papelão” —

1. **FluteLine** — corte transversal de papelão ondulado em SVG (parede simples e dupla), como divisor de seções; o miolo “se desenha” ao entrar na tela.
2. **Chanfro** — imagens, botões, tags e cartões com um canto cortado, como as chapas da p. 6 do PDF. Raios arredondados quase não são usados.
3. **Chapas de indicadores** — placas kraft/azul/verde com borda de miolo ondulado (`.flute-edge`), uma releitura da p. 6.
4. **Camada que se recolhe** — imagens reveladas por uma “chapa” de papel que sai de cima (transição *layered*).

## Hero — 3 direções

| Direção | Ideia | Prós | Contras | Escolha |
|---|---|---|---|---|
| 1. Fábrica real | Título forte + foto aérea real com chanfro + recorte de colaboradora + faixa de fatos | Autoridade imediata, imagem real, LCP leve | Menos “efeito” | ✅ **Base** |
| 2. Macro de papelão | Ondas de papelão em close (p. 1 do PDF) | Materialidade forte | Imagem é render 3D; pode soar “IA” | Usada só como vetor (FluteLine) |
| 3. Produtos em degraus | Composição de caixas do PDF | Mostra produto | Parece catálogo, não indústria | Usada em Soluções |
| 4. **Mascote interagindo** (pedido do cliente) | Mascote 3D Goiaspel sobre o canto da foto real da fábrica, apresentando o título e o CTA | Memorável, humaniza; a fábrica real mantém a institucionalidade | Exige imagem fiel à ficha do personagem | ✅ **Implementado** (ver abaixo) |

**Headline:** “Embalagens que protegem produtos. E valorizam marcas.” (proposta do brief, em 3 linhas, com a segunda frase em verde).

### Hero final: fábrica real + mascote interagindo

- **Base institucional preservada:** título, CTAs e a foto aérea real da sede continuam sendo a hierarquia principal; a faixa de fatos (desde 1992, 11.000 m²…) segue logo abaixo.
- **Mascote:** gerado no **FLORA** (Nano Banana Pro, imagens→imagem) a partir do *Guia de Estilo 2027* enviado pelo cliente — 4 poses (caminhando, joinha, apresentando, acenando) em US$ 0,72. O fundo foi trocado para magenta com Nano Banana 2.1 (US$ 0,16) e recortado por chroma key, o que preserva luvas e tênis brancos. **Total: US$ 0,88.**
- **Interação:** no desktop o mascote fica sobre o canto inferior esquerdo da foto, com a palma aberta **apresentando o título e o CTA**. Com hover ou foco em “Solicitar orçamento” (ou no próprio mascote), ele troca para **joinha + piscada**. No celular, ele fica no canto inferior direito da foto, apresentando a fábrica.
- **Motion:** entrada com “passo” depois que a foto se revela + 2 ciclos de flutuação (menos de 5 s, WCAG 2.2.2); sem animação com movimento reduzido. Decorativo (`aria-hidden`), sem informação exclusiva.
- **Reuso:** a pose “acenando” substitui o mascote antigo na página 404. A pose “caminhando” fica disponível em `08_ASSETS/mascote/`.
- Componente: `src/components/HeroMascote.astro`.

## Paleta

**Paleta oficial 2027**, fornecida pelo cliente (substitui a amostragem inicial do PDF): Azul Estrutura #14395A, Verde Circular #2A7654, Azul Inovação #246E74, Verde Fibra #9BB89A, Papel Natural #F1ECE1, Terra Profunda #3B302A e Branco Técnico #FFFFFF. A aplicação em tons de seção, dobras, padrões e recortes está em `05_DESIGN_SYSTEM.md` (seções 1, 1b, 1c e 1d).

## Tipografia

**Archivo Variable** (OFL, auto-hospedada via Fontsource) — **uma única família** com eixo de largura:

- `wdth 62–75`, peso 800, caixa-alta → títulos e números (ecoa o condensado do PDF)
- `wdth 100`, pesos 400–650 → texto

Uma só família variável significa um único arquivo `woff2` e contraste vindo da largura, não da troca de fonte.

## Fotografia

Prioridade: fotos reais do PDF → fotos reais do site atual → vetores próprios. Não foram usadas imagens com cara de IA de pessoas genéricas (o engenheiro da p. 9 foi descartado). As fotos de produto antigas (~375 px) são exibidas em fundo branco, em miniatura, onde ficam nítidas.

## Motion

Funcional e discreto: títulos sobem de uma máscara (kinetic), imagens reveladas pela camada de papel, contagem só para dados validados, marquee de clientes com botão de pausa. Tudo em `transform`/`opacity`/`clip` e com `prefers-reduced-motion` respeitado (o site funciona inteiro sem animação). Transições entre páginas por View Transitions nativo, sem JS.
