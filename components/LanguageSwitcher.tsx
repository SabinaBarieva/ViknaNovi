'use client';

import { useLocale } from 'next-intl';
import { createNavigation } from 'next-intl/navigation';

const locales = ['uk', 'ru'] as const;

const { Link, usePathname } = createNavigation({
  locales,
});

export default function LanguageSwitcher() {
  const active = useLocale();
  const pathname = usePathname();

  const href = pathname || '/';

  return (

    <div className="flex items-center font-opensans font-normal text-[14px] uppercase h-11 select-none">
      {locales.map((loc, index) => (
        <div key={loc} className="flex items-center">
          <Link
            href={href}
            locale={loc}
            replace
            scroll={false}
            lang={loc}
            aria-label={`Переключиться на ${loc === 'uk' ? 'українську' : 'російську'} мову`}

            className={`transition-colors py-3 px-2 min-w-[32px] text-center inline-block cursor-pointer ${
              active === loc
                ? 'text-white lg:text-secondary font-semibold' 
                : 'text-[#4B5158] hover:text-white lg:hover:text-primary'
            }`}
          >
            {loc === 'uk' ? 'UA' : 'RU'}
          </Link>


          {index === 0 && <span className="mx-1 text-[#8B8B8B]" aria-hidden="true">|</span>}
        </div>
      ))}
    </div>
  );
}
