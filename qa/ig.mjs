import { chromium } from 'playwright-core';
const b = await chromium.launch({ channel: 'msedge' });
for (const w of [1440, 390]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
  await ctx.addInitScript(() => sessionStorage.setItem('gp-intro', '1'));
  const p = await ctx.newPage();
  await p.goto('http://localhost:4322/', { waitUntil: 'load' });
  const ig = p.locator('section.ig');
  await ig.scrollIntoViewIfNeeded(); await p.waitForTimeout(1500);
  const bb = await ig.boundingBox();
  await p.screenshot({ path: `qa/output/instagram-${w}.png`, clip: { x: 0, y: Math.max(0, bb.y - 120), width: w, height: bb.height + 320 } });
}
await b.close();
