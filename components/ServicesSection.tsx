'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import OpenFeedbackButton from './Button';

export default function Services() {
  const t = useTranslations('services');
  const items = t.raw('items');

  return (
    <section className="container pt-[40px]">
      <div className="max-full mx-auto">

        {/* HEADER */}
        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="title">
            {t('title')}
          </h2>

          <OpenFeedbackButton label={t('btn')}
          className="w-[100%] md:mt-[0]
  uppercase md:w-[296px] h-[63px] font-opensans bg-primary text-white text-[20px] font-normal hover:bg-accent transition mt-[2rem]">
                    </OpenFeedbackButton>
          
        </div>

        {/* ========== DESKTOP GRID (4×2) ========== */}
        <div className="hidden md:grid grid-cols-4 gap-1 ">
          {items.map((item: any) => (
            <div key={item.id} className="relative h-[320px] bg-white rounded-sm overflow-hidden group">
              <Image
                src={item.img}
                alt={item.title}
                fill
    className="
      object-cover
      opacity-0
      group-hover:opacity-80
      transition-opacity
      duration-500
    "
              />
                <div
    className="
      absolute inset-0 bg-black/40
      opacity-0
      group-hover:opacity-40
      transition-opacity
      duration-500
    "
  ></div>
   <div className="absolute inset-0 group-hover:bg-black/50 transition"></div>


            <div className="absolute inset-0 px-[1rem] flex flex-col py-[4rem] gap-5 justify-between text-white">

            <Image
            src={item.number}
            alt={item.title}
            width={60}
            height={50}
            className="display-block z-50 h-[40px]"/>
                <p className="xl:text-[24px] lg:text-[20px] font-mont text-primary font-semibold uppercase group-hover:text-white transition-colors">{item.title}</p>
                <p className="text-[16px] font-normal font-opensans mt-1 leading-[1] text-white">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ========== MOBILE SWIPER (4 CARDS PER PAGE) ========== */}
<div className="md:hidden">
  <Swiper
    direction="vertical"
    slidesPerView={4}
    slidesPerGroup={4}        // <<< ЛИСТАЕМ СРАЗУ ПО 4
    spaceBetween={12}
    modules={[Navigation]}
    navigation={{
      nextEl: '.services-next',
      prevEl: '.services-prev',
      disabledClass: 'swiper-button-disabled'
    }}
    className="h-[1300px]"
    touchReleaseOnEdges={true}
    watchOverflow={true}
    resistanceRatio={0}       // ощущается как страницы
  >
    {items.map((item: any) => (
      <SwiperSlide key={item.id}>
        <div className="relative h-[320px] overflow-hidden">
          <Image
            src={item.img}
            alt={item.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>


            <div className="absolute inset-0 px-[1rem] py-[4rem] flex flex-col gap-5 justify-between text-white">

            <Image
            src={item.number}
            alt={item.title}
            width={60}
            height={50}
            className="display-block z-50 h-[40px]"/>
            <p className="font-mont text-white font-semibold uppercase text-[22px]">{item.title}</p>
            <p className="text-[14px] font-normal font-opensans leading-[1] text-white">{item.desc}</p>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>

  {/* кнопка mobile */}
  {/* <button className="uppercase w-full h-[63px] font-opensans bg-primary text-white text-[20px] font-normal hover:bg-accent transition">
    {t('btn')}
  </button> */}

  {/* стрелки */}
  <div className="flex justify-end gap-3 mt-4">
    <button className="services-prev w-8 h-8 border border-[#0033A1] text-[#0033A1]">&lt;</button>
    <button className="services-next w-8 h-8 border border-[#0033A1] text-[#0033A1]">&gt;</button>
  </div>
  <style jsx>{`
    /* размещаем 4 карточки вертикально внутри каждого слайда */
    .services-swiper .swiper-slide {
      display: flex;
      flex-direction: column;
    }

    .swiper-button-disabled {
      opacity: 0.3 !important;
      pointer-events: none !important;
    }

    .nav-btn {
      width: 32px;
      height: 32px;
      border: 1px solid #0033A1;
      color: #0033A1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `}</style>
</div>

      </div>
    </section>
  );
}
