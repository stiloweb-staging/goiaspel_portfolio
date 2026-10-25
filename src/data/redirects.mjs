// Os caminhos do site novo são os MESMOS do site original (ver src/data/rotas.ts).
// O site antigo também respondia com o prefixo /site/ (por causa de <base href="/site/">):
// esses endereços viram 301 para a raiz. Em produção, as regras ficam no public/.htaccess;
// aqui fica o fallback estático do Astro para cada página original.
const originais = [
  '/conheca-a-goiaspel-embalagens-de-papelao/',
  '/valores-e-missao-goiaspel/',
  '/cultura-e-relacionamento-goiaspel/',
  '/responsabilidade-ambiental-goiaspel/',
  '/know-how-e-infraestrutura-goiaspel/',
  '/seja-um-fornecedor-da-goiaspel/',
  '/videos-da-goiaspel/',
  '/produtos-goiaspel-embalagens-de-papelao/',
  '/produtos-goiaspel/caixa-em-flexografia/',
  '/produtos-goiaspel/caixa-em-policromia/',
  '/produtos-goiaspel/caixas-especiais/',
  '/produtos-goiaspel/acessorios-de-papelao/',
  '/criacao-de-layout-e-amostras-de-produtos/',
  '/tire-suas-duvidas-sobre-nossos-produtos-goiaspel/',
  '/dicas-e-curiosidades-goiaspel/',
  '/canais-de-contato-com-a-goiaspel/',
  '/eucaflora-uma-empresa-do-grupo-goiaspel/',
];

/** @type {Record<string, string>} */
export const redirects = { '/site/': '/' };
for (const p of originais) redirects[`/site${p}`] = p;
// páginas PHP antigas que não tinham link no menu
redirects['/site/servicos.php'] = '/know-how-e-infraestrutura-goiaspel/#logistica';
redirects['/site/clientes.php'] = '/#clientes';
redirects['/site/formulario_ligamos_voce.php'] = '/canais-de-contato-com-a-goiaspel/#nos-ligamos';

export const paginasOriginais = originais;
