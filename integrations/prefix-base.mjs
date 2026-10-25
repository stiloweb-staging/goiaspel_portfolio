// @ts-check
/**
 * Publicação em subpasta (ex.: GitHub Pages em /goiaspel_portfolio/).
 * O Astro já prefixa os arquivos que ele gera (/_astro/...), mas os caminhos escritos à mão nas
 * páginas (/orcamento/, /video/..., /favicon.svg) continuam absolutos. Depois da build, este passo
 * reescreve nos HTML os atributos e url() que começam com "/" para "/<base>/".
 * Com base "/" (domínio próprio) não faz nada.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/** @param {string} dir @returns {AsyncGenerator<string>} */
async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (/\.(html|xml|css)$/.test(e.name)) yield p;
  }
}

/** @param {string} base */
export function prefixBase(base) {
  const b = base.replace(/\/$/, ''); // "/goiaspel_portfolio"
  const fix = (/** @type {string} */ u) => (u.startsWith('//') || u.startsWith(b + '/') || u === b ? u : b + u);
  /** @param {string} html */
  const rewrite = (html) =>
    html
      // href="/x" src="/x" poster="/x" action="/x" data-*="/x"
      .replace(/(\s(?:href|src|poster|action|data-[\w-]+)=["'])(\/[^"']*)/g, (_m, a, u) => a + fix(u))
      // srcset="/a 1x, /b 2x"
      .replace(/(\ssrcset=["'])([^"']*)/g, (_m, a, list) => a + list.replace(/(^|,\s*)(\/[^\s,]+)/g, (/** @type {string} */ _n, /** @type {string} */ sep, /** @type {string} */ u) => sep + fix(u)))
      // <meta http-equiv="refresh" content="0;url=/x">
      .replace(/(content=["']\d+;\s*url=)(\/[^"']*)/gi, (_m, a, u) => a + fix(u))
      // url(/x) em estilos embutidos
      .replace(/url\((["']?)(\/[^)"']+)\1\)/g, (_m, q, u) => `url(${q}${fix(u)}${q})`);
  return {
    name: 'prefix-base',
    hooks: {
      'astro:build:done': async (/** @type {{ dir: URL, logger: any }} */ { dir, logger }) => {
        if (!b) return;
        let n = 0;
        for await (const file of walk(fileURLToPath(dir))) {
          const src = await readFile(file, 'utf8');
          const out = rewrite(src);
          if (out !== src) { await writeFile(file, out); n++; }
        }
        logger.info(`caminhos prefixados com ${b}/ em ${n} arquivos`);
      },
    },
  };
}
