/**
 * Comportamento compartilhado dos formulários: máscaras, validação acessível
 * (mensagens por campo + resumo de erros), campos condicionais e envio pelo adaptador.
 * Sem JS o formulário continua navegável e o usuário vê os canais diretos de contato.
 */
import { submitLead, summarize, type SubmitResult } from '../lib/leads';

type Kind = 'orcamento' | 'fornecedor' | 'contato';

const MESSAGES: Record<string, (el: HTMLInputElement) => string> = {
  valueMissing: (el) => (el.type === 'checkbox' ? 'Marque esta opção para continuar.' : el.type === 'radio' ? 'Escolha uma opção.' : 'Preencha este campo.'),
  typeMismatch: (el) => (el.type === 'email' ? 'Informe um e-mail válido, como nome@empresa.com.br.' : 'Formato inválido.'),
  patternMismatch: (el) => el.dataset.patternMsg ?? 'Formato inválido.',
  tooShort: (el) => `Use pelo menos ${el.minLength} caracteres.`,
  rangeUnderflow: (el) => `O valor mínimo é ${el.min}.`,
  rangeOverflow: (el) => `O valor máximo é ${el.max}.`,
  badInput: () => 'Informe um número.',
};

function maskPhone(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}
function maskCnpj(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 14);
  return d
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
}

function fieldWrap(el: Element) {
  return el.closest<HTMLElement>('[data-field]');
}

function errorFor(el: HTMLInputElement): string {
  const v = el.validity;
  if (v.customError) return el.validationMessage;
  for (const key of Object.keys(MESSAGES)) {
    if (v[key as keyof ValidityState]) return MESSAGES[key](el);
  }
  return '';
}

function showError(el: HTMLInputElement, msg: string) {
  const wrap = fieldWrap(el);
  const box = wrap?.querySelector<HTMLElement>('[data-error]');
  const group = wrap?.querySelectorAll<HTMLInputElement>('input, select, textarea') ?? [el];
  group.forEach((g) => {
    if (msg) g.setAttribute('aria-invalid', 'true');
    else g.removeAttribute('aria-invalid');
  });
  wrap?.classList.toggle('has-error', Boolean(msg));
  if (box) box.textContent = msg;
}

function validateField(el: HTMLInputElement) {
  if (el.closest('[hidden]') || el.disabled) return true;
  if (el.type === 'file' && el.files?.[0]) {
    const max = Number(el.dataset.maxMb ?? 10) * 1024 * 1024;
    el.setCustomValidity(el.files[0].size > max ? `O arquivo excede ${el.dataset.maxMb ?? 10} MB.` : '');
  }
  const ok = el.checkValidity();
  showError(el, ok ? '' : errorFor(el));
  return ok;
}

