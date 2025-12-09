'use client';

import { useLocale } from 'next-intl';
import { createNavigation } from 'next-intl/navigation';

const locales = ['uk', 'ru'] as const;

// получаем Link и usePathname из next-intl/navigation
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
            className={`transition-colors ${
              active === loc
                ? 'text-white md:text-secondary'
                : 'text-[#4B5158] hover:white'
            }`}
          >
            {loc.toUpperCase()}
          </Link>

          {/* Разделитель | между языками */}
          {index === 0 && <span className="mx-2 text-[#8B8B8B]">|</span>}
        </div>
      ))}
    </div>
  );
}
