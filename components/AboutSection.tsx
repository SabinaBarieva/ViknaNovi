import { useTranslations } from 'next-intl';
import { YouTubeEmbed } from '@next/third-parties/google'; 

export default function AboutSection() {
  const t = useTranslations('about');

  return (
    <section id="about" className="container pt-[40px]">
      <div className="w-full mx-auto">
        <div className="w-max-content grid md:grid-cols-2 gap-2 lg:gap-10 items-start">
          <div>
            <h2 className="title">{t('title')}</h2>

            <p className="font-opensans font-normal text-[16px] leading-relaxed text-secondary mb-2">{t('text1')}</p>
            <p className="font-opensans font-normal text-[16px] leading-relaxed text-secondary mb-2">{t('text2')}</p>
            <p className="font-opensans font-normal text-[16px] leading-relaxed text-secondary mb-4">{t('text3')}</p>

            <div className="grid md:flex xl:gap-6 gap-3 items-center">
              <div className="text-center border-b-2 border-borderGray md:pr-1 py-4 md:text-left md:border-b-0 md:border-r-2 md:border-white">
                <p className="font-semibold font-mont text-[24px] xl:text-[32px] text-primary mb-1">1500+</p>
                <p className="text-[16px] leading-normal font-normal font-opensans text-secondary">
                  {t('stat1')}
                </p>
              </div>

              <div className="text-center border-b-2 border-borderGray py-4 md:text-left md:border-b-0 md:border-r-2 md:border-white">
                <p className="font-semibold font-mont text-[24px] xl:text-[32px] text-primary mb-1">500000+</p>
                <p className="text-[16px] leading-normal font-normal font-opensans text-secondary">
                  {t('stat2')}
                </p>
              </div>

              <div className="text-center border-b-2 border-borderGray py-4 md:text-left md:border-b-0">
                <p className="font-semibold font-mont text-[24px] xl:text-[32px] text-primary mb-1 px-1">95%</p>
                <p className="text-[16px] leading-normal font-normal font-opensans text-secondary">
                  {t('stat3')}
                </p>
              </div>
            </div>
          </div>


<div className="w-full aspect-video overflow-hidden rounded-md shadow-sm">
  <YouTubeEmbed 
    videoid="MtywbdmLF1w" 

    params="controls=1&loop=0"
  />
</div>


        </div>
      </div>
    </section>
  );
}
