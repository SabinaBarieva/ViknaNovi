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
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full">
                {/* Изображение фона с умной предзагрузкой и адаптивными размерами */}
                <Image
                  src={slide.image}
                  fill
                  alt="Banner slide"
                  className="object-cover"
                  // 1. Убираем lazy-loading ТОЛЬКО для самого первого слайда (LCP)
                  priority={index === 0}
                  // 2. Для приоритетного слайда передаем undefined, чтобы не конфликтовать со свойством priority
                  loading={index === 0 ? undefined : "lazy"}
                  // 3. Указываем размеры, чтобы Next.js автоматически нарезал картинку под телефон
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                />

                {/* Затемнение */}
                <div className="absolute inset-0 bg-black/60"></div>

                {/* Контент */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-16 md:px-24 xl:px-36">
                  <div className="max-w-[740px]">
                    {/* Исправлен контраст текста: добавлен тень text-shadow через Tailwind для читаемости на солнце */}
                    <h2 className="font-mont font-semibold text-[28px] md:text-[42px] text-white uppercase leading-[100%] drop-shadow-md">
                      {t('title')}
                    </h2>
                    <p className="font-opensans text-[16px] md:text-[18px] text-[#FAF3F3] mt-6 drop-shadow-sm">
                      {t('subtitle')}
                    </p>

                    {/* Кнопки — увеличены padding'и для улучшения Mobile UX (минимальный размер по Lighthouse) */}
                    <div className="flex flex-col gap-3 w-full pt-10 md:flex-row md:justify-between md:px-20">
                      <OpenFeedbackButton label={t('btnPrice')} className="w-full h-[63px] bg-white font-opensans text-secondary text-[20px] font-normal hover:bg-bluelight hover:text-white transition md:w-[293px] min-h-[48px]" />
                      <OpenFeedbackButton label={t('btnMeasure')} className="w-full h-[63px] bg-primary text-white text-[20px] font-opensans font-normal hover:bg-accent transition md:w-[293px] min-h-[48px]" />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>


        {/* ✅ ИСПРАВЛЕНО: Добавлены классы p-0 border-0 bg-white/70, чтобы полностью убрать серые подложки и рамки браузера */}
        <button 
          type="button" 
          className="md:flex hidden prev-btn absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/70 w-12 h-12 rounded-md items-center justify-center hover:bg-white transition border-0 p-0 cursor-pointer shadow-sm" 
          aria-label="Назад"
        >
          {/* ✅ Скорректирована обрезка иконки, чтобы она сидела ровно по центру */}
          <Image src="/left.svg" alt="Назад" width={24} height={24} className="w-6 h-6 object-contain" />
        </button>

        <button 
          type="button" 
          className="md:flex hidden next-btn absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/70 w-12 h-12 rounded-md items-center justify-center hover:bg-white transition border-0 p-0 cursor-pointer shadow-sm" 
          aria-label="Вперёд"
        >
          <Image src="/right.svg" alt="Вперёд" width={24} height={24} className="w-6 h-6 object-contain" />
        </button>

        {/* Стили для пагинации */}
        <style jsx global>{`
          /* ✅ Гарантировано вырезаем любые встроенные рамки или псевдоэлементы, которые Swiper навязывает кнопкам */
          .prev-btn, .next-btn {
            background-image: none !important;
            outline: none !important;
          }
          .prev-btn::after, .next-btn::after {
            display: none !important; 
          }

          .custom-bullet {
            width: 26px;
            height: 12px; 
            background: rgba(255, 255, 255, 0.4);
            margin: 0 6px !important;
            border-radius: 2px;
            display: inline-block;
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
