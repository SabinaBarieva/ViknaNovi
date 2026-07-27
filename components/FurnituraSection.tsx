"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

const brands = [
  { id: 1, name: "MACO", img: "/brands/maco.webp" },
  { id: 2, name: "Siegenia", img: "/brands/siegenia.webp" },
  { id: 3, name: "Axor", img: "/brands/axor.webp" },
  { id: 4, name: "Vorne", img: "/brands/vorne.webp" },
];

export default function FurnituraSection() {
  const t = useTranslations("furnitura");

  return (
    <section className="container py-10 md:py-14">
      <div className="max-w-7xl mx-auto">

        <h2 className="title mb-6 pl-2">
          {t("title")}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-2">
          {brands.map((item) => (
            <div
              key={item.id}
              className="bg-[#FAFAFA] h-[100px] sm:h-[128px] flex items-center justify-center rounded p-2"
            >
              <Image
                src={item.img}
                alt={`Logo ${item.name}`}
                width={130}
                height={60}
                className="object-contain max-h-[50px] sm:max-h-[60px]"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
