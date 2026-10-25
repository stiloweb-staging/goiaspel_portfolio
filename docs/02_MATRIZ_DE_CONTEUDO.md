# 02 — Matriz de conteúdo e conciliação

Fontes: **PDF** = apresentação “APRESENTAÇÃO GOIASPEL FINAL – LINKS CLICÁVEIS” (10 páginas); **SITE** = goiaspel.com.br (inspecionado em 25/10/2026).
Confiança: **A** = confirmada por duas fontes · **M** = uma fonte, recente · **B** = fonte antiga ou em conflito.

## 1. Indicadores

| Informação | SITE | PDF | Divergência | Usado no novo site | Confiança | Validação humana |
|---|---|---|---|---|---|---|
| Tempo de mercado | 34 anos; “fundada em maio de 1992” | 35 anos (p. 6) | Em 25/10/2026, maio de 1992 resulta em **34 anos**; 35 só a partir de maio de 2027 | **“Desde 1992”** + anos calculados automaticamente na build (`yearsSinceFounding`) | A (data) | Confirmar se o “35” do PDF conta outro marco |
| Caixas por minuto | 250 | 500, “em até 3 cores” (p. 3, 6) | Dobrou | 500, com selo **pendente** e sem contagem animada | M | Confirmar se é capacidade nominal de uma linha ou do parque |
| Capacidade produtiva | 900 t | 1.500 t+ (p. 6) | Sem período em nenhuma das fontes | 1.500 t+ “período de referência a confirmar”, com selo **pendente** | M | **Obrigatória:** período mensal ou anual? |
| Área | 11.000 m² | 11.000 m² (p. 2, 6) | — | 11.000 m² (com contagem animada) | A | — |
| Sede | “parque fabril próprio, 2015” | “Indústria 4ª sede própria” (p. 2) | O SITE descreve 4 endereços (1992, 1997, 2003, 2015), mas só 2 sedes **próprias** (2003 e 2015) | Linha do tempo com os 4 marcos; “4ª sede própria” **não** usado | B | Confirmar a redação “4ª sede própria” |

## 2. Contato

| Informação | SITE | PDF | Usado | Confiança |
|---|---|---|---|---|
| Telefone/WhatsApp | (62) 4008-8930 | (62) 4008-8930, wa.me/556240088930 | Sim | A — confirmar que o número é WhatsApp Business |
| E-mail | atendimento@ (rodapé), contato@ (`mailto` no head) | atendimento@ | atendimento@ | A |
| Endereço | Estrada 121 n.149 Qd. Ch Lt. 408/409, Chácaras de Recreio São Joaquim, 74.470-270 | Igual | Sim | A |
| Instagram / Facebook / YouTube | @goiaspelembalagens / /goiaspelembalagens / canal | Instagram, Facebook | Os três | A |
| Mapa | goo.gl/maps/fxdi6kaQ1AH2 | maps.app.goo.gl/gQ148QZRqKGqsyNV7 | Link do PDF | M |
| Eucaflora | (62) 3205-8060 | — | Sim, com selo pendente | B |

## 3. Afirmações sensíveis (greenwashing, comerciais e técnicas)

| Afirmação | Fonte | Decisão |
|---|---|---|
| “Empresa 100% movida a energia solar” | SITE | **Não publicada.** Usada a redação do PDF: “reduz o consumo da rede elétrica” |
| “Aparas 100% reaproveitadas ou destinadas à reciclagem” | PDF p. 7 | Publicada sem o “100%” e com selo pendente. Seção “O que afirmamos — e o que não” explica que reaproveitar as aparas ≠ toda embalagem é reciclada |
| Água “devolvida limpa” × “tratada e reutilizada” | SITE × PDF | Redação do PDF, com selo pendente |
| Pedido mínimo de R$ 2.500,00 por referência | SITE (FAQ 4) | **Não publicado.** “Há quantidade mínima; condições informadas pela equipe comercial”, com selo pendente |
| Medidas padrão a pronta entrega | SITE (FAQ 5) | Suavizado + selo pendente |
| Perda de “até 60%” da resistência com umidade | SITE (FAQ 6) | Mantido sem o percentual (“significativamente”) |
| Flexografia em até 3 cores | PDF p. 3–4; SITE (FAQ) | Publicado (duas fontes), com selo “especificação a validar” |
| Redução de perdas / produtividade | PDF p. 9 | Publicado **sem percentuais**; nota explícita de que os resultados variam caso a caso |

