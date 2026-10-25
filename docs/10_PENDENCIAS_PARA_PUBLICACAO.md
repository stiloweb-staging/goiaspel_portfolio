# 10 — Pendências para publicação

Nada foi publicado no domínio oficial. Itens marcados como **bloqueante** precisam ser resolvidos antes de desativar a homologação (`PUBLIC_STAGING=false`).

## A. Dados institucionais (validação da Goiaspel)

| # | Item | Onde | Bloqueante |
|---|---|---|---|
| A1 | Período de “1.500 t+ de capacidade produtiva” (mensal? anual?) | `src/data/conteudo.ts` → `indicadores` | **Sim** |
| A2 | “500 caixas por minuto”: capacidade nominal de uma linha ou do parque? | idem | **Sim** |
| A3 | “35 anos” do PDF × fundação em maio de 1992 (o site calcula automaticamente: 34 em 2026) | `site.ts` → `foundingDate` | Sim |
| A4 | Redação “Indústria 4ª sede própria” (PDF p. 2) — não usada | — | Não |
| A5 | Aparas “100%” reaproveitadas; água tratada e reutilizada (detalhar sistema) | `praticasAmbientais` | Sim |
| A6 | Pedido mínimo (o site antigo dizia R$ 2.500,00 por referência) | `/duvidas/` | **Sim** |
| A7 | Medidas padrão a pronta entrega ainda disponíveis? | `/duvidas/` | Sim |
| A8 | Flexografia “até 3 cores” — confirmar o limite técnico atual | `solucoes` | Sim |
| A9 | Razão social completa e CNPJ (rodapé e privacidade) | `site.ts` → `legalName`; `Footer` | **Sim** |
| A10 | Reflorestamento de eucalipto do grupo — ainda vigente? | `/sustentabilidade/` | Sim |
| A11 | Dados da Eucaflora (telefone (62) 3205-8060, garantia de 15 anos, produtos) | `/eucaflora/` | Sim |
| A12 | WhatsApp: confirmar que (62) 4008-8930 recebe mensagens (link do PDF) | `site.ts` → `whatsapp` | **Sim** |

## B. Permissões e direitos

| # | Item | Bloqueante |
|---|---|---|
| B1 | Autorização de uso das 18 marcas clientes → depois, `CLIENTES_AUTORIZADOS = true` em `conteudo.ts` | **Sim** (sem autorização a seção some automaticamente em produção) |
| B2 | Marcas visíveis nas fotos de produto (Bosch, Imperial, Europa Pães, Zupp etc.) | Sim |
| B3 | Direito de imagem dos colaboradores fotografados (PDF p. 2, 3, 10) | Sim |
| B4 | Origem da foto da impressora (PDF p. 3, aparência de banco de imagens) — licença ou substituição | Sim |
| B5 | Política de privacidade: **revisão jurídica** da minuta | **Sim** |

## C. Assets

| # | Item |
|---|---|
| C1 | **Logo Goiaspel em SVG** (hoje um recorte raster do PDF com fundo removido) |
| C2 | Logos vetoriais dos clientes |
| C3 | Aprovar as poses do mascote geradas no FLORA (`08_ASSETS/mascote/`) e confirmar a titularidade/registro do personagem. O projeto no FLORA (“Goiaspel — Hero com mascote”) está visível para o workspace |
| C4 | Sessão fotográfica: máquinas (impressora, coladeira, onduladeira), produtos em alta resolução (substituir as 54 fotos de ~375 px), equipe técnica em campo |
| C5 | Vídeo curto da linha de produção (opcional, para o hero ou para Estrutura) |

## D. Integrações

| # | Item | Bloqueante |
|---|---|---|
| D1 | Endpoint dos formulários (`PUBLIC_LEAD_ENDPOINT`) — escolher entre Formspree, Web3Forms, função própria ou CRM (ver doc 06) e definir o destinatário (comercial@? atendimento@?) | **Sim** |
| D2 | Anexos: confirmar que o serviço escolhido aceita arquivo de até 10 MB | Sim |
| D3 | Analytics com banner de consentimento (GA4 ou Plausible) — não instalado | Não |
| D4 | Google Search Console + envio do `sitemap-index.xml` | Na publicação |

## E. Procedimento de publicação (reversível)

1. **Homologação:** publicar `dist/` em `novo.goiaspel.com.br` (ou Netlify/Vercel/Cloudflare Pages) com `PUBLIC_STAGING=true` (`noindex`). A Goiaspel valida conteúdo e formulários.
2. **Backup:** cópia completa do site atual (`/site/` + banco de dados/PHP dos formulários) e do DNS.
3. **Build de produção:** `.env` com `PUBLIC_STAGING=false` e `PUBLIC_LEAD_ENDPOINT=…` → `npm run build`.
4. **Publicação:** subir `dist/` na raiz (Apache — o `.htaccess` traz os 301 de `/site/...` e das URLs antigas, cache e página 404). Em Nginx/CDN, converter as regras de `src/data/redirects.mjs`.
5. **Verificação pós-publicação (primeira hora):** amostra dos 301 (`curl -I`), envio real de cada formulário, Search Console (cobertura e sitemap), PageSpeed em URL real.
6. **Rollback:** restaurar o backup do passo 2 (ou apontar o DNS/document root de volta). Os 301 deixam de existir junto com o `.htaccess` novo, então as URLs antigas voltam a funcionar imediatamente.

**Não autorizado sem aprovação:** alterar o site de produção, excluir o site antigo, mudar o DNS.
