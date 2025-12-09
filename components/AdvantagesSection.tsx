"use client";

import { useTranslations } from "next-intl";

export default function AdvantagesSection() {
  const t = useTranslations("advantages");
  const items: any[] = t.raw("items");

  return (
    <section className="container py-12 md:py-16">
      <div className="max-w-7xl mx-auto">

        {/* TITLE */}
        <h2 className="title mb-10">
          {t("title")}
        </h2>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((item, i) => (
            <div key={i}>
              <h3 className="text-[22px] sm:text-[17px] lg:text-[21px] font-semibold mb-2 uppercase text-primary font-mont">
                {item.title}
              </h3>
              <p className="text-[14px] leading-[1] md:text-[16px] font-normal font-opensans text-secondary">
                {item.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
