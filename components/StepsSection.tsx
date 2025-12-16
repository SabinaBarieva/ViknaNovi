'use client';

import { useTranslations } from 'next-intl';

export default function StepsSection() {
  const t = useTranslations('steps');
  const steps = t.raw('items');

  return (
    <section className="container py-12 md:py-16">
      <div className="max-w-7xl mx-auto">

        {/* Заголовок */}
        <h2 className="title mb-8">
          {t('title')}
        </h2>

        {/* Сетка шагов */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-4">
          {steps.map((step: any, i: number) => {
            const bgColor = i % 2 === 0 ? 'bg-white' : 'bg-[#8181811A]';
            const bgNumber = i % 2 === 0 ? 'bg-[#8181811A]' : 'bg-white';

            return (
              <div
                key={i}
                className={`${bgColor} p-5 md:p-6`}
              >
                <div className={`w-[45px] h-[45px] flex items-center justify-center rounded-full ${bgNumber} font-mont text-primary font-semibold text-[22px] lg:text-[24px] mb-4`}>
                  {step.id}
                </div>

                <h3 className="text-primary font-mont font-semibold uppercase text-[22px] lg:text-[24px] mb-2">
                  {step.title}
                </h3>

                <p className="text-[14px] lg:text-[16px] leading-[1] text-secondary font-opensans font-normal">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
