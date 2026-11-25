export interface Env {
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function onRequestPost(context: { request: Request; env: Env }): Promise<Response> {
  const { request, env } = context;
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: 'Невірний формат даних.' }, 400);
  }

  // Honeypot
  const honey = String(data.company || '').trim();
  if (honey) {
    return json({ ok: true });
  }

  const name = String(data.name || '').trim();
  const phone = String(data.phone || '').trim();
  const sort = String(data.sort || '').trim();
  const source = String(data.source || '').trim();
  const product = String(data.product || '').trim();
  const pageUrl = String(data.page_url || '').trim();

  if (data.consent !== true) {
    return json({ ok: false }, 400);
  }

  if (!name || name.length < 2 || name.length > 80) {
    return json({ ok: false, error: 'Вкажіть ім\'я (2–80 символів).' }, 400);
  }
  if (!/^\+380\d{9}$/.test(phone)) {
    return json({ ok: false, error: 'Телефон у форматі +380XXXXXXXXX.' }, 400);
  }

  const token = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return json({ ok: false, error: 'Сервіс тимчасово недоступний.' }, 500);
  }

  const text =
    'Нова заявка:\n' +
    'Ім\'я: ' + escapeHtml(name) + '\n' +
    'Телефон: ' + escapeHtml(phone) + '\n' +
    'Який мед: ' + escapeHtml(sort || 'не вказано') + '\n' +
    'Сторінка: ' + escapeHtml(pageUrl || 'невідомо') + '\n' +
    'Джерело: ' + escapeHtml(source || 'невідомо') +
    (product ? '\nТовар: ' + escapeHtml(product) : '');

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
      }),
    });
    if (!tgRes.ok) {
      return json({ ok: false, error: 'Не вдалося відправити заявку.' }, 500);
    }
    const tgJson = (await tgRes.json()) as { ok?: boolean };
    if (!tgJson.ok) {
      return json({ ok: false, error: 'Не вдалося відправити заявку.' }, 500);
    }
  } catch {
    return json({ ok: false, error: 'Не вдалося відправити заявку.' }, 500);
  }

  return json({ ok: true });
}
