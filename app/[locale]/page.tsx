import type { Metadata } from 'next';
import { headers } from 'next/headers';

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

const BASE_URL = 'https://viknanovi.shop';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '/';

  const locale: Locale = pathname.startsWith('/ru') ? 'ru' : 'uk';
  const isUk = locale === 'uk';


  const title = isUk
    ? 'ViknaNovі — металопластикові вікна та двері'
    : 'ViknaNovі — металлопластиковые окна и двери';

  const description = isUk
    ? 'Продаж та встановлення металопластикових вікон, дверей і розсувних систем. Швидкий монтаж, гарантія якості.'
    : 'Продажа и установка металлопластиковых окон, дверей и раздвижных систем. Быстрый монтаж и гарантия качества.';

  const canonicalUrl =
    locale === 'uk'
      ? BASE_URL
      : `${BASE_URL}/ru`;

  return {
    title,
    description,

    metadataBase: new URL(BASE_URL),

    alternates: {
      canonical: canonicalUrl,
      languages: {
        uk: BASE_URL,
        ru: `${BASE_URL}/ru`,
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
          url: `${BASE_URL}/og-image.jpg`,
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
      images: [`${BASE_URL}/og-image.jpg`],
    },

    icons: {
      icon: '/favicon.ico',
    },
  };
}

export default async function HomePage() {
  return (
    <main className="pt-[80px]">
      <h1 className="sr-only">
        Металопластикові вікна та двері — продаж і монтаж
      </h1>

      <SeoJsonLd locale="uk" />

      <BannerSlider />
      <AboutSection />
      <PromoModal />
      <ServicesSection />
      <ProfileSystems />
      <WindowSVGDesigner />
      <FurnituraSection />
      <SaleSliderServer lang="uk" />
      <Portfolio />
      <AdvantagesSection />
      <MeasureForm />
      <StepsSection />
      <ReviewsSection />
      <ContactForm />
    </main>
  );
}
