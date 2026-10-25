import { chromium } from 'playwright-core';
const b = await chromium.launch({ channel: 'msedge' });
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h } });
  await ctx.addInitScript(() => sessionStorage.setItem('gp-intro', '1'));
  const p = await ctx.newPage();
  for (const u of ['/', '/conheca-a-goiaspel-embalagens-de-papelao/']) {
    await p.goto('http://localhost:4322' + u, { waitUntil: 'load' });
    const cta = p.locator('section.cta');
    await cta.scrollIntoViewIfNeeded(); await p.waitForTimeout(1500);
    const box = await cta.boundingBox();
    const ig = (await p.locator('section.ig').count()) ? await p.locator('section.ig').boundingBox() : null;
    const y = box.y + (await p.evaluate(() => scrollY));
    await p.evaluate((t) => scrollTo(0, t), y - 40); await p.waitForTimeout(800);
    await p.screenshot({ path: `qa/output/bottom-${w}-${u === '/' ? 'home' : 'quem'}.png`, fullPage: false, clip: { x: 0, y: 0, width: w, height: Math.min(h * 1.6, box.height + (ig ? ig.height : 0) + 80) } });
  }
}
await b.close();
