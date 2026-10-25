// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { redirects } from './src/data/redirects.mjs';
import { prefixBase } from './integrations/prefix-base.mjs';

// Domínio e subpasta vêm do ambiente: a build de homologação no GitHub Pages usa
// SITE_URL=https://stiloweb-staging.github.io e BASE_PATH=/goiaspel_portfolio (ver .github/workflows).
const SITE = process.env.SITE_URL || 'https://www.goiaspel.com.br';
const BASE = process.env.BASE_PATH || '/';

// Site institucional estático. A URL canônica só passa a valer após a publicação autorizada.
export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  // Redirecionamentos das URLs antigas (/site/...). Em produção, preferir os 301 do servidor
  // definidos em public/.htaccess — estes são o fallback estático (meta refresh + canonical).
  redirects,
  integrations: [
    prefixBase(BASE),
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/site/'),
      i18n: undefined,
    }),
  ],
  image: {
    responsiveStyles: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  devToolbar: { enabled: false },
  // 'class' propaga o escopo do pai em props class= (ex.: <Icon class="i">)
  scopedStyleStrategy: 'class',
  build: {
    // CSS total ~11 KB gzip: embutido no HTML elimina requisições que bloqueiam a renderização
    inlineStylesheets: 'always',
  },
});
