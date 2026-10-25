import { chromium } from 'playwright-core';
const b = await chromium.launch({ channel: 'msedge' });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript(() => sessionStorage.setItem('gp-intro', '1'));
const p = await ctx.newPage();
await p.goto('http://localhost:4322/', { waitUntil: 'load' });
const root = p.locator('[data-sectors]');
await root.scrollIntoViewIfNeeded();
const btns = root.locator('[data-target]');
for (let i = 0; i < await btns.count(); i++) {
  await btns.nth(i).click(); await p.waitForTimeout(900);
  await root.screenshot({ path: `qa/output/tmp/setor-${i + 1}.png` });
}
await b.close();
