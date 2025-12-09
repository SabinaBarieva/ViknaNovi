
import AboutSection from '@/components/AboutSection';
import AdvantagesSection from '@/components/AdvantagesSection';
import ContactForm from '@/components/ContactForm';
import FurnituraSection from '@/components/FurnituraSection';
import MeasureForm from '@/components/MeasureForm';
import Portfolio from '@/components/Portfolio';
import ProfileSystems from '@/components/ProfileSystems';
import PromoModal from '@/components/PromoModal';

import ReviewsSection from '@/components/ReviewsSection';
import SaleSlider from '@/components/SaleSlider';
import SaleSliderServer from '@/components/SaleSliderServer.tsx';
import ServicesSection from '@/components/ServicesSection';
import StepsSection from '@/components/StepsSection';
import BannerSlider from '@/components/Swiper';
import WindowSVGDesigner from '@/components/Windowsdesign';
import WindowColorDesigner from '@/components/Windowsdesign';
import {useTranslations} from 'next-intl';


export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const lang = locale === "ru" ? "ru" : "uk";

  return (
    <>
      <BannerSlider />
      <AboutSection/>
      <PromoModal/>
      <ServicesSection/>
      <ProfileSystems/>
      <WindowSVGDesigner/>
      <FurnituraSection/>

            <SaleSliderServer lang={lang} /> {/* ✅ используем компонент со слайдерами */}
             <Portfolio/>
      <AdvantagesSection/>
                  <MeasureForm/>

      
     
      <StepsSection/>
      <ReviewsSection/>
      <ContactForm/>
    </>
  );
}
