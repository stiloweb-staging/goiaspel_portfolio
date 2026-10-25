import { chromium } from 'playwright-core';
const b = await chromium.launch({ channel: 'msedge' });
for (const w of [1440, 390]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
  await ctx.addInitScript(() => sessionStorage.setItem('gp-intro', '1'));
  const p = await ctx.newPage();
  await p.goto('http://localhost:4322/', { waitUntil: 'load' });
  for (const sel of ['section.ambiental', 'section.precisao']) {
    const s = p.locator(sel);
    await s.scrollIntoViewIfNeeded(); await p.waitForTimeout(1500);
    await s.screenshot({ path: `qa/output/${sel.split('.')[1]}-${w}.png` });
  }
}
await b.close();
