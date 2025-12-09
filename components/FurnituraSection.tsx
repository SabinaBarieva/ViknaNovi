"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

const brands = [
  { id: 1, img: "/brands/axorwin.webp"},
  { id: 2, img: "/brands/maco.webp" },
  { id: 3, img: "/brands/siegenia.webp" },
  { id: 4, img: "/brands/axor.webp" },
  { id: 5, img: "/brands/wds.webp" },
  { id: 6, img: "/brands/vorne.webp" },
];

export default function FurnituraSection() {
  const t = useTranslations("furnitura");

  return (
    <section className="container py-10 md:py-14">
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <h2 className="title mb-6 pl-2">
          {t("title")}
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-2">
          {brands.map((item) => (
            <div
              key={item.id}
              className="bg-[#FAFAFA] h-[128px] flex items-center justify-center 
                         "
            >
              <Image
                src={item.img}
                alt="brand"
                width={130}
                height={60}
                className="object-contain max-h-[60px]"
                priority
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
