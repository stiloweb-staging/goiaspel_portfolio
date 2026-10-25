/**
 * Auditoria automatizada do site construído (astro build + astro preview).
 * - Capturas full-page em 360/390/768/1024/1440/1920 px (movimento reduzido = estado final)
 * - Rolagem horizontal indesejada, imagens sem alt, erros de console, links internos quebrados
 * - axe-core (WCAG 2.0/2.1/2.2 A e AA)
 * - Verificação do caminho COM animação: após rolar a página, nada pode ficar invisível
 *
 * Uso: node qa/audit.mjs [baseUrl] [pastaSaida]
 * Requer Microsoft Edge (canal "msedge") — nenhum navegador é baixado.
 */
import { chromium } from 'playwright-core';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');

const BASE = process.argv[2] ?? 'http://localhost:4322';
const OUT = process.argv[3] ?? 'qa/output';
const PAGES = ['/', '/conheca-a-goiaspel-embalagens-de-papelao/', '/valores-e-missao-goiaspel/', '/cultura-e-relacionamento-goiaspel/', '/responsabilidade-ambiental-goiaspel/', '/know-how-e-infraestrutura-goiaspel/', '/seja-um-fornecedor-da-goiaspel/', '/videos-da-goiaspel/', '/produtos-goiaspel-embalagens-de-papelao/', '/produtos-goiaspel/caixa-em-flexografia/', '/produtos-goiaspel/caixa-em-policromia/', '/produtos-goiaspel/caixas-especiais/', '/produtos-goiaspel/acessorios-de-papelao/', '/criacao-de-layout-e-amostras-de-produtos/', '/tire-suas-duvidas-sobre-nossos-produtos-goiaspel/', '/dicas-e-curiosidades-goiaspel/', '/canais-de-contato-com-a-goiaspel/', '/eucaflora-uma-empresa-do-grupo-goiaspel/', '/orcamento/', '/privacidade/', '/nao-existe/'];
const WIDTHS = [360, 390, 768, 1024, 1440, 1920];
const SHOT_WIDTHS = new Set([390, 1440]); // capturas full-page arquivadas
mkdirSync(OUT, { recursive: true });

let browser;
const report = { base: BASE, date: new Date().toISOString(), pages: [] };
const linkSet = new Set();

for (const path of PAGES) {
  // um navegador por página: capturas full-page longas esgotam a memória do renderer
  browser = await chromium.launch({ channel: 'msedge' });
  const entry = { path, widths: {}, axe: null, motion: null };
  for (const width of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce', deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    page.on('pageerror', (e) => errors.push(String(e)));
    const res = await page.goto(BASE + path, { waitUntil: 'load', timeout: 60000 });
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    const metrics = await page.evaluate(() => {
      const de = document.documentElement;
      const wide = [...document.querySelectorAll('body *')]
        .filter((el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.right > innerWidth + 1 && getComputedStyle(el).position !== 'fixed'; })
        .slice(0, 5)
        .map((el) => `${el.tagName.toLowerCase()}.${[...el.classList].join('.')}`);
      return {
        overflowX: de.scrollWidth - innerWidth,
        wide,
        imgNoAlt: [...document.images].filter((i) => !i.hasAttribute('alt')).length,
        brokenImg: [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && i.loading !== 'lazy').length,
        h1: document.querySelectorAll('h1').length,
        height: de.scrollHeight,
        links: [...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href')),
        smallTargets: [...document.querySelectorAll('a, button, input, select, summary')]
          .filter((el) => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && s.display !== 'inline' && (r.height < 24 || r.width < 24) && !el.closest('.hp-field, .sr-only'); })
          .map((el) => el.outerHTML.slice(0, 80)).slice(0, 5),
      };
    });
    metrics.links.forEach((l) => linkSet.add(l.split('#')[0]));
    delete metrics.links;
    entry.widths[width] = { status: res?.status(), errors, ...metrics };
    if (SHOT_WIDTHS.has(width)) {
      // carrega as imagens lazy antes da captura full-page
      await page.evaluate(() => document.querySelectorAll('img[loading="lazy"]').forEach((i) => { i.loading = 'eager'; }));
      await page.waitForFunction(() => [...document.images].every((i) => i.complete), null, { timeout: 15000 }).catch(() => {});
      // percorre a página para forçar a decodificação/pintura antes da captura full-page
      await page.evaluate(async () => {
        document.documentElement.style.scrollBehavior = 'auto';
        for (let y = 0; y < document.body.scrollHeight; y += 700) { scrollTo(0, y); await new Promise((r) => requestAnimationFrame(() => setTimeout(r, 80))); }
        scrollTo(0, 0);
      });
      await page.waitForTimeout(500);
      await page.waitForLoadState('networkidle');
      const name = (path === '/' ? 'inicio' : path.replace(/^\/|\/$/g, '').replaceAll('/', '_').slice(0, 40)) + `-${width}.png`;
      await page.screenshot({ path: `${OUT}/${name}`, fullPage: true });
    }
    if (width === 1440) {
      await page.addScriptTag({ content: axeSource });
      entry.axe = await page.evaluate(async () => {
        const r = await window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] });
        return r.violations.map((v) => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.length, sample: v.nodes[0]?.target?.join(' ') }));
      });
    }
    await ctx.close();
  }

  // Caminho com animação: rola até o fim e confere que nenhum elemento animado ficou oculto
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + path, { waitUntil: 'load', timeout: 60000 });
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto';
    for (let y = 0; y < document.body.scrollHeight; y += 400) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
    await new Promise((r) => setTimeout(r, 1800));
  });
  entry.motion = await page.evaluate(() => {
    const hidden = [...document.querySelectorAll('[data-reveal], .kinetic, [data-flute]')].filter((el) => !el.classList.contains('is-in'));
    return { total: document.querySelectorAll('[data-reveal], .kinetic, [data-flute]').length, notRevealed: hidden.length, sample: hidden.slice(0, 3).map((e) => e.className) };
  });
  await ctx.close();
  report.pages.push(entry);
  await browser.close();
  console.log(`✓ ${path}`);
}

// Links internos
browser = await chromium.launch({ channel: 'msedge' });
const ctx = await browser.newContext();
const req = ctx.request;
report.links = {};
for (const l of linkSet) {
  const r = await req.get(BASE + l, { maxRedirects: 0 }).catch(() => null);
  report.links[l] = r?.status() ?? 'erro';
}
await browser.close();

writeFileSync(`${OUT}/audit.json`, JSON.stringify(report, null, 2));
// Resumo no terminal
for (const p of report.pages) {
  const issues = Object.entries(p.widths).filter(([, m]) => m.overflowX > 0 || m.errors.length || m.imgNoAlt || m.brokenImg || m.h1 !== 1);
  console.log(`${p.path}  axe:${p.axe.length}  motion-hidden:${p.motion.notRevealed}/${p.motion.total}  width-issues:${issues.map(([w, m]) => `${w}(ox=${m.overflowX},err=${m.errors.length},h1=${m.h1},wide=${m.wide.join('|')})`).join(' ') || 'nenhum'}`);
  p.axe.forEach((v) => console.log(`   axe ${v.impact} ${v.id} x${v.nodes} — ${v.help} @ ${v.sample}`));
  const st = p.widths[390].smallTargets; if (st.length) console.log('   alvos <24px @390:', st.join(' || '));
}
const bad = Object.entries(report.links).filter(([, s]) => s !== 200);
console.log('links internos verificados:', Object.keys(report.links).length, 'problemas:', JSON.stringify(bad));
