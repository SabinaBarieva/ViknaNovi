import type { Metadata } from 'next';

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

const BASE_URL = 'https://viknanovi.shop';


export const metadata: Metadata = {
  title: 'ViknaNovі — металопластикові вікна та двері',
  description:
    'Продаж та встановлення металопластикових вікон, дверей і розсувних систем. Швидкий монтаж, гарантія якості.',

  metadataBase: new URL(BASE_URL),

  alternates: {
    canonical: BASE_URL,
    languages: {
      uk: BASE_URL,
      ru: `${BASE_URL}/ru`,
    },
  },

  openGraph: {
    title: 'ViknaNovі — металопластикові вікна та двері',
    description:
      'Продаж та встановлення металопластикових вікон, дверей і розсувних систем. Швидкий монтаж, гарантія якості.',
    url: BASE_URL,
    siteName: 'ViknaNovі',
    locale: 'uk_UA',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'ViknaNovі — металопластикові вікна та двері',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'ViknaNovі — металопластикові вікна та двері',
    description:
      'Продаж та встановлення металопластикових вікон, дверей і розсувних систем.',
    images: [`${BASE_URL}/og-image.jpg`],
  },

  icons: {
    icon: '/favicon.ico',
  },
};

/* ============================
   ✅ PAGE
============================ */
export default function HomePage() {
  return (
    <main className="pt-[80px]">
      {/* H1 для SEO */}
      <h1 className="sr-only">
        Металопластикові вікна та двері — продаж і монтаж
      </h1>

      {/* Schema.org */}
      <SeoJsonLd locale="uk" />

      {/* Sections */}
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
