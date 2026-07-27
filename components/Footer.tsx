"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contacts" className="bg-[#0033A1] text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">

        {/* LOGO */}
        <Image
          src="/logofooter.svg"
          alt="Логотип ВікнаНові"
          width={180}
          height={50}
          className="mb-6"
        />

        {/* CONTACTS */}
        <div className="text-center mb-6">
          {/* ✅ Увеличен размер шрифта с text-sm (14px) до text-[16px] для удобного клика на мобильном */}
          <p className="text-[16px] opacity-90 mb-2">
            <a href="tel:+380674000202" className="hover:underline py-1 inline-block">+38 (067) 400-02-02</a>
          </p>
          <p className="text-[16px] opacity-90">
            <a href="mailto:vn.callcenter@viknanovi.ua" className="hover:underline py-1 inline-block">
              vn.callcenter@viknanovi.ua
            </a>
          </p>
        </div>

        {/* SOCIAL ICONS — исправлен размер области клика (Пункт 15) */}
        {/* ✅ Изменен gap-5 на gap-2, так как паддинги p-3 внутри ссылок сами увеличат визуальное расстояние */}
        <div className="flex gap-2 mb-10 items-center">
          <Link
            href="https://www.facebook.com/viknanovi.official?locale=ru_RU"
            target="_blank"
            rel="noopener noreferrer"
            // ✅ Добавлен p-3 и w-11 h-11 для создания невидимой области клика 44x44px по стандартам Google
            className="w-11 h-11 flex items-center justify-center p-3 hover:opacity-80 transition"
            aria-label="Facebook компании ВікнаНові"
          >
            <Image src="/Facebook.svg" alt="Facebook" width={20} height={20} />
          </Link>
          
          <Link
            href="https://www.instagram.com/viknanovi_original/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 flex items-center justify-center p-3 hover:opacity-80 transition"
            aria-label="Instagram компании ВікнаНові"
          >
            <Image src="/Insta.svg" alt="Instagram" width={20} height={20} />
          </Link>
          
          <Link
            href="https://www.youtube.com/@viknanovi_original"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 flex items-center justify-center p-3 hover:opacity-80 transition"
            aria-label="YouTube канал компании ВікнаНові"
          >
            <Image src="/youtube.svg" alt="YouTube" width={20} height={20} />
          </Link>
        </div>

        <div className="w-full h-px bg-white/40 mb-8"></div>
      </div>
    </footer>
  );
}
