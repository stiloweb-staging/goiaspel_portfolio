import { chromium } from 'playwright-core';
const b = await chromium.launch({ channel: 'msedge' });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript(() => sessionStorage.setItem('gp-intro', '1'));
const p = await ctx.newPage();
const seen = new Set();
for (const u of ['/', '/conheca-a-goiaspel-embalagens-de-papelao/', '/know-how-e-infraestrutura-goiaspel/', '/valores-e-missao-goiaspel/', '/videos-da-goiaspel/', '/seja-um-fornecedor-da-goiaspel/']) {
  await p.goto('http://localhost:4322' + u, { waitUntil: 'load' });
  const f = p.locator('.cta-photo').last();
  await f.scrollIntoViewIfNeeded(); await p.waitForTimeout(1200);
  const src = await f.locator('img').evaluate((i) => i.currentSrc.split('/').pop().split('.')[0]);
  if (seen.has(src)) continue; seen.add(src);
  await p.locator('.cta').last().screenshot({ path: `qa/output/cta-${seen.size}.png` });
  console.log(seen.size, u, src);
}
await b.close();
