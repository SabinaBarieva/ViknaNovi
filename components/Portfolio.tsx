'use client';

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const COLORS = [
  { key: "alpin_sheffild_oak", name: { uk: "Альпійський шеффілд", ru: "Альпийский шеффилд" }, texture: "/windowsection/texture/dubshefild.png", frame: "/windowsection/frame/alpin_sheffild_oak.png" },
  { key: "anthracit_grey_sand", name: { uk: "Антрацит піщаний", ru: "Антрацит песчаный" }, texture: "/windowsection/texture/antracit.png", frame: "/windowsection/frame/anthracit_grey_sand.png" },
  { key: "antrasit_dark_wood", name: { uk: "Антрацит дерево", ru: "Антрацит дерево" }, texture: "/windowsection/texture/antracittemniy.png", frame: "/windowsection/frame/antratsit_dark_wood.png" },
  { key: "birch_tree", name: { uk: "Береза", ru: "Берёза" }, texture: "/windowsection/texture/bereza.png", frame: "/windowsection/frame/birch_tree.png" },
  { key: "cloudy_grey", name: { uk: "Хмарно-сірий", ru: "Облачно-серый" }, texture: "/windowsection/texture/greysky.png", frame: "/windowsection/frame/cloudy_grey.png" },
  { key: "dark_cherry", name: { uk: "Темна вишня", ru: "Тёмная вишня" }, texture: "/windowsection/texture/temnavishya.png", frame: "/windowsection/frame/dark_cherry.png" },
  { key: "dark_oak", name: { uk: "Темний дуб", ru: "Тёмный дуб" }, texture: "/windowsection/texture/temniydub.png", frame: "/windowsection/frame/dark_oak.png" },
  { key: "golden_oak", name: { uk: "Золотий дуб", ru: "Золотой дуб" }, texture: "/windowsection/texture/golddub.png", frame: "/windowsection/frame/golden_oak.png" },
  { key: "light_oak", name: { uk: "Світлий дуб", ru: "Светлый дуб" }, texture: "/windowsection/texture/dubsvitliy.png", frame: "/windowsection/frame/light_oak.png" },
  { key: "mahogany", name: { uk: "Махагон", ru: "Махагон" }, texture: "/windowsection/texture/mahagoni.png", frame: "/windowsection/frame/mahogany.png" },
  { key: "montana_oak", name: { uk: "Дуб Монтана", ru: "Дуб Монтана" }, texture: "/windowsection/texture/dubmontana.png", frame: "/windowsection/frame/montana_oak.png" },
  { key: "natural_oak", name: { uk: "Натуральний дуб", ru: "Натуральный дуб" }, texture: "/windowsection/texture/naturedub.png", frame: "/windowsection/frame/natural_oak.png" },
  { key: "oak_terner", name: { uk: "Дуб Тернер", ru: "Дуб Тернер" }, texture: "/windowsection/texture/dubterner.png", frame: "/windowsection/frame/oak_terner.png" },
  { key: "pearl_white", name: { uk: "Перловий білий", ru: "Перламутровый белый" }, texture: "/windowsection/texture/whiteperl.png", frame: "/windowsection/frame/pearl_white.png" },
  { key: "pine_tree", name: { uk: "Сосна", ru: "Сосна" }, texture: "/windowsection/texture/sosna.png", frame: "/windowsection/frame/pine_tree.png" },
  { key: "sea_blue", name: { uk: "Морський синій", ru: "Морской синий" }, texture: "/windowsection/texture/bluesea.png", frame: "/windowsection/frame/sea_blue.png" },
  { key: "sheffild_oak", name: { uk: "Шеффілд дуб", ru: "Шеффилд дуб" }, texture: "/windowsection/texture/dubshefild.png", frame: "/windowsection/frame/sheffield_oak.png" },
  { key: "sheffild_oak_grey", name: { uk: "Шеффілд сірий", ru: "Шеффилд серый" }, texture: "/windowsection/texture/greyslanc.png", frame: "/windowsection/frame/sheffild_oak_grey.png" },
  { key: "slate_grey", name: { uk: "Графітовий сірий", ru: "Графитовый серый" }, texture: "/windowsection/texture/greyslanc.png", frame: "/windowsection/frame/slate_grey.png" },
  { key: "soolblack", name: { uk: "Глибокий чорний", ru: "Глубокий чёрный" }, texture: "/windowsection/texture/blackcold.png", frame: "/windowsection/frame/soolblack.png" },
  { key: "walnut", name: { uk: "Горіх", ru: "Орех" }, texture: "/windowsection/texture/nut.png", frame: "/windowsection/frame/walnut.png" }
];

export default function WindowDesigner() {
  const t = useTranslations("windowDesigner");
  const [selected, setSelected] = useState(COLORS[0]);

  return (
    <section className="container pt-[40px]">
      <h2 className="title">{t("title")}</h2>

      <div className="grid md:flex gap-10 relative overflow-hidden md:justify-between bg-cover p-10 lg:p-20">
        <Image
          src="/windowsection.png"
          fill
          alt="Дизайн пластикового вікна"

          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70"></div>

        {/* Блок фільтрів */}
        <aside className="w-full h-max md:w-[320px] z-10 bg-white p-5 lg:p-10 flex flex-col gap-6">
          <h3 className="font-mont text-primary font-semibold text-[24px] uppercase">{t("filters")}</h3>

          <div>
            <h3 className="uppercase mb-4 font-mont text-primary font-semibold text-[18px]">{t("frameColors")}</h3>
            <div className="grid grid-cols-4 gap-3">
              {COLORS.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setSelected(c)}
                  className={`relative w-10 h-10 rounded-full border transition ${
                    selected.key === c.key
                      ? "border-blue-600 scale-110"
                      : "border-gray-300"
                  }`}
                >
                  <Image
                    src={c.texture}
                    alt={c.name.uk}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                    loading="lazy"
                  />
                  {selected.key === c.key && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex flex-col items-center">
          <Image
            src={selected.frame}
            alt={selected.name.uk}
            width={520}
            height={520}
            loading="lazy"
            className="object-contain drop-shadow-xl"
          />
          <div className="w-full z-10 mt-4 px-6 py-3 bg-[#FFFFFF] font-mont text-primary font-semibold text-[24px] text-center uppercase">
            {selected.name.uk}
          </div>
        </div>
      </div>
    </section>
  );
}

