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

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mql.matches);

    const handleResize = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", handleResize);
    return () => mql.removeEventListener("change", handleResize);
  }, []);

  const totalPages = isDesktop
    ? reviews.length
    : Math.ceil(reviews.length / perPage);

  const start = isDesktop ? page : page * perPage;
  const visible = isDesktop ? reviews : reviews.slice(start, start + perPage);

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
      <div className="w-full grid md:flex md:justify-between mb-6">
        <h2 className="title shrink-0 md:pr-[30px] lg:pr-[300px]">
          {t("title")}
        </h2>

        <div className="grid w-full">
          <div className="flex items-center gap-4 text-secondary text-[25px] w-full">
            <span className="font-semibold shrink-0">
              {page + 1}/{totalPages}
            </span>
            <div className="hidden md:flex items-end gap-3 ml-auto">
              <button
                onClick={prev}
                disabled={isFirst}
                aria-label="Назад"
                className={`text-[20px] transition ${
                  isFirst ? "opacity-30 cursor-not-allowed" : "hover:text-accent"
                }`}
              >
                &larr;
              </button>
              <button
                onClick={next}
                disabled={isLast}
                aria-label="Вперёд"
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

      {isDesktop ? (
        <div className="w-full overflow-hidden">
          <div
            ref={sliderRef}
            className="flex gap-6 transition-transform duration-500 ease-out"
          >
            {reviews.map((item: any, i: number) => (
              <ReviewCard
                key={i}
                item={item}
                index={i}
                expanded={expanded}
                setExpanded={setExpanded}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-6 mx-auto grid-cols-1">
          {visible.map((item: any, i: number) => {
            const id = start + i;
            return (
              <ReviewCard
                key={id}
                item={item}
                index={id}
                expanded={expanded}
                setExpanded={setExpanded}
              />
            );
          })}

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={prev}
              disabled={isFirst}
              aria-label="Назад"
              className={`w-10 h-10 border border-blue-700 flex items-center justify-center transition ${
                isFirst ? "opacity-30 cursor-not-allowed" : "text-blue-700"
              }`}
            >
              &lt;
            </button>
            <button
              onClick={next}
              disabled={isLast}
              aria-label="Вперёд"
              className={`w-10 h-10 border border-blue-700 flex items-center justify-center transition ${
                isLast ? "opacity-30 cursor-not-allowed" : "text-blue-700"
              }`}
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function ReviewCard({
  item,
  index,
  expanded,
  setExpanded,
}: {
  item: any;
  index: number;
  expanded: number | null;
  setExpanded: (n: number | null) => void;
}) {
  const t = useTranslations("reviews");
  const isOpen = expanded === index;

  return (
    <div className="bg-white p-5 min-w-[300px] max-w-[300px]">
      <AnimatePresence mode="wait">
        <motion.p
          className="text-[16px] mb-4 font-opensans font-normal"
          key={isOpen ? "full" : "short"}
        >
          {isOpen ? item.full : item.short}
        </motion.p>
      </AnimatePresence>

      <button
        onClick={() => setExpanded(isOpen ? null : index)}
        className="flex items-center gap-1 text-primary uppercase font-mont font-semibold text-[22px]"
      >
        {isOpen ? t("collapse") : t("expand")}
        <span className="text-[28px]">{isOpen ? "↘" : "↗"}</span>
      </button>

      <div className="mt-4">
        <p className="text-[13px] text-black">{item.name}</p>
        <p className="text-[12px] text-gray-500">{item.status}</p>
      </div>
    </div>
  );
}
