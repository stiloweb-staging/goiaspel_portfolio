// Registra deslocamentos de layout (CLS) com rede lenta simulada: node qa/cls.mjs url
import { chromium } from 'playwright-core';
const b = await chromium.launch({ channel: 'msedge' });
const ctx = await b.newContext({ viewport: { width: 412, height: 823 }, deviceScaleFactor: 1.75 });
const p = await ctx.newPage();
const cdp = await ctx.newCDPSession(p);
await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 200000, uploadThroughput: 90000 });
await p.addInitScript(() => {
  window.__ls = [];
  new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__ls.push({ v: +e.value.toFixed(4), t: Math.round(e.startTime), src: e.sources.map((s) => (s.node?.className?.baseVal ?? s.node?.className ?? s.node?.nodeName) + ` ${Math.round(s.previousRect.y)}→${Math.round(s.currentRect.y)} h${Math.round(s.previousRect.height)}→${Math.round(s.currentRect.height)}`) }))).observe({ type: 'layout-shift', buffered: true });
});
await p.goto(process.argv[2], { waitUntil: 'load', timeout: 90000 });
await p.waitForTimeout(3000);
console.log(JSON.stringify(await p.evaluate(() => window.__ls), null, 1));
await b.close();
