// Capturas de viewport em posições definidas: node qa/shots.mjs url largura pasta y1,y2,...
import { chromium } from 'playwright-core';
const [url, w, out, ys] = process.argv.slice(2);
const b = await chromium.launch({ channel: 'msedge' });
const p = await (await b.newContext({ viewport: { width: +w, height: +w < 600 ? 844 : 900 }, reducedMotion: 'reduce' })).newPage();
await p.goto(url, { waitUntil: 'load' });
await p.evaluate(() => document.querySelectorAll('img[loading="lazy"]').forEach((i) => (i.loading = 'eager')));
await p.waitForTimeout(1500);
for (const y of ys.split(',')) {
  const top = y.startsWith('#') ? await p.evaluate((s) => document.querySelector(s).getBoundingClientRect().top + scrollY - 80, y) : +y;
  await p.evaluate((t) => { document.documentElement.style.scrollBehavior = 'auto'; scrollTo(0, t); }, top);
  await p.waitForTimeout(400);
  await p.screenshot({ path: `${out}/s-${w}-${y.replace(/[#.]/g, '')}.png` });
}
await b.close();
