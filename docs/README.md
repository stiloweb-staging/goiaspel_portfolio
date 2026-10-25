# Documentação

Entregáveis do redesign, na ordem em que foram produzidos. Os arquivos citam a pasta `07_CODIGO_FONTE/`, que era o nome do projeto na estrutura original de entrega; neste repositório o projeto Astro está na **raiz**.

| Documento | Conteúdo |
|---|---|
| [01 · Auditoria do site atual](01_AUDITORIA_ATUAL.md) | diagnóstico técnico, visual e editorial; inventário MANTER/ATUALIZAR/FUNDIR/CRIAR |
| [02 · Matriz de conteúdo](02_MATRIZ_DE_CONTEUDO.md) | conciliação site × apresentação em PDF, grau de confiança, afirmações sensíveis, origem das imagens |
| [03 · Estratégia e sitemap](03_ESTRATEGIA_E_SITEMAP.md) | posicionamento, jornadas, sitemap com os caminhos originais, mapa de 301 |
| [04 · Direção criativa](04_DIRECAO_CRIATIVA.md) | conceitos avaliados, matriz de decisão, hero |
| [05 · Design system](05_DESIGN_SYSTEM.md) | paleta 2027, tons de seção, dobras, padrões, recortes, tipografia, motion |
| [06 · Plano de implementação](06_PLANO_DE_IMPLEMENTACAO.md) | stack, estrutura, integrações |
| [09 · Relatório de QA](09_RELATORIO_QA.md) | acessibilidade, responsividade, performance, revisão crítica |
| [10 · Pendências para publicação](10_PENDENCIAS_PARA_PUBLICACAO.md) | validações do cliente, permissões de marca, integrações, DNS, rollback |
| [11 · Prompts de imagem](11_PROMPTS_IMAGENS.md) | prompts para gerar as imagens hiper-realistas e onde salvá-las |
| [Mapa de conteúdo](MAPA_DE_CONTEUDO.md) | árvore de navegação + título, H1, seções, chamadas e links de cada página (gerado) |

## Convenções

- **Fonte única de links:** `src/data/rotas.ts`. Menu, rodapé e "Continue explorando" leem dali.
- **Conteúdo separado do layout:** textos e listas em `src/data/*.ts`; componentes só apresentam.
- **Mapa de conteúdo gerado:** `npm run build:fast && npm run content-map` sempre que uma página mudar. O arquivo não é editado à mão.
- **Commits:** mensagens no imperativo, em português, descrevendo o efeito (`Ajusta…`, `Adiciona…`, `Corrige…`).
