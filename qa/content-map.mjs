// Gera docs/MAPA_DE_CONTEUDO.md a partir da build (dist/): para cada página, título, descrição,
// H1, seções (H2), chamadas para ação e links internos. Rodar depois de `npm run build:fast`:
//   node qa/content-map.mjs
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, sep } from 'node:path';

const DIST = 'dist';
const OUT = process.argv[2] || 'docs/MAPA_DE_CONTEUDO.md';
const strip = (h) => h.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&#x27;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
const pages = [];
const walk = (d) => readdirSync(d).forEach((f) => {
  const p = join(d, f);
  if (statSync(p).isDirectory()) walk(p);
  else if (f === 'index.html' || f === '404.html') pages.push(p);
});
walk(DIST);

const rows = pages
  .map((file) => {
    const html = readFileSync(file, 'utf8');
    if (/http-equiv="refresh"/.test(html)) return null; // redirecionamentos /site/...
    let route = '/' + file.slice(DIST.length + 1).split(sep).join('/').replace(/index\.html$/, '');
    if (route.endsWith('404.html')) route = '/404';
    const main = (html.match(/<main[\s\S]*?<\/main>/) || [html])[0];
    const title = strip((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '');
    const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
    const h1 = strip((main.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '');
    const h2 = [...main.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => strip(m[1])).filter(Boolean);
    const links = [...new Set([...main.matchAll(/href="(\/[^"#?]*)/g)].map((m) => m[1]))].filter((u) => u !== route).sort();
    const ctas = [];
    if (/href="\/orcamento\/"/.test(main)) ctas.push('Solicitar orçamento');
    if (/wa\.me|api\.whatsapp/.test(main)) ctas.push('WhatsApp');
    if (/href="tel:/.test(main)) ctas.push('Telefone');
    if (/href="mailto:/.test(main)) ctas.push('E-mail');
    if (/<form/.test(main)) ctas.push('Formulário');
    if (/youtube/.test(main)) ctas.push('Vídeo');
    return { route, title, desc, h1, h2, links, ctas };
  })
  .filter(Boolean)
  .sort((a, b) => (a.route === '/' ? -1 : b.route === '/' ? 1 : a.route.localeCompare(b.route)));

const esc = (s) => s.replace(/\|/g, '\|');
let md = `# Mapa de conteúdo do site\n\n`;
md += `> Gerado automaticamente por \`07_CODIGO_FONTE/qa/content-map.mjs\` a partir da build. Não editar à mão: rode o script de novo após mudar páginas.\n\n`;
md += `**${rows.length} páginas** · caminhos idênticos aos do site original (goiaspel.com.br), mais \`/orcamento/\` e \`/privacidade/\`.\n\n`;
md += `## Árvore de navegação\n\n\`\`\`mermaid\nflowchart LR\n`;
md += `  H["Início /"]\n`;
md += `  H --> G1["A Goiaspel"]\n  H --> G2["Produtos e serviços"]\n  H --> G3["Goiaspel responde"]\n  H --> C["Fale conosco"]\n  H --> O["Solicitar orçamento"]\n`;
const groups = {
  G1: ['/conheca-a-goiaspel-embalagens-de-papelao/', '/valores-e-missao-goiaspel/', '/cultura-e-relacionamento-goiaspel/', '/responsabilidade-ambiental-goiaspel/', '/know-how-e-infraestrutura-goiaspel/', '/seja-um-fornecedor-da-goiaspel/', '/videos-da-goiaspel/'],
  G2: ['/produtos-goiaspel-embalagens-de-papelao/', '/produtos-goiaspel/caixa-em-flexografia/', '/produtos-goiaspel/caixa-em-policromia/', '/produtos-goiaspel/caixas-especiais/', '/produtos-goiaspel/acessorios-de-papelao/', '/criacao-de-layout-e-amostras-de-produtos/'],
  G3: ['/tire-suas-duvidas-sobre-nossos-produtos-goiaspel/', '/dicas-e-curiosidades-goiaspel/'],
  C: ['/canais-de-contato-com-a-goiaspel/'],
  O: ['/orcamento/'],
};
let i = 0;
for (const [g, routes] of Object.entries(groups)) for (const r of routes) {
  const row = rows.find((x) => x.route === r);
  const label = row ? (row.h1 || row.title.split('|')[0]).replace(/"/g, "'") : r;
  md += `  ${g} --> P${++i}["${label}<br/><small>${r}</small>"]\n`;
}
md += `  H -.-> E["Eucaflora"]\n  H -.-> PR["Privacidade"]\n\`\`\`\n\n`;
md += `## Resumo\n\n| Página | H1 | Seções | Chamadas |\n|---|---|---:|---|\n`;
for (const r of rows) md += `| \`${r.route}\` | ${esc(r.h1)} | ${r.h2.length} | ${r.ctas.join(', ')} |\n`;
md += `\n## Páginas em detalhe\n`;
for (const r of rows) {
  md += `\n### \`${r.route}\`\n\n- **Título (SEO):** ${esc(r.title)}\n- **Descrição:** ${esc(r.desc)}\n- **H1:** ${esc(r.h1)}\n`;
  if (r.h2.length) md += `- **Seções (H2):**\n${r.h2.map((h) => `  - ${esc(h)}`).join('\n')}\n`;
  if (r.ctas.length) md += `- **Chamadas para ação:** ${r.ctas.join(' · ')}\n`;
  if (r.links.length) md += `- **Leva para:** ${r.links.map((l) => `\`${l}\``).join(', ')}\n`;
}
writeFileSync(OUT, md);
console.log(`${rows.length} páginas → ${OUT}`);
