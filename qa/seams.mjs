// Captura das junções (dobras) entre seções: node qa/seams.mjs url largura pasta
import { chromium } from 'playwright-core';
const [url, w, out] = process.argv.slice(2);
const b = await chromium.launch({ channel: 'msedge' });
const p = await (await b.newContext({ viewport: { width: +w, height: 560 }, reducedMotion: 'reduce' })).newPage();
await p.goto(url, { waitUntil: 'load' });
await p.evaluate(() => document.querySelectorAll('img[loading="lazy"]').forEach((i) => (i.loading = 'eager')));
await p.waitForTimeout(1200);
const tops = await p.evaluate(() => [...document.querySelectorAll('main > section')].slice(1).map((s) => s.getBoundingClientRect().top + scrollY));
let i = 0;
for (const t of tops) {
  await p.evaluate((y) => { document.documentElement.style.scrollBehavior = 'auto'; scrollTo(0, y - 260); }, t);
  await p.waitForTimeout(350);
  await p.screenshot({ path: `${out}/seam-${w}-${String(++i).padStart(2, '0')}.png` });
}
await b.close();
