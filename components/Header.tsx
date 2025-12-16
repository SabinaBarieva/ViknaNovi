"use client";

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
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
    <header className="fixed bg-[#EDEEEF] left-0 w-full py-4 z-50 border-b border-transparent">
      <div className="container max-w-[1500px] mx-auto flex items-center justify-between lg:gap-6 gap-4 flex-wrap lg:flex-nowrap">

        {/* БУРГЕР, ЛОГО, ТЕЛЕФОН ДЛЯ МОБИЛЬНОЙ ВЕРСИИ */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-[#003366]"
              aria-label="Открыть меню"
            >
              {menuOpen ? <X size={28} /> : (
                <div className="flex flex-col gap-[5px] ml-1">
                  <div className="w-[16px] h-[2px] bg-[#003366] "></div>
                  <div className="w-[24px] h-[2px] bg-[#003366] "></div>
                </div>
              )}
            </button>

            <div className="block lg:hidden w-[140px] h-[31px]">
              <Image src="/logo.svg" alt="Logo" width={147} height={31} className="w-full h-auto" />
            </div>
          </div>

          <a
            href="tel:+380674000202"
            className="lg:hidden bg-primary text-white font-mont text-[14px] px-3 py-1.5"
          >
            +38 (067) 400-02-02
          </a>
        </div>

        {/* Десктоп логотип */}
        <div className="hidden lg:block xl:hidden w-[127px] h-[31px]">
          <Image src="/logo.svg" alt="Logo" width={127} height={31} className="w-full h-auto" />
        </div>
        <div className="hidden xl:block w-[218px] h-[51.5px]">
          <Image src="/logo.svg" alt="Logo" width={218} height={51} className="w-full h-auto" />
        </div>

        {/* НАВИГАЦИЯ */}
        <nav
          className="hidden lg:flex flex-[2] min-w-0 justify-center items-center gap-2 lg:gap-6 font-mont font-medium text-[15px] leading-[100%] tracking-[-0.04em] uppercase text-secondary"
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

        <div className="hidden lg:flex items-center gap-2">
          <LanguageSwitcher />

          <a
            href="tel:+380674000202"
            className="bg-primary text-white font-mont font-normal text-[16px] uppercase px-4 py-2 hover:bg-[#003b8e] transition w-[193px] h-[43px] flex items-center justify-center"
          >
            +38 (067) 400-02-02
          </a>
        </div>
      </div>

      {/* МОБИЛЬНОЕ МЕНЮ */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-primary z-40 flex flex-col pt-16 px-6 gap-4 font-mont font-medium text-[15px] leading-[100%] tracking-[-0.04em] uppercase text-white"
        >
          <button className="absolute top-4 right-4" onClick={() => setMenuOpen(false)} aria-label="Закрыть меню">
            <X size={28} />
          </button>

          <div className="mb-6">
            <LanguageSwitcher />
          </div>

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

          <div className="mt-auto mb-10 text-center text-sm opacity-90">
            <a
              href="tel:+380674000202"
              className="inline-block text-primary font-mont text-[14px] px-4 py-2"
            >
              +38 (067) 400-02-02
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
