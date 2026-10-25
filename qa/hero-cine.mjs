// Hero cinematográfico: estado final (movimento reduzido) em várias larguras + quadros da coreografia.
import { chromium } from 'playwright-core';
const BASE = process.argv[2] ?? 'http://localhost:4322';
const OUT = process.argv[3] ?? 'qa/output';
const b = await chromium.launch({ channel: 'msedge' });
for (const w of [390, 768, 1024, 1440, 1920]) {
  const p = await (await b.newContext({ viewport: { width: w, height: w < 600 ? 844 : (w === 1920 ? 1080 : 900) }, reducedMotion: 'reduce' })).newPage();
  await p.goto(BASE + '/', { waitUntil: 'networkidle' });
  const info = await p.evaluate(() => ({
    ox: document.documentElement.scrollWidth - innerWidth,
    hero: Math.round(document.querySelector('.hero-cine').getBoundingClientRect().height),
    labelsBottom: Math.round(document.querySelector('.labels').getBoundingClientRect().bottom),
  }));
  console.log(w, JSON.stringify(info));
  await p.screenshot({ path: `${OUT}/hero-cine-${w}.png`, fullPage: w < 600 });
  await p.close();
}
// quadros da animação (1440)
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto(BASE + '/', { waitUntil: 'load' });
const t0 = Date.now();
for (const t of [800, 5900, 6050, 6300, 7600]) {
  await p.waitForTimeout(Math.max(0, t - (Date.now() - t0)));
  await p.screenshot({ path: `${OUT}/hero-cine-t${String(t / 1000).replace('.', '_')}s.png` });
}
await b.close();