export function initForm(form: HTMLFormElement, kind: Kind) {
  form.noValidate = true;
  form.dataset.startedAt = String(Date.now());
  form.classList.add('js-ready');

  // Máscaras
  form.querySelectorAll<HTMLInputElement>('[data-mask]').forEach((el) => {
    const fn = el.dataset.mask === 'cnpj' ? maskCnpj : maskPhone;
    el.addEventListener('input', () => {
      const end = el.selectionEnd === el.value.length;
      el.value = fn(el.value);
      if (end) el.setSelectionRange(el.value.length, el.value.length);
    });
  });

  // Validação ao sair do campo e correção ao digitar
  form.addEventListener('focusout', (e) => {
    const el = e.target as HTMLInputElement;
    if (el.matches('input:not([type=radio]):not([type=checkbox]), select, textarea') && el.value) validateField(el);
  });
  form.addEventListener('input', (e) => {
    const el = e.target as HTMLInputElement;
    if (el.getAttribute('aria-invalid') === 'true' || fieldWrap(el)?.classList.contains('has-error')) validateField(el);
  });
  form.addEventListener('change', (e) => {
    const el = e.target as HTMLInputElement;
    if (el.type === 'radio' || el.type === 'checkbox' || el.type === 'file') validateField(el);
    applyConditions(form);
  });

  // Nome do arquivo anexado
  form.querySelectorAll<HTMLInputElement>('input[type=file]').forEach((el) => {
    const out = form.querySelector<HTMLElement>(`[data-file-name="${el.id}"]`);
    el.addEventListener('change', () => { if (out) out.textContent = el.files?.[0]?.name ?? 'Nenhum arquivo selecionado'; });
  });

  // Pré-seleção por parâmetro (?tipo=flexografia)
  const tipo = new URLSearchParams(location.search).get('tipo');
  if (tipo) {
    const radio = form.querySelector<HTMLInputElement>(`input[name="tipo"][value="${CSS.escape(tipo)}"]`);
    if (radio) radio.checked = true;
  }
  applyConditions(form);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const summaryBox = form.querySelector<HTMLElement>('[data-error-summary]');
    const fields = [...form.querySelectorAll<HTMLInputElement>('input, select, textarea')].filter((el) => el.name && el.name !== 'site_empresa');
    const seen = new Set<string>();
    const invalid: HTMLInputElement[] = [];
    for (const el of fields) {
      if (el.type === 'radio') {
        if (seen.has(el.name)) continue;
        seen.add(el.name);
      }
      if (!validateField(el)) invalid.push(el);
    }

    if (invalid.length && summaryBox) {
      const list = summaryBox.querySelector('ul')!;
      list.innerHTML = '';
      invalid.forEach((el) => {
        const wrap = fieldWrap(el);
        const label = wrap?.querySelector('[data-label]')?.textContent?.replace('*', '').trim() ?? el.name;
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${el.id}`;
        a.textContent = `${label}: ${wrap?.querySelector('[data-error]')?.textContent ?? ''}`;
        a.addEventListener('click', (ev) => { ev.preventDefault(); el.focus(); });
        li.append(a);
        list.append(li);
      });
      summaryBox.hidden = false;
      summaryBox.focus();
      return;
    }
    if (summaryBox) summaryBox.hidden = true;

    const btn = form.querySelector<HTMLButtonElement>('[type=submit]');
    btn?.setAttribute('aria-busy', 'true');
    btn && (btn.disabled = true);
    const result = await submitLead(form, kind);
    btn?.removeAttribute('aria-busy');
    btn && (btn.disabled = false);
    renderResult(form, result, kind);
  });
}

function applyConditions(form: HTMLFormElement) {
  form.querySelectorAll<HTMLElement>('[data-show-when]').forEach((el) => {
    // formato: name=valor1|valor2
    const [name, values] = el.dataset.showWhen!.split('=');
    const checked = form.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`);
    const select = form.querySelector<HTMLSelectElement>(`select[name="${name}"]`);
    const current = checked?.value ?? select?.value ?? '';
    const show = values.split('|').includes(current);
    el.hidden = !show;
    el.querySelectorAll<HTMLInputElement>('input, select, textarea').forEach((i) => (i.disabled = !show));
  });
}

function renderResult(form: HTMLFormElement, result: SubmitResult, kind: Kind) {
  const panel = form.parentElement!.querySelector<HTMLElement>('[data-result]')!;
  const title = panel.querySelector<HTMLElement>('[data-result-title]')!;
  const text = panel.querySelector<HTMLElement>('[data-result-text]')!;
  const fallback = panel.querySelector<HTMLElement>('[data-result-fallback]')!;
  panel.hidden = false;
  panel.dataset.state = result.ok ? 'success' : result.reason;

  if (result.ok) {
    title.textContent = { orcamento: 'Solicitação recebida', fornecedor: 'Cadastro recebido', contato: 'Pedido recebido' }[kind];
    text.textContent = {
      orcamento: 'Obrigado. Nossa equipe comercial vai analisar as informações e retornar pelo e-mail ou WhatsApp informados.',
      fornecedor: 'Obrigado. Seus dados foram encaminhados ao setor de compras.',
      contato: 'Obrigado. Vamos ligar para o telefone informado em horário comercial.',
    }[kind];
    fallback.hidden = true;
    form.hidden = true;
  } else {
    title.textContent = result.reason === 'not-configured' ? 'Envie por um canal direto' : 'Não foi possível enviar';
    text.textContent = `${result.message} Seus dados continuam preenchidos — envie o resumo abaixo pelo WhatsApp ou e-mail comercial.`;
    const resumo = summarize(form, { orcamento: 'Solicitação de orçamento — site Goiaspel', fornecedor: 'Cadastro de fornecedor — site Goiaspel', contato: 'Pedido de retorno por telefone — site Goiaspel' }[kind]);
    const wa = fallback.querySelector<HTMLAnchorElement>('[data-fallback-wa]');
    const mail = fallback.querySelector<HTMLAnchorElement>('[data-fallback-mail]');
    if (wa) wa.href = `${wa.dataset.base}?text=${encodeURIComponent(resumo)}`;
    if (mail) mail.href = `mailto:${mail.dataset.to}?subject=${encodeURIComponent(resumo.split('\n')[0])}&body=${encodeURIComponent(resumo)}`;
    fallback.hidden = false;
  }
  panel.focus();
}
