'use client';

import { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';



export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations('header');

  const navItems = [
    { key: 'about', href: '#about' },
    { key: 'profiles', href: '#profiles' },
    { key: 'sales', href: '#sales' },
    { key: 'contacts', href: '#contacts' }
  ];

  return (
    <header className="container py-4 top-0 z-50 border-b border-transparent">
      {/* КОНТЕЙНЕР */}
      <div className="max-w-[1500px] mx-auto flex items-center justify-between">

        {/* ЛОГО с адаптивом */}
        <div className="flex-shrink-0">

          {/* mobile (до 640px) */}
          <div className="block sm:hidden w-[140px] h-[31px]">
            <Image src="/logo.svg" alt="Logo" width={147} height={31} className="w-full h-auto" />
          </div>

          {/* tablet (640–1024px) */}
          <div className="hidden sm:block lg:hidden w-[147px] h-[31px]">
            <Image src="/logo.svg" alt="Logo" width={147} height={31} className="w-full h-auto" />
          </div>

          {/* desktop (от 1024px) */}
          <div className="hidden lg:block w-[218px] h-[51.5px]">
            <Image src="/logo.svg" alt="Logo" width={218} height={51} className="w-full h-auto" />
          </div>
        </div>

        {/* ЦЕНТРАЛЬНОЕ МЕНЮ */}
<nav
  className={`
    hidden md:flex 
    flex-[2] min-w-0
    justify-center items-center 
    gap-2 lg:gap-6
    font-mont font-medium text-[15px] leading-[100%] tracking-[-0.04em] uppercase text-secondary
  `}
>

          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="hover:text-[#0047AB] transition-colors whitespace-nowrap"
            >
              {t(item.key)}
            </Link>
            
          ))}
        </nav>

        {/* ПРАВАЯ ЧАСТЬ */}
        <div className=" hidden md:flex items-center gap-2">

          {/* Языки */}
          <LanguageSwitcher  />

          {/* Телефон — фиксированный размер */}
          <button
  className={`
    bg-primary flex-shrink-0 text-white 
    font-mont font-normal text-[16px] leading-[100%] uppercase
    px-4 py-2 hover:bg-[#003b8e] transition
    w-[193px] h-[43px]
  `}
>
  +38 (067) 400-02-02
</button>

        </div>

        {/* Бургер на мобильном */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#003366]"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

   {/* МОБИЛЬНОЕ МЕНЮ */}
{menuOpen && (
  <div
    className={`
      fixed inset-0 bg-primary z-40 
      flex flex-col pt-16 px-6 gap-4
      font-mont font-medium text-[15px] leading-[100%] tracking-[-0.04em] uppercase text-white
    `}
  >
    {/* Кнопка закрытия */}
    <button className="absolute top-4 right-4" onClick={() => setMenuOpen(false)}>
      <X size={28} />
    </button>

    {/* Языки сверху */}
    <div className="mb-6">
      <LanguageSwitcher />
    </div>

    {/* Навигация */}
    <nav className="flex flex-col gap-4 text-[15px] uppercase tracking-[-0.04em] font-medium">
      {navItems.map((item) => (
        <Link
          key={item.key}
          href={item.href}
          onClick={() => setMenuOpen(false)}
          className="hover:underline"
        >
          {t(item.key)}
        </Link>
      ))}
    </nav>

    {/* Телефон внизу */}
    <div className="mt-auto mb-10 text-center text-sm opacity-90">
      +38 (067) 400-02-02
    </div>
  </div>
)}

    </header>
  );
}
