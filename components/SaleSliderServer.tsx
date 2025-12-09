import { sanityClient } from '@/lib/sanityClient';
import SaleSlider from './SaleSlider';

export default async function SaleSliderServer({
  lang,
}: {
  lang: 'uk' | 'ru';
}) {
  const blocks = await sanityClient.fetch(`
    *[_type == "heroBlock"] | order(_createdAt asc)
  `);

  // ✅ Собираем ВСЕ slides из всех блоков в один массив
  const slides = blocks.flatMap((block: any) => block.slides || []);

  return <SaleSlider data={slides} lang={lang} />;
}
