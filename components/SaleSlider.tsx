'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { urlFor } from '@/lib/imageUrl';
import OpenFeedbackButton from './Button';

type Props = {
  data: any[];
  lang: 'uk' | 'ru';
};

export default function SaleSlider({ data, lang }: Props) {
  if (!data || data.length === 0) return null;

  return (
    <section id="sales" className="container relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop={data.length > 1}
        className="h-full"
      >
        {data.map((slide: any, i: number) => (
          <SwiperSlide key={slide._key || i}>
            <div
              className="h-max flex items-center justify-center text-center px-4 relative"
              style={{
                backgroundImage: `url(${urlFor(slide.backgroundImage).url()})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-black/70"></div>

              <div className="relative p-10 md:p-20 z-10 max-w-[800px] mx-auto">
                <h2 className="font-mont uppercase text-[26px] md:text-[38px] text-[#FAF3F3] font-semibold mb-4">
                  {slide.title?.[lang]}
                </h2>
                <p className="font-opensans text-[16px] md:text-[18px] text-white font-normal mb-6">
                  {slide.description?.[lang]}
                </p>
                <OpenFeedbackButton
                  label={slide.buttonText?.[lang]}
                  className="z-10 w-full uppercase h-[55px] md:h-[63px] font-opensans bg-primary text-white text-[18px] md:text-[20px] font-normal hover:bg-accent transition md:w-[293px]"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination {
          bottom: 24px !important;
          display: flex;
          gap: 10px;
          justify-content: center;
          align-items: center;
        }

        .swiper-pagination-bullet {
          width: 40px;
          height: 2px;
          border-radius: 0;
          background: rgba(255, 255, 255, 0.4);
          opacity: 1;
          transition: background 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          background: white;
        }
      `}</style>
    </section>
  );
}
