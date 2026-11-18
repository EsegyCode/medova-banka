// TODO: підключити реальний backend / Telegram-бот (@medovabanka_bot)
// Змінні середовища: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
// При підключенні: надсилати POST на https://api.telegram.org/bot{TOKEN}/sendMessage
// Формат повідомлення: «Нова заявка: ім'я, телефон, який мед, сторінка, джерело»
// Антиспам: перевіряти honeypot-поле на сервері
//
// NOTE: When a server-side adapter is added (Netlify, Vercel, Cloudflare), set:
//   export const prerender = false;
// and add the corresponding @astrojs/netlify (or similar) adapter.
// Until then this file is a placeholder only.

export async function POST() {
  return new Response(JSON.stringify({ ok: false, message: 'Backend not connected yet' }), {
    status: 503,
    headers: { 'Content-Type': 'application/json' },
  });
}
