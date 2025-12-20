import type { MetadataRoute } from 'next';

const BASE_URL = 'https://viknanovi.shop';

// Украинский — default (без префикса)
const LOCALES = ['uk', 'ru'] as const;

// Пока только главная
const ROUTES = [''] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const urls: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const route of ROUTES) {
      let path = '';

      if (locale === 'uk') {
        // 🇺🇦 дефолтный язык — без /uk
        path = route ? `/${route}` : '/';
      } else {
        // 🇷🇺 русский — с /ru
        path = route ? `/ru/${route}` : '/ru';
      }

      urls.push({
        url: `${BASE_URL}${path}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.7,
      });
    }
  }

  return urls;
}
