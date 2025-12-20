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
          <h2 className="title">{t('title')}</h2>

          <OpenFeedbackButton
            label={t('btn')}
            className="w-full md:w-[296px] h-[63px] font-opensans bg-primary text-white text-[20px] font-normal uppercase hover:bg-accent transition mt-8 md:mt-0"
          />
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden md:grid grid-cols-4 gap-1">
          {items.map((item: any) => (
            <div key={item.id} className="relative h-[320px] bg-white overflow-hidden group">
              <Image src={item.img} alt={item.title} fill className="object-cover opacity-0 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="absolute inset-0 group-hover:bg-black/50 transition"></div>
              <div className="absolute inset-0 px-[1rem] flex flex-col py-[4rem] gap-5 justify-between text-white">
                <Image src={item.number} alt={item.title} width={60} height={50} loading="lazy" className="z-50 h-[40px]" />
                <h3 className="xl:text-[24px] lg:text-[20px] font-mont text-primary font-semibold uppercase group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-[16px] font-opensans mt-1 leading-none">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE SWIPER */}
        <div className="md:hidden relative">
          <Swiper
            slidesPerView={1}
            spaceBetween={12}
            modules={[Navigation]}
            navigation={{
              nextEl: '.services-next',
              prevEl: '.services-prev',
              disabledClass: 'swiper-button-disabled'
            }}
            className="h-[320px]"
            touchReleaseOnEdges
          >
            {items.map((item: any) => (
              <SwiperSlide key={item.id}>
                <div className="relative h-[320px] overflow-hidden ">
                  <Image src={item.img} alt={item.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/60"></div>
                  <div className="absolute inset-0 pl-[60px] py-16 flex flex-col gap-5 justify-between text-white">
                    <Image src={item.number} alt={item.title} width={60} height={50} loading="lazy" className="h-[40px]" />
                    <h3 className="font-mont text-white font-semibold uppercase text-[22px]">{item.title}</h3>
                    <p className="text-[14px] font-opensans leading-none">{item.desc}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* СТРЕЛКИ В СЕРЕДИНЕ */}
          <button className="services-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 text-blue-700 hover:bg-white disabled:opacity-30">&lt;</button>
          <button className="services-next absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 text-blue-700 hover:bg-white disabled:opacity-30">&gt;</button>
        </div>

        <style jsx>{`
          .swiper-button-disabled {
            opacity: 0.3 !important;
            pointer-events: none !important;
          }
        `}</style>
      </div>
    </section>
  );
}
