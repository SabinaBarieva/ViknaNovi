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
          alt="ВікнаНові"
          width={180}
          height={50}
          className="mb-6"
        />

        {/* CONTACTS */}
        <div className="text-center mb-6">
          <p className="text-sm opacity-90 mb-1">+ 38 (067) 400-02-02</p>
          <p className="text-sm opacity-90">vn.callcenter@viknanovi.ua</p>
        </div>

        {/* SOCIAL ICONS */}
        <div className="flex gap-5 mb-10">
          <Link href="#">
            <Image src="/Facebook.svg" alt="fb" width={20} height={20} />
          </Link>
          <Link href="#">
            <Image src="/Insta.svg" alt="ig" width={20} height={20} />
          </Link>
          <Link href="#">
            <Image src="/youtube.svg" alt="yt" width={20} height={20} />
          </Link>
        </div>

        {/* ----- SEPARATOR ----- */}
        <div className="w-full h-px bg-white/40 mb-8"></div>

      </div>
    </footer>
  );
}
