"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";

import { PORTFOLIO_ITEMS } from "@/data/portfolio";

export default function Portfolio() {
  const t = useTranslations("portfolio");
  const locale = useLocale() as "uk" | "ru";

  const [page, setPage] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);

  const totalItems = PORTFOLIO_ITEMS.length;

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    setIsDesktop(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!sliderRef.current) return;

    const cardWidth = isDesktop ? 420 + 10 : sliderRef.current.offsetWidth;
    sliderRef.current.style.transform = `translateX(-${page * cardWidth}px)`;
  }, [page, isDesktop]);

  const next = () => setPage((p) => (p + 1 < totalItems ? p + 1 : p));
  const prev = () => setPage((p) => (p - 1 >= 0 ? p - 1 : p));

  const progress = ((page + 1) / totalItems) * 100;

  // свайп
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - startX.current;
    if (deltaX > 50) prev();
    else if (deltaX < -50) next();
  };

  return (
    <section className="container pt-[40px]">
      <div className="w-full mx-auto">

        {/* HEADER */}
        <div className="w-full grid md:flex md:justify-between mb-6">
          <div>
            <h2 className="title">{t("title")}</h2>
            <p className="font-opensans">{t("subtitle")}</p>
          </div>

          <div className="grid">
            <div className="flex items-center gap-4  text-secondary text-[25px]">
              <span className="font-semibold">
                {page + 1}/{totalItems}
              </span>

              <div className="hidden md:flex gap-3 ml-auto">
                <button onClick={prev} disabled={page === 0} className="text-[20px] disabled:opacity-30">&larr;</button>
                <button onClick={next} disabled={page === totalItems - 1} className="text-[20px] disabled:opacity-30">&rarr;</button>
              </div>
            </div>

            <div className="w-full mt-2">
              <div className="h-[4px] bg-[#5A5F70] rounded overflow-hidden">
                <motion.div
                  className="h-full bg-bluemorelight"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* SLIDER */}
        <div className="relative overflow-hidden">
          {!isDesktop && (
            <>
              <button onClick={prev} disabled={page === 0}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10   w-10 h-10 bg-white/80 text-blue-700 hover:bg-white disabled:opacity-30">
                &lt;
              </button>
              <button onClick={next} disabled={page === totalItems - 1}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10  w-10 h-10 bg-white/80 text-blue-700 hover:bg-white disabled:opacity-30">
                &gt;
              </button>
            </>
          )}

          <div
            ref={sliderRef}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="flex gap-[10px] transition-transform duration-500 ease-out"
          >
            {PORTFOLIO_ITEMS.map((item, index) => (
              <div key={item.id} className="min-w-full md:min-w-[480px] md:max-w-[480px] h-[430px]">
                <PortfolioCard item={item} locale={locale} priority={index === 0} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PortfolioCard({
  item,
  locale,
  priority = false,
}: {
  item: any;
  locale: "uk" | "ru";
  priority?: boolean;
}) {
  return (
    <div className="h-full">
      <Image
        src={item.image}
        alt={item.title[locale]}
        width={610}
        height={330}
        className="w-full h-full object-cover"
        priority={priority}
      />
    </div>
  );
}
