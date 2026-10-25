/**
 * Dados institucionais e de contato.
 * Fonte: apresentação institucional 2026 (p. 10) conferida com o site atual (rodapé).
 * Ver 02_MATRIZ_DE_CONTEUDO.md para o status de cada informação.
 */

/**
 * Homologação: mostra selos de "pendente de validação" e o aviso de integração do formulário.
 * Ligado por padrão. Para a build de produção, definir PUBLIC_STAGING=false
 * somente depois que as pendências de 10_PENDENCIAS_PARA_PUBLICACAO.md forem resolvidas.
 */
export const STAGING = import.meta.env.PUBLIC_STAGING !== 'false';

export const site = {
  name: 'Goiaspel',
  legalName: 'Goiaspel Embalagens de Papelão', // razão social completa: pendente
  tagline: 'Embalagens de papelão ondulado',
  foundingDate: '1992-05', // site atual: "Fundada em maio de 1992"
  city: 'Goiânia',
  state: 'GO',
  phoneDisplay: '(62) 4008-8930',
  phoneE164: '+556240088930',
  whatsapp: '556240088930', // link do PDF (wa.me/556240088930) — destino a confirmar como WhatsApp Business
  email: 'atendimento@goiaspel.com.br',
  instagram: 'https://www.instagram.com/goiaspelembalagens/',
  instagramHandle: '@goiaspelembalagens',
  facebook: 'https://www.facebook.com/goiaspelembalagens/',
  youtube: 'https://www.youtube.com/channel/UCGJjMntsZ24_Yg4fzixWZ-Q',
  maps: 'https://maps.app.goo.gl/gQ148QZRqKGqsyNV7',
  address: {
    street: 'Estrada 121, n.º 149, Qd. Ch, Lt. 408/409',
    district: 'Chácaras de Recreio São Joaquim',
    postalCode: '74470-270',
    postalCodeDisplay: '74.470-270',
    city: 'Goiânia',
    state: 'GO',
  },
} as const;

/** Atalhos usados no 404. Menu completo: src/data/rotas.ts */
export const nav = [
  { href: '/conheca-a-goiaspel-embalagens-de-papelao/', label: 'Quem somos' },
  { href: '/produtos-goiaspel-embalagens-de-papelao/', label: 'Produtos' },
  { href: '/tire-suas-duvidas-sobre-nossos-produtos-goiaspel/', label: 'Sobre produtos' },
  { href: '/canais-de-contato-com-a-goiaspel/', label: 'Fale conosco' },
] as const;

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** Anos desde a fundação, calculado na data da build (evita o conflito 34 × 35 anos). */
export function yearsSinceFounding(now = new Date()) {
  const [y, m] = site.foundingDate.split('-').map(Number);
  let years = now.getFullYear() - y;
  if (now.getMonth() + 1 < m) years -= 1;
  return years;
}
