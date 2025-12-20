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
          <p className="text-sm opacity-90 mb-1"><a href="tel:+380674000202">+38 (067) 400-02-02</a></p>
          <p className="text-sm opacity-90"> <a href="mailto:vn.callcenter@viknanovi.ua">
    vn.callcenter@viknanovi.ua
  </a></p>
        </div>

        {/* SOCIAL ICONS */}
        <div className="flex gap-5 mb-10">
          <Link
            href="https://www.facebook.com/viknanovi.official?locale=ru_RU"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/Facebook.svg" alt="Facebook" width={20} height={20} />
          </Link>
          <Link
            href="https://www.instagram.com/viknanovi_original/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/Insta.svg" alt="Instagram" width={20} height={20} />
          </Link>
          <Link
            href="https://www.youtube.com/@viknanovi_original"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/youtube.svg" alt="YouTube" width={20} height={20} />
          </Link>
        </div>

        {/* ----- SEPARATOR ----- */}
        <div className="w-full h-px bg-white/40 mb-8"></div>
      </div>

      
    </footer>
  );
}