import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

import AboutSection from '@/components/AboutSection';
import AdvantagesSection from '@/components/AdvantagesSection';
import ContactForm from '@/components/ContactForm';
import FurnituraSection from '@/components/FurnituraSection';
import MeasureForm from '@/components/MeasureForm';
import Portfolio from '@/components/Portfolio';
import ProfileSystems from '@/components/ProfileSystems';
import PromoModal from '@/components/PromoModal';
import ReviewsSection from '@/components/ReviewsSection';
import SaleSliderServer from '@/components/SaleSliderServer';
import ServicesSection from '@/components/ServicesSection';
import StepsSection from '@/components/StepsSection';
import BannerSlider from '@/components/Swiper';
import WindowSVGDesigner from '@/components/Windowsdesign';
import SeoJsonLd from '@/components/SeoJsonLd';

type Locale = 'uk' | 'ru';

/* -------------------- SEO METADATA -------------------- */
export async function generateMetadata(): Promise<Metadata> {
  const raw = await getLocale();
  const locale: Locale = raw === 'ru' ? 'ru' : 'uk';
  const isUk = locale === 'uk';

  const title = isUk
    ? 'ViknaNovі — металопластикові вікна та двері'
    : 'ViknaNovі — металлопластиковые окна и двери';

  const description = isUk
    ? 'Продаж та встановлення металопластикових вікон, дверей і розсувних систем. Швидкий монтаж, гарантія якості.'
    : 'Продажа и установка металлопластиковых окон, дверей и раздвижных систем. Быстрый монтаж и гарантия качества.';

  const canonicalUrl =
    locale === 'uk'
      ? 'https://viknanovi.shop'
      : 'https://viknanovi.shop/ru';

  return {
    title,
    description,
    metadataBase: new URL('https://viknanovi.shop'),

    alternates: {
      canonical: canonicalUrl,
      languages: {
        uk: 'https://viknanovi.shop',
        ru: 'https://viknanovi.shop/ru',
        'x-default': 'https://viknanovi.shop',
      },
    },

    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'ViknaNovі',
      locale: isUk ? 'uk_UA' : 'ru_RU',
      type: 'website',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.jpg'],
    },

    icons: {
      icon: '/favicon.ico',
    },
  };
}

/* -------------------- PAGE -------------------- */
export default async function HomePage() {
  const raw = await getLocale();
  const locale: Locale = raw === 'ru' ? 'ru' : 'uk';

  return (
    <main className="pt-[80px]">


      <h1 className="sr-only">
        {locale === 'uk'
          ? 'Металопластикові вікна та двері — продаж і монтаж'
          : 'Металлопластиковые окна и двери — продажа и монтаж'}
      </h1>

      {/* Schema.org */}
      <SeoJsonLd locale={locale} />

      {/* CONTENT */}
      <BannerSlider />
      <AboutSection />
      <PromoModal />
      <ServicesSection />
      <ProfileSystems />
      <WindowSVGDesigner />
      <FurnituraSection />
      <SaleSliderServer lang={locale} />
      <Portfolio />
      <AdvantagesSection />
      <MeasureForm />
      <StepsSection />
      <ReviewsSection />
      <ContactForm />
    </main>
  );
}
