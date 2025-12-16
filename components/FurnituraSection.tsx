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

        {/* Title */}
        <h2 className="title mb-6 pl-2">
          {t("title")}
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {brands.map((item) => (
            <div
              key={item.id}
              className="bg-[#FAFAFA] h-[128px] flex items-center justify-center"
            >
              <Image
                src={item.img}
                alt={`Фурнітура ${item.name}`}
                width={130}
                height={60}
                className="object-contain max-h-[60px]"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* SEO Schema.org — список брендов фурнітури */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Бренди фурнітури",
            "itemListElement": brands.map((brand, index) => ({
              "@type": "Product",
              "position": index + 1,
              "name": brand.name,
              "image": `https://viknanovi.ua${brand.img}`,
              "brand": brand.name
            }))
          })
        }}
      />
    </section>
  );
}
