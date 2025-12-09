"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ProfileSystem } from "@/data/profileSystems";

interface Props {
  profile: ProfileSystem;
  locale: "uk" | "ru";
}

export default function ProfileCard({ profile, locale }: Props) {
  const [open, setOpen] = useState(false);

  const t = useTranslations("profileSystems.params");
  const tb = useTranslations("profileSystems");

  const name = `${tb(`brands.${profile.brand}`)} ${profile.code}`;

  const renderStars = (count: number) => (
    <div className="flex gap-[2px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-[16px] ${
            i < count ? "text-blue-600" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );

  return (
    <div className="bg-white p-5 flex flex-col relative">
      {/* IMAGE */}
      <div className="relative w-full flex justify-center mb-4">
        <Image
          src={profile.image}
          alt={name}
          width={220}
          height={260}
          className="object-contain"
        />
      </div>

      {/* NAME */}
      <p className="text-primary text-[22px] font-semibold font-mont mb-3">
        {tb(`brands.${profile.brand}`)}{" "}
        <span>{profile.code}</span>
      </p>

      {/* COLLAPSED VIEW — 3 PARAMS */}
      {!open && (
        <div className="text-[16px] text-secondary font-opensans font-normal flex flex-col gap-1">
          <Row label={t("frameChambers")} value={profile.params.frameChambers} />
          <Row label={t("mountDepthMm")} value={profile.params.mountDepthMm} />
          <Row label={t("glassWidthMm")} value={profile.params.glassWidthMm} />

          {/* BUTTON */}
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-1 text-primary uppercase font-mont font-semibold text-[22px] hover:underline"
            >
              {locale === "uk" ? "Розгорнути" : "Развернуть"}{" "}
              <span className="text-[28px]">↘</span>
            </button>
          </div>
        </div>
      )}

      {/* EXPANDED VIEW */}
      {open && (
                <div className="text-[16px] text-secondary font-opensans font-normal flex flex-col gap-1">

          <Row label={t("frameChambers")} value={profile.params.frameChambers} />
          <Row label={t("sashChambers")} value={profile.params.sashChambers} />
          <Row label={t("mountDepthMm")} value={profile.params.mountDepthMm} />
          <Row label={t("glassWidthMm")} value={profile.params.glassWidthMm} />
          <Row label={t("frameOuterHeightMm")} value={profile.params.frameOuterHeightMm} />
          <Row label={t("frameInnerHeightMm")} value={profile.params.frameInnerHeightMm} />

          <Row label={t("sound")} value={renderStars(profile.soundStars)} />
          <Row label={t("thermal")} value={renderStars(profile.thermalStars)} />

          <Row
            label={t("lamination")}
            value={profile.lamination ? tb("yes") : tb("no")}
          />

          {/* COLLAPSE BUTTON */}
          <div className="flex justify-end mt-3">
            <button
              onClick={() => setOpen(false)}
              className="flex items-center gap-1 text-primary font-mont font-semibold text-[22px] uppercase hover:underline"
            >
              {locale === "uk" ? "Згорнути" : "Свернуть"}{" "}
              <span className="text-[28px]">↗</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({
  label,
  value,
  accent,
  green,
}: {
  label: string;
  value: any;
  accent?: boolean;
  green?: boolean;
}) {
  return (
    <div className="flex justify-between py-[4px] border-b border-gray-100">
      <span className="text-[12px]">{label}</span>
      <span
        className={`text-[12px] ${
          green ? "text-green-600 font-semibold" : ""
        } ${accent ? "text-blue-700 font-semibold" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}
