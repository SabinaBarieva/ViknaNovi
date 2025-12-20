"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import ProfileCard from "./ProfileCard";
import { PROFILE_SYSTEMS, Segment, Brand } from "@/data/profileSystems";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const ALL_SEGMENTS: Segment[] = ["econom", "standard", "premium"];
const ALL_BRANDS: Brand[] = ["ViknaNovi", "WDS","Rehau"];

export default function ProfileSystems() {
  const t = useTranslations("profileSystems");
  const locale = useLocale() as "uk" | "ru";

  const [segments, setSegments] = useState<Segment[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  const toggleSegment = (seg: Segment) => {
    setSegments(prev =>
      prev.includes(seg) ? prev.filter(s => s !== seg) : [...prev, seg]
    );
  };

  const toggleBrand = (brand: Brand) => {
    setBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const filtered = useMemo(() => {
    return PROFILE_SYSTEMS.filter(p => {
      const segOk = segments.length === 0 || segments.includes(p.segment);
      const brandOk = brands.length === 0 || brands.includes(p.brand);
      return segOk && brandOk;
    });
  }, [segments, brands]);

  return (
    <section id="profiles" className="container pt-[40px]">
      <h2 className="title">{t("title")}</h2>

      <div className="flex flex-col md:flex-row gap-5">
        {/* ФИЛЬТРЫ */}
        <aside className="w-full h-max md:w-[260px] bg-white p-5 rounded shadow pr-[100px] z-10"
        aria-label={t("filters")}>
          <h3 className="text-[24px] font-mont uppercase font-semibold text-primary mb-8">
            {t("filters")}
          </h3>

          <p className="mb-6 font-semibold font-mont text-[18px] uppercase text-primary">
            {t("segment")}
          </p>
          <div className="flex flex-col gap-2 mb-5">
            {ALL_SEGMENTS.map((s) => (
              <label key={s} className="flex gap-2 text-[16px] font-opensans text-secondary">
                <input
                  type="checkbox"
                  checked={segments.includes(s)}
                  onChange={() => toggleSegment(s)}
                />
                {t(`segments.${s}`)}
              </label>
            ))}
          </div>

          <p className="mb-2 font-semibold font-mont text-[18px] uppercase text-primary">
            {t("brand")}
          </p>
          <div className="flex flex-col gap-2">
            {ALL_BRANDS.map((b) => (
              <label key={b} className="flex gap-2 text-[16px] font-opensans text-secondary uppercase">
                <input
                  type="checkbox"
                  checked={brands.includes(b)}
                  onChange={() => toggleBrand(b)}
                />
                {t(`brands.${b}`)}
              </label>
            ))}
          </div>
        </aside>

        {/* СЛАЙДЕР */}
        <div className="w-full relative overflow-hidden">
          <Swiper
            key={filtered.length}
            slidesPerView={1}
            spaceBetween={2}
            breakpoints={{
              768: {
                slidesPerView: 2,
                slidesPerGroup: 2,
              }
            }}
            modules={[Navigation]}
            navigation={{
              nextEl: ".profiles-next",
              prevEl: ".profiles-prev",
              disabledClass: "swiper-button-disabled",
            }}
          >
            {filtered.map(profile => (
              <SwiperSlide key={profile.id} className="!w-full md:!w-1/2">
                <div className="p-2">
                  <ProfileCard profile={profile} locale={locale} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* СТРЕЛКИ */}
          <button className="profiles-prev absolute top-[200px] -translate-y-1/2 left-2 z-10 w-10 h-10 bg-white/80 text-blue-700 hover:bg-white disabled:opacity-30">
            &lt;
          </button>
          <button className="profiles-next absolute top-[200px] -translate-y-1/2 right-2 z-10 w-10 h-10 bg-white/80 text-blue-700 hover:bg-white disabled:opacity-30">
            &gt;
          </button>
        </div>
      </div>

      <style jsx>{`
        .swiper-button-disabled {
          opacity: 0.3 !important;
          pointer-events: none !important;
        }
      `}</style>
    </section>
  );
}
