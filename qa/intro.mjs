import { chromium } from 'playwright-core';
const b = await chromium.launch({ channel: 'msedge' });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
const errs = []; p.on('pageerror', (e) => errs.push(e.message));
await p.goto('http://localhost:4322/', { waitUntil: 'commit' });
const t0 = Date.now();
for (const ms of [250, 600, 1000, 1500, 1750, 2000, 3200]) {
  await p.waitForTimeout(Math.max(0, ms - (Date.now() - t0)));
  await p.screenshot({ path: `qa/output/intro-${ms}.png` });
}
console.log('intro removed:', await p.evaluate(() => !document.querySelector('[data-intro]') && !document.documentElement.classList.contains('gp-intro')));
await p.goto('http://localhost:4322/orcamento/', { waitUntil: 'load' });
console.log('2nd page no intro:', await p.evaluate(() => !document.documentElement.classList.contains('gp-intro')));
console.log('errors', errs);
await b.close();
