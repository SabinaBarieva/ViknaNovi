'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { urlFor } from '@/lib/imageUrl';

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
        navigation={{
          nextEl: '.next-btn',
          prevEl: '.prev-btn',
        }}
        pagination={{
          clickable: true,
        }}
        autoplay={{ delay: 4000 }}
        loop={data.length > 1} // ✅ loop только если больше 1 слайда
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
              {/* затемнение */}
              <div className="absolute inset-0 bg-black/70"></div>

              <div className="relative p-20 z-10">
                <h1 className="font-mont uppercase text-[38px] text-[#FAF3F3] font-semibold mb-4">
                  {slide.title?.[lang]}
                </h1>
                <p className="font-opensans text-[18px] text-white font-normal mb-6">
                  {slide.description?.[lang]}
                </p>
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
