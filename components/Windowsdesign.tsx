'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

import { WINDOW_COLORS, WindowColor } from '@/data/windowColors';

export default function WindowDesigner() {
  const t = useTranslations('windowDesigner');
  const locale = useLocale() as 'uk' | 'ru';

  const [selected, setSelected] = useState<WindowColor>(WINDOW_COLORS[0]);

  const standardColors = WINDOW_COLORS.filter(c => c.type === 'standard');
  const nonStandardColors = WINDOW_COLORS.filter(c => c.type === 'nonstandard');

  return (
    <section className="container pt-[40px]">
      <h2 className="title">{t('title')}</h2>

      <p className="font-opensans text-[16px] text-secondary mb-6">
        {t('chooseStyle')}
      </p>

      <div className="grid md:flex gap-10 relative overflow-hidden md:justify-between bg-cover p-5 lg:p-10">
        <Image
          src="/windowsection.png"
          fill
          alt="Дизайн пластикового вікна"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70"></div>

        {/* ФИЛЬТРЫ */}
        <aside className="w-full h-max md:w-[320px] z-10 bg-white p-5 flex flex-col gap-8">
          <h3 className="font-mont text-primary font-semibold text-[24px] uppercase">
            {t('filters')}
          </h3>

          {/* СТАНДАРТНЫЕ */}
          <div>
            <h4 className="uppercase mb-4 font-mont text-primary font-semibold text-[18px]">
              {t('frameColors')}
            </h4>

            <div className="grid grid-cols-4 gap-3">
              {standardColors.map(color => (
                <ColorButton
                  key={color.key}
                  color={color}
                  selected={selected}
                  onSelect={setSelected}
                  locale={locale}
                />
              ))}
            </div>
          </div>

          {/* НЕСТАНДАРТНЫЕ */}
          <div>
            <h4 className="uppercase mb-4 font-mont text-primary font-semibold text-[18px]">
              {t('unusualColors')}
            </h4>

            <div className="grid grid-cols-4 gap-3">
              {nonStandardColors.map(color => (
                <ColorButton
                  key={color.key}
                  color={color}
                  selected={selected}
                  onSelect={setSelected}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        </aside>

        {/* ПРЕВЬЮ */}
        <div className="flex flex-col items-center z-10">
          <Image
            src={selected.frame}
            alt={selected.name[locale]}
            width={520}
            height={520}
            loading="lazy"
            className="object-contain drop-shadow-xl"
          />

          <div className="w-full mt-4 px-6 py-3 bg-white font-mont text-primary font-semibold text-[24px] text-center uppercase">
            {selected.name[locale]}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================== */
/* COLOR BUTTON */
/* ================== */

function ColorButton({
  color,
  selected,
  onSelect,
  locale,
}: {
  color: WindowColor;
  selected: WindowColor;
  onSelect: (c: WindowColor) => void;
  locale: 'uk' | 'ru';
}) {
  const isActive = selected.key === color.key;

  return (
    <button
      onClick={() => onSelect(color)}
      className={`relative w-10 h-10 rounded-full border transition ${
        isActive ? 'border-blue-600 scale-110' : 'border-gray-300'
      }`}
      title={color.name[locale]}
    >
      <Image
        src={color.texture}
        alt={color.name[locale]}
        width={40}
        height={40}
        className="rounded-full object-cover"
        loading="lazy"
      />

      {isActive && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="white"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </span>
      )}
    </button>
  );
}
