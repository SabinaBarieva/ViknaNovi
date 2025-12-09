'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import OpenFeedbackButton from './Button';

export default function BannerSlider() {
  const t = useTranslations('banner');

  const slides = [
    { id: 1, image: '/banner1.webp' },
    { id: 2, image: '/banner2.webp' },
    { id: 3, image: '/banner3.webp' }
  ];

  return (
    <section className="container">
    <div className=" relative w-full h-[520px] md:h-[520px] lg:h-[650px] overflow-hidden">
      
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{ nextEl: '.next-btn', prevEl: '.prev-btn' }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet custom-bullet',
          bulletActiveClass: 'custom-bullet-active'
        }}
        autoplay={{ delay: 4000 }}
        loop={true}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">

              {/* КАРТИНКА */}
              <Image
                src={slide.image}
                fill
                alt="Banner slide"
                className="object-cover"
                loading="eager"
priority

              />

              {/* затемнение */}
              <div className="absolute inset-0 bg-black/60"></div>

              {/* КОНТЕНТ */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-[2rem] sm:px-[6rem] md:px-[10rem] xl:px-[15rem]">
                <div className="max-w-[740px]">

                  {/* ТИТУЛ */}
                  <h1 className="font-mont font-semibold text-[28px] leading-[100%] text-white uppercase text-center md:text-[42px]"
>
                    {t('title')}
                  </h1>

                  {/* ПОДЗАГОЛОВОК */}
                  <p className="block font-opensans  font-normal  pt-[40px] md:text-[18px] leading-[1] text-[#FAF3F3] text-center text-[16px] md:px-[5rem]"
>
                    {t('subtitle')}
                  </p>

                  {/* КНОПКИ — МОБИЛКА В ДВА РЯДА */}
                  <div className="flex flex-col gap-3 w-full pt-[40px]  mx-auto md:flex-row md:max-w-none md:justify-between md:px-[5rem]">

                    <OpenFeedbackButton label={t('btnPrice')} className="w-full h-[63px] bg-white font-opensans text-secondary text-[20px] font-normal hover:bg-bluelight hover:text-white transition md:w-[293px]">
                      
                    </OpenFeedbackButton>

                    <OpenFeedbackButton label={t('btnMeasure')} className="w-full h-[63px] font-opensans bg-primary text-white text-[20px] font-normal hover:bg-accent transition md:w-[293px]">
                      
                    </OpenFeedbackButton>

                  </div>
                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* СТРЕЛКИ SVG */}
      <button
        className="md:flex hidden z-50 prev-btn absolute left-10 top-1/2 -translate-y-1/2 bg-white/70 w-10 h-10 rounded-md flex items-center justify-center hover:bg-white transition"
      >
        <Image src="/left.svg" alt="Prev" width={50} height={50} />
      </button>

      <button
        className="md:flex hidden z-50 next-btn absolute right-10 top-1/2 -translate-y-1/2 bg-white/70 w-10 h-10 rounded-md flex items-center justify-center hover:bg-white transition"
      >
        <Image src="/right.svg" alt="Next" width={50} height={50} />
      </button>

      {/* СТИЛИ ПОЛОСОК */}
      <style jsx global>{`
        .custom-bullet {
          width: 26px;
          height: 3px;
          background: rgba(255,255,255,0.4);
          margin: 0 4px !important;
          border-radius: 2px;
        }
        .custom-bullet-active {
          background: white !important;
          width: 32px !important;
        }
        .swiper-pagination {
          bottom: 22px !important;
        }
      `}</style>
    </div>
    </section>
  );
}
