# Prompts de imagem — Goiaspel (ChatGPT / GPT Image)

Gere cada imagem separadamente e salve com o **nome de arquivo indicado**. Formato: PNG ou JPG, lado maior ≥ 2048 px.
Regras para todas: sem texto, sem logotipos, sem marcas de clientes, sem pessoas (salvo indicação). Fundo e luz consistentes para as imagens parecerem uma sessão só.

---

## 1. `medir-caixa.png` — guia "Como medir sua caixa" (4:3)
> Hyperrealistic product photograph of a single empty open corrugated cardboard shipping box (regular slotted carton), kraft brown, all four top flaps open and folded outward, three-quarter front-left view from slightly above so the inside walls and bottom are visible. Crisp detail: visible corrugated flute edges on the flap cut edges, subtle kraft fiber texture, faint score lines, a clean glued manufacturer's joint on one corner. No tape, no print, no logos, no text. Box centered with generous empty margin on all sides (box ≈ 55% of frame width) on a seamless warm off-white paper backdrop (#F1ECE1), soft large window light from the left, soft contact shadow. Commercial catalog photography, 85mm, f/8, ultra sharp, natural colors.

*(As cotas C · L · A são desenhadas por cima no site — a foto deve vir limpa.)*

## 2. `tipos-hero.png` — abertura "Tipos de papelão ondulado" (16:9)
> Hyperrealistic macro still life of corrugated cardboard: a neat stack of flat kraft corrugated board sheets photographed from a low three-quarter angle so the cut edges show the wavy fluting between the liners in sharp detail, plus a rolled strip of single-face corrugated (exposed flutes) curving in the background on the right. Warm off-white seamless background (#F1ECE1) fading to near white on the LEFT 45% of the frame, left empty for text. Soft directional daylight from the upper right, shallow depth of field, detailed kraft fibers, tiny frayed fibers on cut edges. No logos, no text, no people. Premium industrial editorial photography, 100mm macro.

## 3–6. Cortes do papelão (4:3, mesma luz e enquadramento nas quatro)
Base comum (cole no fim de cada prompt):
> Seen from a low angle at the cut edge so the cross-section profile is clearly visible, the sample receding diagonally from front-left to back-right. Warm off-white seamless background (#F1ECE1), soft daylight from the left, detailed kraft fibers, sharp focus on the front edge with gentle falloff. No text, no logos. Clean technical-catalog macro photography, 100mm macro, f/11.

- **3. `papelao-face-simples.png`** → *Hyperrealistic macro photograph of SINGLE-FACE corrugated cardboard: exactly ONE flat kraft liner on the bottom with ONE wavy fluted medium glued on top, flutes exposed on top (no top liner).* + base
- **4. `papelao-parede-simples.png`** → *Hyperrealistic macro photograph of SINGLE-WALL corrugated board: exactly TWO flat kraft liners (top and bottom) with exactly ONE row of wavy flutes between them.* + base
- **5. `papelao-parede-dupla.png`** → *Hyperrealistic macro photograph of DOUBLE-WALL corrugated board: exactly THREE flat kraft liners and exactly TWO rows of wavy flutes, alternating liner–flute–liner–flute–liner.* + base
- **6. `papelao-parede-tripla.png`** → *Hyperrealistic macro photograph of TRIPLE-WALL heavy-duty corrugated board: exactly FOUR flat kraft liners and exactly THREE rows of wavy flutes, alternating liner–flute–liner–flute–liner–flute–liner.* + base

> Dica: confira a contagem de capas e miolos em cada imagem — o modelo às vezes erra. Se errar, peça "count the layers: N liners, M fluted rows" na mesma conversa.

---

## Substituições recomendadas pela revisão de fotos

Base comum para 7–14 (cole no fim): 
> Hyperrealistic documentary photograph inside a modern Brazilian corrugated packaging factory, clean and well lit, natural daylight from skylights mixed with soft industrial light, true-to-life colors, 35mm lens, f/4, sharp subject, gentle background blur. Brand palette accents only where natural (navy blue #14395A and green #2A7654 machinery or uniforms). No readable text, no logos except a plain green uniform, no client brands.

- **7. `operador-maquina.png` (16:9 e quadrada, gere 16:9)** → *A male operator in a plain green polo shirt and red ear defenders feeding a stack of kraft corrugated sheets into the feeder of a large flexographic printer-slotter; face visible in three-quarter profile, centered-left, machine filling the right side.* + base
- **8. `operadora-expedicao.png` (1:1)** → *A smiling female worker in a plain green polo, hairnet and ear defenders leaning with both forearms on a pallet stacked with flat printed corrugated box blanks (generic two-color artwork, no readable text), eye level, centered.* + base
- **9. `operador-caixas.png` (4:3)** → *A young male worker in a plain green polo carrying three plain kraft corrugated boxes in the shipping area, pallets and stretch-wrapped loads behind him, subject centered, head and torso fully in frame.* + base
- **10. `caixas-esteira.png` (21:9)** → *A strapped stack of flat kraft corrugated box blanks moving on a blue roller conveyor, shallow depth of field, more stacks and a stacker machine softly blurred behind, wide cinematic composition with the stack slightly left of center.* + base
- **11. `produtos-flexografia.png` (4:5)** → *A production table at the end of a flexo line with neatly stacked kraft and white corrugated boxes printed in one to three solid colors (generic simple icons, arrows "this side up" symbols, no readable brand names), a few assembled boxes in front, factory softly blurred behind.* + base
- **12. `produtos-policromia.png` (4:5)** → *A showroom table with premium full-color printed corrugated retail packaging: a bakery box with handle, a pizza box, a display stand and a gift box, vibrant photographic artwork with abstract patterns and no readable text, soft studio light, factory window behind.* + base
- **13. `eucalipto-drone.png` (16:9)** → *Aerial drone photograph at golden hour of a eucalyptus plantation in Goiás, Brazil: long straight rows of tall eucalyptus trees, red-earth access roads, native cerrado vegetation patch at the edge, warm light, high detail.* (sem a base da fábrica)
- **14. `eucalipto-viveiro.png` (4:3)** → *A eucalyptus seedling nursery: rows of young seedlings in black tubes on raised benches under shade netting, morning light, shallow depth of field.* (sem a base da fábrica)

**Também ajuda (sem gerar):** exportar dos vídeos do YouTube um quadro 1920×1080 limpo para as capas `capa-institucional.png` e `capa-30-anos.png`.

### Como entregar
Coloque os arquivos com esses nomes em `07_CODIGO_FONTE/src/assets/gerado/` (ou me envie aqui). As imagens 2–6 entram sozinhas na seção "Tipos de papelão"; as demais eu ligo nas páginas assim que chegarem.
