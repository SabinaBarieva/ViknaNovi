'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import OpenFeedbackButton from './Button';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function BannerSlider() {
  const t = useTranslations('banner');

  const slides = [
    { id: 1, image: '/banner1.webp' },
    { id: 2, image: '/banner2.webp' },
    { id: 3, image: '/banner3.webp' }
  ];

  return (
    <section className="container">
      <div className="relative w-full h-[520px] md:h-[520px] lg:h-[650px] overflow-hidden">
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
                {/* Изображение фона */}
                <Image
                  src={slide.image}
                  fill
                  alt="Banner slide"
                  className="object-cover"
                  loading="lazy"
                />

                {/* Затемнение */}
                <div className="absolute inset-0 bg-black/60"></div>

                {/* Контент */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-16 md:px-24 xl:px-36">
                  <div className="max-w-[740px]">
                    <h1 className="font-mont font-semibold text-[28px] md:text-[42px] text-white uppercase leading-[100%]">
                      {t('title')}
                    </h1>
                    <p className="font-opensans text-[16px] md:text-[18px] text-[#FAF3F3] mt-6">
                      {t('subtitle')}
                    </p>

                    {/* Кнопки */}
                    <div className="flex flex-col gap-3 w-full pt-10 md:flex-row md:justify-between md:px-20">
                      <OpenFeedbackButton label={t('btnPrice')} className="w-full h-[63px] bg-white font-opensans text-secondary text-[20px] font-normal hover:bg-bluelight hover:text-white transition md:w-[293px]" />
                      <OpenFeedbackButton label={t('btnMeasure')} className="w-full h-[63px] bg-primary text-white text-[20px] font-opensans font-normal hover:bg-accent transition md:w-[293px]" />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Стрелки */}
        <button className="md:flex hidden prev-btn absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/70 w-10 h-10 rounded-md items-center justify-center hover:bg-white transition">
          <Image src="/left.svg" alt="Назад" width={50} height={50} />
        </button>

        <button className="md:flex hidden next-btn absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/70 w-10 h-10 rounded-md items-center justify-center hover:bg-white transition">
          <Image src="/right.svg" alt="Вперёд" width={50} height={50} />
        </button>

        {/* Стили для пагинации */}
        <style jsx global>{`
          .custom-bullet {
            width: 26px;
            height: 3px;
            background: rgba(255, 255, 255, 0.4);
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
