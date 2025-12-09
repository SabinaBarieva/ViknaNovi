'use client';

import { useTranslations } from 'next-intl';

export default function AboutSection() {
  const t = useTranslations('about');

  return (
    <section id="about" className="container pt-[40px]">
      <div className="w-full mx-auto">

        {/* GRID */}
        <div className="w-max-content grid md:grid-cols-2 gap-2 lg:gap-10 items-start">

          {/* ===== ЛЕВАЯ КОЛОНКА — ТЕКСТ ===== */}
          <div>

            <h2 className="title">
              {t('title')}
            </h2>

            <p className="font-opensans font normal text-[16px] leading-[1] text-secondary mb-2">{t('text1')}</p>
            <p className="font-opensans font normal text-[16px] leading-[1] text-secondary mb-2">{t('text2')}</p>
            <p className="font-opensans font normal text-[16px] leading-[1] text-secondary mb-4">{t('text3')}</p>


            {/* ===== СТАТИСТИКА ===== */}
            <div className="grid md:flex xl:gap-6 gap-3 align-center  ">

              <div className="text-center border-b-2 border-#DDDDDD md:pr-1 py-4 md:text-left md:border-b-0 md:border-r-2 md:border-white">
                <p className="font-semibold font-mont text-[24px] xl:text-[32px] text-primary mb-1">1500+</p>
                <p className="text-[16px] leading-[1] font-normal font-opensans text-secondary">
                  {t('stat1')}
                </p>
              </div>

                            <div className="text-center border-b-2 border-#DDDDDD py-4 md:text-left md:border-b-0 md:border-r-2 md:border-white">

                <p className="font-semibold font-mont text-[24px] xl:text-[32px] text-primary mb-1">500000+</p>
                <p className="text-[16px] leading-[1] font-normal font-opensans text-secondary">
                  {t('stat2')}
                </p>
              </div>

                            <div className="text-center border-b-2 border-#DDDDDD py-4 md:text-left md:border-b-0">

                <p className="font-semibold font-mont text-[24px] xl:text-[32px] text-primary mb-1 px-1">95%</p>
                <p className="text-[16px] leading-[1] font-normal font-opensans text-secondary">
                  {t('stat3')}
                </p>
              </div>

            </div>
          </div>

          {/* ===== ПРАВАЯ КОЛОНКА — ВИДЕО ===== */}
          <div className="w-full h-[100%] bg-black flex md:flex-col justify-center">
            <div className="w-full h-wull max-w-[650px] ">
              <iframe
                className="aspect-video rounded-sm shadow-md"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                title="ViknaNovi video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
