import { chromium } from 'playwright-core';
const b = await chromium.launch({ channel: 'msedge' });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto('http://localhost:4322/conheca-a-goiaspel-embalagens-de-papelao/', { waitUntil: 'load' });
for (const n of [0, 1, 2]) {
  await p.click(`[data-mega-trigger] >> nth=${n}`);
  await p.waitForTimeout(600);
  const card = p.locator('.mega-feat:visible').first();
  await card.screenshot({ path: `qa/output/mega-card-${n + 1}.png` });
  // texto não pode sair da área azul nem do cartão
  console.log(n + 1, await card.evaluate((el) => { const c = el.getBoundingClientRect(), t = el.querySelector('.mf-top'); return [...t.children].every((k) => { const r = k.getBoundingClientRect(); return r.top >= c.top && r.bottom <= t.getBoundingClientRect().bottom + 1; }); }));
  await p.keyboard.press('Escape');
  await p.waitForTimeout(300);
}
await b.close();
