import type { MetadataRoute } from 'next';


const BASE_URL = 'https://www.viknanovi.shop';


const LOCALES = ['uk', 'ru'] as const;


const ROUTES = [''] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const urls: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const route of ROUTES) {
      let path = '';

      if (locale === 'uk') {
        path = route ? `/${route}` : '/';
      } else {
        path = route ? `/ru/${route}` : '/ru';
      }

      urls.push({
        url: path === '/' ? `${BASE_URL}` : `${BASE_URL}${path}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.7,
      });
    }
  }

  return urls;
}
