// Hero com mascote: capturas por largura + estado de hover no CTA.
import { chromium } from 'playwright-core';
const BASE = process.argv[2] ?? 'http://localhost:4322';
const OUT = process.argv[3] ?? 'qa/output';
const b = await chromium.launch({ channel: 'msedge' });
for (const w of [390, 768, 1024, 1280, 1440, 1920]) {
  const p = await (await b.newContext({ viewport: { width: w, height: w < 600 ? 844 : 900 } })).newPage();
  await p.goto(BASE + '/', { waitUntil: 'load' });
  await p.waitForTimeout(2600); // entrada + wipe concluídos
  const box = await p.evaluate(() => {
    const m = document.querySelector('.mascote').getBoundingClientRect();
    const hits = [...document.querySelectorAll('.hero-text h1, .hero-text .lead, .hero-actions .btn')].filter((el) => {
      const r = el.getBoundingClientRect(); return !(r.right < m.left || r.left > m.right || r.bottom < m.top || r.top > m.bottom);
    }).map((el) => el.className.slice(0, 30));
    return { mascote: [Math.round(m.left), Math.round(m.top), Math.round(m.width), Math.round(m.height)], sobrepoe: hits, ox: document.documentElement.scrollWidth - innerWidth };
  });
  console.log(w, JSON.stringify(box));
  if (w < 600) await p.evaluate(() => scrollTo(0, document.querySelector('.hero-media').getBoundingClientRect().top + scrollY - 120));
  await p.waitForTimeout(300);
  await p.screenshot({ path: `${OUT}/hero-mascote-${w}.png` });
  if (w === 1440) {
    await p.hover('[data-cta-primary]');
    await p.waitForTimeout(600);
    await p.screenshot({ path: `${OUT}/hero-mascote-1440-hover-cta.png` });
  }
  await p.close();
}
await b.close();
