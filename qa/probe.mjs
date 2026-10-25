import { chromium } from 'playwright-core';
const [url, w, sel] = process.argv.slice(2);
const b = await chromium.launch({ channel: 'msedge' });
const p = await (await b.newContext({ viewport: { width: +w, height: 800 }, reducedMotion: 'reduce' })).newPage();
await p.goto(url, { waitUntil: 'networkidle' });
console.log(await p.evaluate((s) => [...document.querySelectorAll(s)].map((e) => { const r = e.getBoundingClientRect(); return `${e.className.slice(0,40)} L${Math.round(r.left)} R${Math.round(r.right)} W${Math.round(r.width)} "${e.textContent.trim().slice(0,30)}" fs=${getComputedStyle(e).fontSize}`; }), sel));
await b.close();
