# 03 — Estratégia e sitemap

## Posicionamento

> **Uma indústria que não entrega apenas caixas, mas embalagens desenvolvidas para proteger produtos, fortalecer marcas e apoiar a operação do cliente.**

Pilares, com a prova de cada um no site:

| Pilar | Prova |
|---|---|
| Capacidade industrial | Foto aérea real, 11.000 m², indicadores, processo produtivo |
| Personalização | Flexografia × policromia, portfólio de 54 embalagens, setor de layout e amostras |
| Qualidade | Controle de qualidade, treinamento, etapa de validação |
| Relacionamento técnico | Assistência técnica pós-venda, processo em 5 etapas, “nós ligamos” |
| Responsabilidade ambiental | Energia solar, água, aparas, seção de transparência |
| Credibilidade | Desde 1992, linha do tempo, 18 marcas clientes, vídeos |

**Tom de voz:** seguro, objetivo, consultivo. Frases curtas, verbos concretos, nada de superlativos sem prova.

## Públicos e jornadas

1. **Comprador/suprimentos (decisão):** Home → Soluções → Orçamento. CTA “Solicitar orçamento” no header, em cada solução (com `?tipo=` pré-selecionado), no CTA final e na barra fixa do celular.
2. **Gestor/dono de indústria (confiança):** Home → Estrutura → Sobre → Orçamento.
3. **Marketing (marca):** Home → Policromia → Portfólio → Orçamento.
4. **Contato rápido:** WhatsApp (barra no celular, CTA final, Contato) ou “Nós ligamos para você”.
5. **Secundários:** fornecedores, dúvidas técnicas, dicas, Eucaflora — no rodapé e no menu do celular, fora do menu principal.

## Sitemap — caminhos idênticos aos do site original

Decisão (out/2026, a pedido do cliente): **redesign página a página, nos mesmos endereços** do site antigo. Nada de URL nova para conteúdo que já existia; o menu mantém a estrutura original (A Goiaspel · Produtos e serviços · Goiaspel responde · Fale conosco), agora como mega-menu.

```
/                                                   Início (hero em vídeo + carimbos)
A Goiaspel
├── /conheca-a-goiaspel-embalagens-de-papelao/      Quem somos (trajetória 1992→hoje, vídeo institucional, clientes)
├── /valores-e-missao-goiaspel/                     Valores e missão
├── /cultura-e-relacionamento-goiaspel/             Cultura de relacionamento
├── /responsabilidade-ambiental-goiaspel/           Responsabilidade ambiental
├── /know-how-e-infraestrutura-goiaspel/            Know-how e infraestrutura (+ #logistica, ex-/site/servicos.php; + #assistencia)
├── /seja-um-fornecedor-da-goiaspel/                Fornecedores
└── /videos-da-goiaspel/                            Vídeos
Produtos e serviços
├── /produtos-goiaspel-embalagens-de-papelao/       Produtos (visão geral, portfólio de 54, guia de ondas)
├── /produtos-goiaspel/caixa-em-flexografia/        Caixa em flexografia
├── /produtos-goiaspel/caixa-em-policromia/         Caixa em policromia
├── /produtos-goiaspel/caixas-especiais/            Caixas especiais
├── /produtos-goiaspel/acessorios-de-papelao/       Acessórios
└── /criacao-de-layout-e-amostras-de-produtos/      Criação de layout e amostras
Goiaspel responde
├── /tire-suas-duvidas-sobre-nossos-produtos-goiaspel/  Sobre produtos (FAQ, como medir, tipos de papelão)
└── /dicas-e-curiosidades-goiaspel/                 Dicas e curiosidades
/canais-de-contato-com-a-goiaspel/                  Fale conosco (+ #nos-ligamos)
/eucaflora-uma-empresa-do-grupo-goiaspel/           Empresa do grupo
/orcamento/   /privacidade/   /404                  Novas
```

Redirecionamentos: apenas o prefixo antigo `/site/...` → mesma página na raiz, e as páginas PHP sem menu (`/site/servicos.php` → `#logistica`, `/site/clientes.php` → `/#clientes`, `/site/formulario_ligamos_voce.php` → `#nos-ligamos`). Fonte única: `src/data/rotas.ts` + `src/data/redirects.mjs`.

## Hierarquia da home

0. Hero — proposta de valor + 2 CTAs + foto real + fatos (desde 1992, 11.000 m², flexo/policromia, pós-venda)
1. Soluções que ganham forma — flexografia / policromia, faixa do portfólio, especiais e acessórios
2. Precisão que ganha escala — chapas com os indicadores
3. Da necessidade à solução — 5 etapas
4. Setores — lista interativa com fotos reais
5. Compromisso ambiental
6. Assistência técnica
7. Nossa história + vídeo de 30 anos
8. Clientes (marquee)
9. CTA final “Vamos desenvolver sua próxima embalagem?”

## Conversão

- Formulário de orçamento em página única, com 3 blocos (você, embalagem, detalhes): mais rápido de revisar do que um fluxo em etapas e sem perda de contexto. Campos condicionais: medidas (só se “tenho as medidas”) e arte (só com impressão).
- Resumo de erros com links para cada campo, máscaras, anti-spam por honeypot e tempo mínimo, consentimento LGPD.
- **Sem integração simulada:** sem endpoint configurado, o envio oferece o resumo pronto por WhatsApp ou e-mail.
