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

  // ✅ Мобилка = 2 карточки, десктоп = по 1
  const perPageMobile = 2;

  const totalPages = isDesktop
    ? PORTFOLIO_ITEMS.length
    : Math.ceil(PORTFOLIO_ITEMS.length / perPageMobile);

  // ✅ определяем мобилку / десктоп
  useEffect(() => {
    const updateLayout = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  useEffect(() => {
    if (isDesktop && sliderRef.current) {
      const cardWidth = 520; 
      sliderRef.current.style.transform = `translateX(-${page * cardWidth}px)`;
    }
  }, [page, isDesktop]);

  const next = () => {
    setPage((p) => (p + 1 < totalPages ? p + 1 : p));
  };

  const prev = () => {
    setPage((p) => (p - 1 >= 0 ? p - 1 : p));
  };

  const isFirst = page === 0;
  const isLast = page === totalPages - 1;

  const progress = ((page + 1) / totalPages) * 100;

  return (
    <section className="container pt-[40px]">
      <div className="w-full mx-auto">

         <div className="w-full grid md:flex md:justify-between mb-6">
          <div className="grid shrink-0 md:pr-[60px] lg:pr-[300px]">
        <h2 className="title ]">
          {t("title")}
        </h2>
        <p className="font-opensans shrink-0 ">
          {t("subtitle")}
        </p>
        </div>

        <div className="grid w-full">
          <div className="flex items-center gap-4 text-secondary text-[25px] w-full">
            <span className="font-semibold shrink-0">
              {page + 1}/{totalPages}
            </span>

            {/*  стрелки (десктоп) */}
            <div className="hidden md:flex items-end gap-3 ml-auto">
              <button
                onClick={prev}
                disabled={isFirst}
                className={`text-[20px] transition ${
                  isFirst ? "opacity-30 cursor-not-allowed" : "hover:text-accent"
                }`}
              >
                &larr;
              </button>

              <button
                onClick={next}
                disabled={isLast}
                className={`text-[20px] transition ${
                  isLast ? "opacity-30 cursor-not-allowed" : "hover:text-accent"
                }`}
              >
                &rarr;
              </button>
            </div>
          </div>


          <div className="w-full mt-2 mb-6">
            <div className="h-[4px] bg-[#5A5F70] rounded overflow-hidden">
              <motion.div
                className="h-full bg-bluemorelight"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
        </div>
        </div>
        </div>

        {/* ================= DESKTOP SLIDER ================= */}
        {isDesktop && (
          <div className="w-full overflow-hidden">
            <div
              ref={sliderRef}
              className="flex gap-[10px] transition-transform duration-500 ease-out"
            >
              {PORTFOLIO_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="min-w-[510px] max-w-[510px] h-[830px] overflow-hidden"
                >
                  <PortfolioCard item={item} locale={locale} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= MOBILE: 2 КАРТОЧКИ ================= */}
        {!isDesktop && (
          <div className="grid gap-6 grid-cols-1">

            {PORTFOLIO_ITEMS
              .slice(page * perPageMobile, page * perPageMobile + perPageMobile)
              .map((item) => (
                <div key={item.id} className="h-[400px]">
                  <PortfolioCard item={item} locale={locale} />
                </div>
              ))}

            {/* МОБИЛЬНЫЕ СТРЕЛКИ */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={prev}
                disabled={isFirst}
                className={`w-10 h-10 border border-blue-700 flex items-center justify-center transition
                  ${isFirst ? "opacity-30 cursor-not-allowed" : "text-blue-700"}
                `}
              >
                &lt;
              </button>

              <button
                onClick={next}
                disabled={isLast}
                className={`w-10 h-10 border border-blue-700 flex items-center justify-center transition
                  ${isLast ? "opacity-30 cursor-not-allowed" : "text-blue-700"}
                `}
              >
                &gt;
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

function PortfolioCard({
  item,
  locale,
}: {
  item: any;
  locale: "uk" | "ru";
}) {
  return (
    <div className="h-full flex flex-col">
      <Image
        src={item.image}
        alt={item.title[locale]}
        width={610}
        height={330}
        className="h-full w-full object-fill"
      />

      {/* <div className="p-5">
        <h3 className="text-blue-700 text-lg font-semibold mb-2">
          {item.title[locale]}
        </h3>

        <p className="text-sm text-gray-700 leading-5">
          {item.description[locale]}
        </p>
      </div> */}
    </div>
  );
}
