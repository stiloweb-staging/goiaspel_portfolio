/**
 * Motion editorial: revelações ao rolar, linhas de papelão que se desenham e contagem
 * de números (apenas indicadores validados — data-count). Tudo com IntersectionObserver;
 * sem listeners de scroll, sem bibliotecas. Respeita prefers-reduced-motion:
 * sem a classe .js-motion (definida no <head>) nada é ocultado nem animado.
 */
export function initMotion() {
  const motion = document.documentElement.classList.contains('js-motion');
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal], [data-flute], .kinetic, [data-count]');

  if (!motion || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-in'));
    return;
  }

  // Escalonamento automático dentro de grupos
  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
    group.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el, i) => el.style.setProperty('--reveal-i', String(i)));
  });
  document.querySelectorAll<HTMLElement>('.kinetic').forEach((el) => {
    el.querySelectorAll<HTMLElement>('.line').forEach((line, i) => line.style.setProperty('--line-i', String(i)));
  });

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.classList.add('is-in');
        if (el.dataset.count !== undefined) countUp(el);
        io.unobserve(el);
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
  );
  targets.forEach((el) => io.observe(el));

  // Segurança: nada fica invisível se o observer falhar (ex.: impressão, abas em segundo plano)
  addEventListener('beforeprint', () => targets.forEach((el) => el.classList.add('is-in')));
}

function countUp(el: HTMLElement) {
  const end = Number(el.dataset.count);
  if (!Number.isFinite(end)) return;
  const fmt = new Intl.NumberFormat('pt-BR');
  const duration = 1400;
  const start = performance.now();
  const final = el.textContent;
  el.setAttribute('aria-label', final ?? fmt.format(end));
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 4);
    el.textContent = fmt.format(Math.round(end * eased));
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = final;
  };
  requestAnimationFrame(tick);
}
