/**
 * Caminhos do site — IDÊNTICOS aos do site original (goiaspel.com.br), para preservar
 * links, favoritos e o histórico de busca. Fonte única para menu, rodapé e links internos.
 * O site antigo também respondia com o prefixo /site/; esse prefixo vira 301 para a raiz (.htaccess).
 */
export const R = {
  home: '/',
  quemSomos: '/conheca-a-goiaspel-embalagens-de-papelao/',
  valores: '/valores-e-missao-goiaspel/',
  cultura: '/cultura-e-relacionamento-goiaspel/',
  ambiental: '/responsabilidade-ambiental-goiaspel/',
  knowHow: '/know-how-e-infraestrutura-goiaspel/',
  fornecedores: '/seja-um-fornecedor-da-goiaspel/',
  videos: '/videos-da-goiaspel/',
  produtos: '/produtos-goiaspel-embalagens-de-papelao/',
  flexografia: '/produtos-goiaspel/caixa-em-flexografia/',
  policromia: '/produtos-goiaspel/caixa-em-policromia/',
  especiais: '/produtos-goiaspel/caixas-especiais/',
  acessorios: '/produtos-goiaspel/acessorios-de-papelao/',
  layout: '/criacao-de-layout-e-amostras-de-produtos/',
  duvidas: '/tire-suas-duvidas-sobre-nossos-produtos-goiaspel/',
  dicas: '/dicas-e-curiosidades-goiaspel/',
  contato: '/canais-de-contato-com-a-goiaspel/',
  eucaflora: '/eucaflora-uma-empresa-do-grupo-goiaspel/',
  // novas
  orcamento: '/orcamento/',
  privacidade: '/privacidade/',
} as const;

/** Menu principal com a mesma estrutura do site original, agora em mega-menu. */
export const menu = [
  {
    label: 'A Goiaspel',
    destaque: { titulo: 'Desde 1992 em Goiânia', texto: 'Pioneira em embalagens de papelão ondulado na região.', href: R.quemSomos },
    itens: [
      { href: R.quemSomos, label: 'Quem somos', desc: 'Fundação, crescimento e o parque de 11.000 m²' },
      { href: R.valores, label: 'Valores e missão', desc: 'Os preceitos que orientam o trabalho' },
      { href: R.cultura, label: 'Cultura de relacionamento', desc: 'Proximidade com clientes e parceiros' },
      { href: R.ambiental, label: 'Responsabilidade ambiental', desc: 'Energia solar, água e aparas' },
      { href: R.knowHow, label: 'Know-how e infraestrutura', desc: 'Tecnologia, processo, logística e assistência' },
      { href: R.fornecedores, label: 'Fornecedores', desc: 'Cadastre sua empresa' },
      { href: R.videos, label: 'Vídeos', desc: 'Institucional e 30 anos' },
    ],
  },
  {
    label: 'Produtos e serviços',
    destaque: { titulo: '54 embalagens no portfólio', texto: 'Flexografia, policromia, especiais e acessórios.', href: R.produtos },
    itens: [
      { href: R.produtos, label: 'Todos os produtos', desc: 'Linha completa sob medida' },
      { href: R.flexografia, label: 'Caixa em flexografia', desc: 'Impressão direta em até 3 cores' },
      { href: R.policromia, label: 'Caixa em policromia', desc: 'Reprodução fotográfica' },
      { href: R.especiais, label: 'Caixas especiais', desc: 'Kits, expositores, datas comemorativas' },
      { href: R.acessorios, label: 'Acessórios', desc: 'Divisórias, chapas e calços' },
      { href: R.layout, label: 'Criação de layout e amostras', desc: 'Arte e amostra antes da produção' },
    ],
  },
  {
    label: 'Goiaspel responde',
    destaque: { titulo: 'Como medir sua caixa', texto: 'C × L × A, sempre por dentro, em milímetros.', href: `${R.duvidas}#medir` },
    itens: [
      { href: R.duvidas, label: 'Sobre produtos', desc: 'Tipos de papelão, ondas e perguntas frequentes' },
      { href: R.dicas, label: 'Dicas e curiosidades', desc: 'Novas utilidades para a sua caixa' },
    ],
  },
] as const;
