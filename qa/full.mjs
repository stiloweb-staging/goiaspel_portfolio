// Captura full-page de uma página (movimento reduzido, imagens carregadas): node qa/full.mjs url largura saida.png
import { chromium } from 'playwright-core';
const [url, w, out] = process.argv.slice(2);
const b = await chromium.launch({ channel: 'msedge' });
const p = await (await b.newContext({ viewport: { width: +w, height: 900 }, reducedMotion: 'reduce' })).newPage();
await p.goto(url, { waitUntil: 'load' });
await p.evaluate(async () => {
  document.querySelectorAll('img[loading="lazy"]').forEach((i) => (i.loading = 'eager'));
  document.documentElement.style.scrollBehavior = 'auto';
  for (let y = 0; y < document.body.scrollHeight; y += 700) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)); }
  scrollTo(0, 0);
});
await p.waitForFunction(() => [...document.images].every((i) => i.complete), null, { timeout: 15000 }).catch(() => {});
await p.waitForTimeout(400);
await p.screenshot({ path: out, fullPage: true });
await b.close();