## 4. Prova social

| Item | Fonte | Uso |
|---|---|---|
| Piracanjuba, Tramontina, Coty, We Pink, Hypera Pharma, La Fruit, Zupp, Trilhas da Amazônia, Linea, Pizza Cesar | PDF p. 8 | Exibidos **somente em homologação** (`CLIENTES_AUTORIZADOS = false`) |
| Zuppani, Empório Saccaria, Window Blue, Fast Açaí, Tintas Maxvinil, Gravia, Panificadora Moreira, Grafigel | SITE | Idem — **18 marcas no total** (o site atual tinha 12) |
| Marcas nas fotos de produto (Bosch, Imperial, Europa Pães etc.) | PDF p. 4–5, SITE | Fotos de portfólio — confirmar autorização |
| Depoimentos ou cases | — | **Não criados** |

## 5. Imagens: origem e status

| Arquivo (`08_ASSETS/`) | Origem | Avaliação | Status |
|---|---|---|---|
| fabrica-aerea, fabrica-solar | PDF p. 2, 7 | Fotografias reais da sede | OK |
| equipe-atendimento, operadora-expedicao, operador-caixas | PDF p. 2, 3, 10 | Pessoas reais de uniforme | OK — confirmar uso de imagem dos colaboradores |
| flexo-*, poli-* (composições) | PDF p. 4–5 | Mockups/composições com caixas reais | OK |
| impressora-flexo | PDF p. 3 | **Aparência de banco de imagens/IA** (texto borrado na chapa) | Usada com selo “origem a confirmar” |
| assistencia-tecnica (engenheiro de capacete) | PDF p. 9 | **Aparência de banco de imagens/IA** | **Não usada** — substituída por fotos reais da equipe |
| papelao-ondas | PDF p. 1 | Render 3D | Não usada; a assinatura do papelão foi **recriada em vetor** (FluteLine) |
| site-atual/galeria (54) | SITE | Fotos reais, ~375 px | Usadas no portfólio; nova sessão de fotos recomendada |
| site-atual/dicas (8), eucaflora (4), clientes (12), mascote, capas de vídeo | SITE | Reais | Usadas |
| Logos dos clientes (PDF) | Recorte do PDF + remoção do fundo | Raster | Pedir os vetores oficiais |
| Logo Goiaspel | Recorte do PDF + remoção do fundo | Raster 660 px | **Pedir o SVG oficial** |
| texturas/ (fibra, fibra suave, miolo) | Extraídas da p. 6 do PDF (chapa kraft) e tratadas em ladrilho sem emenda | Material real da apresentação | Usadas nas chapas e nos fundos Papel |
| mascote/ (4 poses + recortes) | **Gerado no FLORA** a partir do *Guia de Estilo 2027* do cliente | Personagem ilustrado 3D, assumidamente artificial (mascote, não pessoa) | Usado no hero e na 404 — aprovar as poses com a Goiaspel |

## 6. Volume de conteúdo: site atual × novo site

| Conteúdo | Atual | Novo |
|---|---|---|
| Páginas indexáveis | 18 | 13 + âncoras (nenhum conteúdo perdido; páginas finas fundidas) |
| Fotos de produto | 54 (galerias sem legenda) | 54 com legenda, filtro e lightbox + 11 composições do PDF |
| Clientes | 12 | 18 |
| Perguntas frequentes | 6 + 2 textos | 8 + 3 curiosidades + guia de medição + tipos de papelão + tabela de ondas |
| Ideias de reaproveitamento | 8 fotos sem texto | 8 fotos com título e descrição |
| Vídeos | 2 | 2 (home + Sobre) |
| Formulários | Contato, fornecedor, “nós ligamos” (quebrado) | Orçamento estruturado, contato, “nós ligamos” (funcional), fornecedor |
| Novos | — | Processo em 5 etapas, assistência técnica, setores com fotos, transparência ambiental, política de privacidade |
