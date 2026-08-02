import { Metadata } from 'next';

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

const BASE_URL = 'https://www.viknanovi.shop'; 

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params)?.locale || 'uk';
  const isRu = locale === 'ru';

  const canonicalUrl = isRu ? `${BASE_URL}/ru` : BASE_URL;
  
  const title = isRu 
    ? 'ViknaNovі — металлопластиковые окна и двери' 
    : 'ViknaNovі — металопластикові вікна та двері';
    
  const description = isRu
    ? 'Продажа и установка металлопластиковых окон, дверей и раздвижных систем. Быстрый монтаж, гарантия качества.'
    : 'Продаж та встановлення металопластикових вікон, дверей і розсувних систем. Швидкий монтаж, гарантія якості.';

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
      locale: isRu ? 'ru_UA' : 'uk_UA',
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

/* ============================
   ✅ PAGE
============================ */
export default async function HomePage({ params }: Props) {
  const rawLocale = (await params)?.locale || 'uk';
  

  const locale = (rawLocale === 'ru' ? 'ru' : 'uk') as 'uk' | 'ru';
  const isRu = locale === 'ru';

  return (
    <main className="pt-[80px]">

      <h1 className="sr-only">
        {isRu 
          ? 'Металлопластиковые окна и двери — продажа и монтаж' 
          : 'Металопластикові вікна та двері — продаж і монтаж'}
      </h1>


      <SeoJsonLd locale={locale} />

      {/* Sections */}
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
