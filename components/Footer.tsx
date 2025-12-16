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
          <p className="text-sm opacity-90 mb-1">+ 38 (067) 400-02-02</p>
          <p className="text-sm opacity-90">vn.callcenter@viknanovi.ua</p>
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

      {/* SEO: структурированные данные о компании */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "ВікнаНові",
            "url": "https://viknanovi.ua",
            "logo": "https://viknanovi.ua/logofooter.svg",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+38 (067) 400-02-02",
              "email": "vn.callcenter@viknanovi.ua",
              "contactType": "customer support",
              "areaServed": "UA",
              "availableLanguage": ["Ukrainian", "Russian"]
            },
            "sameAs": [
              "https://www.facebook.com/viknanovi.official?locale=ru_RU",
              "https://www.instagram.com/viknanovi_original/",
              "https://www.youtube.com/@viknanovi_original"
            ]
          })
        }}
      />
    </footer>
  );
}
