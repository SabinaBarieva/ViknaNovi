"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

export default function ReviewsSection() {
  const t = useTranslations("reviews");
  const reviews = t.raw("list");

  const [page, setPage] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [perPage, setPerPage] = useState(2);
  const [isDesktop, setIsDesktop] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  // ✅ определяем только мобилка или десктоп
  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setPerPage(2);
        setIsDesktop(false);
      } else {
        setIsDesktop(true);
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const totalPages = isDesktop
    ? reviews.length
    : Math.ceil(reviews.length / perPage);

  const start = isDesktop ? page : page * perPage;
  const visible = isDesktop
    ? reviews
    : reviews.slice(start, start + perPage);

  // ✅ плавное листание по 1 на десктопе
  useEffect(() => {
    if (isDesktop && sliderRef.current) {
      const cardWidth = 320;
      sliderRef.current.style.transform = `translateX(-${page * cardWidth}px)`;
    }
  }, [page, isDesktop]);

  const next = () => {
    setExpanded(null);
    setPage((p) => (p + 1 < totalPages ? p + 1 : p));
  };

  const prev = () => {
    setExpanded(null);
    setPage((p) => (p - 1 >= 0 ? p - 1 : p));
  };

  const progress = ((page + 1) / totalPages) * 100;
  const isFirst = page === 0;
  const isLast = page === totalPages - 1;

  return (
    <section className="container pt-[40px]">

      {/* ================= HEADER ================= */}
      <div className="w-full grid md:flex md:justify-between mb-6">
        <h2 className="title shrink-0 md:pr-[30px] lg:pr-[300px]">
          {t("title")}
        </h2>

        <div className="grid w-full">
          <div className="flex items-center gap-4 text-secondary text-[25px] w-full">
            <span className="font-semibold shrink-0">
              {page + 1}/{totalPages}
            </span>

            {/* ✅ ТВОИ стрелки (десктоп) */}
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

          {/* ✅ ТВОЙ progress bar */}
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

      {/* ================= DESKTOP: ПЛАВНО ПО 1 ================= */}
      {isDesktop && (
        <div className="w-full overflow-hidden">
          <div
            ref={sliderRef}
            className="flex gap-6 transition-transform duration-500 ease-out"
          >
            {reviews.map((item: any, i: number) => {
              const isOpen = expanded === i;

              return (
                <div
                  key={i}
                  className="bg-white p-5 min-w-[300px] max-w-[300px]"
                >
                  <AnimatePresence mode="wait">
                    {!isOpen ? (
                      <motion.p
                        className="text-[16px] mb-4 font-opensans font-normal"
                      >
                        {item.short}
                      </motion.p>
                    ) : (
                      <motion.p
                        className="text-[16px] mb-4 font-opensans font-normal"
                      >
                        {item.full}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* ✅ ТВОИ кнопки */}
                  {!isOpen ? (
                    <button
                      onClick={() => setExpanded(i)}
                      className="flex items-center gap-1 text-primary uppercase font-mont font-semibold text-[22px]"
                    >
                      {t("expand")}
                      <span className="text-[28px]">↗</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setExpanded(null)}
                      className="flex items-center gap-1 text-primary uppercase font-mont font-semibold text-[22px]"
                    >
                      {t("collapse")}
                      <span className="text-[28px]">↘</span>
                    </button>
                  )}

                  <div className="mt-4">
                    <p className="text-[13px] text-black">{item.name}</p>
                    <p className="text-[12px] text-gray-500">{item.status}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= MOBILE: КАК БЫЛО (2 В СТОЛБИК) ================= */}
      {!isDesktop && (
        <div className="grid gap-6 mx-auto grid-cols-1">
          {visible.map((item: any, i: number) => {
            const id = start + i;
            const isOpen = expanded === id;

            return (
              <div key={id} className="bg-white p-5">
                <AnimatePresence mode="wait">
                  {!isOpen ? (
                    <motion.p className="text-[16px] mb-4 font-opensans font-normal">
                      {item.short}
                    </motion.p>
                  ) : (
                    <motion.p className="text-[16px] mb-4 font-opensans font-normal">
                      {item.full}
                    </motion.p>
                  )}
                </AnimatePresence>

                {!isOpen ? (
                  <button
                    onClick={() => setExpanded(id)}
                    className="flex items-center gap-1 text-primary uppercase font-mont font-semibold text-[22px]"
                  >
                    {t("expand")} <span className="text-[28px]">↘</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setExpanded(null)}
                    className="flex items-center gap-1 text-primary uppercase font-mont font-semibold text-[22px]"
                  >
                    {t("collapse")} <span className="text-[28px]">↗</span>
                  </button>
                )}
                
                  <div className="mt-4 text-[16px] text-secondary text-normal text-opensans">
                    <p className="">{item.name}</p>
                    <p className="">{item.status}</p>
                  </div>
              </div>
            );
          })}

          {/* ✅ ТВОИ мобильные стрелки снизу */}
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
    </section>
  );
}
