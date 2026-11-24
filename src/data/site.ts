export const site: {
  siteName: string;
  siteUrl: string;
  phone: string;
  email: string;
  telegramBot: string;
  telegramUrl: string;
  workingHours: string;
  addressRegion: string;
  addressLocality: string;
  country: string;
  // TODO: set production domain via PUBLIC_SITE_URL in .env or site in astro.config.mjs
  seller: {
    legalName: string;
    taxId: string;
    registrationStatus: string;
    legalAddress: string;
  };
  lastUpdated: string;
} = {
  siteName: 'Медова Банка',
  // TODO: set production domain
  siteUrl: (import.meta.env.PUBLIC_SITE_URL as string | undefined) || 'https://medova-banka.shop',
  phone: '+38 (099) 701-12-56',
  email: 'medovabanka@gmail.com',
  telegramBot: '@medovabanka_bot',
  telegramUrl: 'https://t.me/medovabanka_bot',
  workingHours: 'щодня з 07:00 до 21:00',
  addressRegion: 'Сумська область',
  addressLocality: 'Суми',
  country: 'Україна',
  seller: {
    legalName: 'TODO: повна назва продавця',
    taxId: 'TODO: РНОКПП/ЄДРПОУ',
    registrationStatus: 'TODO: статус реєстрації (ФОП/ТОВ)',
    legalAddress: 'TODO: юридична адреса',
  },
  lastUpdated: '2026-11-24',
};
export type SiteData = typeof site;