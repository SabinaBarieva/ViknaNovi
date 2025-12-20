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
    <div className="flex items-center font-opensans font-normal text-[14px] uppercase">
      {locales.map((loc, index) => (
        <div key={loc} className="flex items-center">
          <Link
            href={href}
            locale={loc}
            replace
            scroll={false}
            lang={loc}
            aria-label={`Переключиться на ${loc === 'uk' ? 'українську' : 'російську'} мову`}
            className={`transition-colors ${
              active === loc
                ? 'text-white md:text-secondary'
                : 'text-[#4B5158] hover:text-white'
            }`}
          >
            {loc === 'uk' ? 'UA' : 'RU'}

          </Link>

          {index === 0 && <span className="mx-2 text-[#8B8B8B]">|</span>}
        </div>
      ))}
    </div>
  );
}
