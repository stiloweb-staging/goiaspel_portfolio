/**
 * Adaptador de envio de leads (orçamento e fornecedores).
 *
 * Não há integração comercial configurada neste ambiente. O adaptador NÃO simula sucesso:
 * sem PUBLIC_LEAD_ENDPOINT ele retorna `not-configured` e a interface oferece os canais
 * que funcionam de verdade (WhatsApp e e-mail com o resumo preenchido).
 *
 * Para ativar: definir PUBLIC_LEAD_ENDPOINT (URL que aceite POST multipart/form-data e
 * responda JSON 2xx). Opções avaliadas em 06_PLANO_DE_IMPLEMENTACAO.md (Formspree, Web3Forms,
 * função serverless própria com SMTP, RD Station). Nenhuma credencial vai para o código:
 * chaves secretas ficam no serviço/servidor; o endpoint público não é segredo.
 */

export type SubmitResult =
  | { ok: true }
  | { ok: false; reason: 'not-configured' | 'network' | 'server' | 'spam'; message: string };

const MIN_FILL_MS = 3000; // envio mais rápido que isso é tratado como robô

export function leadEndpoint(): string | undefined {
  const url = import.meta.env.PUBLIC_LEAD_ENDPOINT as string | undefined;
  return url && /^https:\/\//.test(url) ? url : undefined;
}

export function isSpam(form: HTMLFormElement): boolean {
  const honeypot = form.querySelector<HTMLInputElement>('[name="site_empresa"]');
  const started = Number(form.dataset.startedAt ?? 0);
  return Boolean(honeypot?.value) || (started > 0 && Date.now() - started < MIN_FILL_MS);
}

export async function submitLead(form: HTMLFormElement, kind: 'orcamento' | 'fornecedor' | 'contato'): Promise<SubmitResult> {
  if (isSpam(form)) return { ok: false, reason: 'spam', message: 'Não foi possível enviar. Tente novamente em alguns segundos.' };

  const endpoint = leadEndpoint();
  if (!endpoint) {
    return {
      ok: false,
      reason: 'not-configured',
      message: 'O envio automático ainda não está ativo neste ambiente.',
    };
  }

  const data = new FormData(form);
  data.delete('site_empresa');
  data.set('_origem', kind);
  data.set('_pagina', location.href);

  try {
    const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
    if (!res.ok) return { ok: false, reason: 'server', message: `O servidor recusou o envio (código ${res.status}).` };
    return { ok: true };
  } catch {
    return { ok: false, reason: 'network', message: 'Sem conexão com o servidor de envio.' };
  }
}

/** Resumo legível do formulário para WhatsApp / e-mail. */
export function summarize(form: HTMLFormElement, title: string): string {
  const lines: string[] = [title, ''];
  form.querySelectorAll<HTMLElement>('[data-summary]').forEach((el) => {
    const label = el.dataset.summary!;
    let value = '';
    if (el instanceof HTMLInputElement && (el.type === 'radio' || el.type === 'checkbox')) {
      if (!el.checked) return;
      value = el.dataset.valueLabel ?? el.value;
    } else if (el instanceof HTMLSelectElement) {
      value = el.value ? el.selectedOptions[0]?.textContent?.trim() ?? '' : '';
    } else if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
      if (el.closest('[hidden]')) return;
      value = el.value.trim();
    }
    if (value) lines.push(`${label}: ${value}`);
  });
  return lines.join('\n');
}
