'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image'; 
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

        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet sale-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active'
        }}
        autoplay={{ delay: 4000 }}
        loop={data.length > 1}
        className="h-[660px] md:h-[500px] lg:h-[600px] rounded overflow-hidden"
      >
        {data.map((slide: any, i: number) => (
          <SwiperSlide key={slide._key || i} className="h-full">
            <div className="h-full w-full flex items-center justify-center text-center px-4 relative bg-black">

              <Image
                src={urlFor(slide.backgroundImage).url()}
                alt={slide.title?.[lang] || "Sale slide"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                className="object-cover pointer-events-none"

                loading="lazy"
              />

              <div className="absolute inset-0 bg-black/70 z-10" />


              <div className="relative p-10 md:p-20 z-20 max-w-[800px] mx-auto w-full">
                <h2 className="font-mont uppercase text-[26px] md:text-[38px] text-[#FAF3F3] font-semibold mb-4 drop-shadow-md">
                  {slide.title?.[lang]}
                </h2>

                <p className="font-opensans text-[16px] md:text-[18px] text-white font-normal mb-6 leading-relaxed drop-shadow-sm">
                  {slide.description?.[lang]}
                </p>

                <div className="w-full flex justify-center">
                  <div className="w-[293px] max-w-full">
                    <OpenFeedbackButton
                      label={slide.buttonText?.[lang]}
                      className="z-10 w-full uppercase h-[55px] md:h-[63px] font-opensans bg-primary text-white text-[18px] md:text-[20px] font-normal hover:bg-accent transition md:w-[293px] min-h-[48px]"
                    />
                  </div>
                </div>
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

        .sale-bullet {
          width: 40px;
          height: 12px;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.4) !important;
          opacity: 1;
          transition: background 0.3s ease, width 0.3s ease;
          display: inline-block;
          cursor: pointer;
        }

        .swiper-pagination-bullet-active {
          background: white !important;
        }
      `}</style>
    </section>
  );
}
