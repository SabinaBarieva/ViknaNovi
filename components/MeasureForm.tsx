'use client';

import { useState } from "react";
import { useTranslations } from 'next-intl';
import { IMaskInput } from "react-imask";
import SuccessModal from "./SuccessModal";

export default function MeasureForm() {
  const t = useTranslations("measure");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    agree: false,
  });

  const [errors, setErrors] = useState<any>({});
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors: any = {};

    if (!form.name.trim()) newErrors.name = t("errors.required");

    const raw = form.phone.replace(/\D/g, "");
    if (raw.length !== 12) newErrors.phone = t("errors.phone");

    if (!form.agree) newErrors.agree = t("errors.agree");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);

    try {
      const res = await fetch("/api/sendContact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", phone: "", agree: false });
        setErrors({});
      }
    } catch {
      alert(t("errors.server"));
    }

    setSending(false);
  };

  return (
    <>
      <section className="container pt-[40px]">
        <div className="relative h-[704px] sm:h-[390px] overflow-hidden bg-cover">
          <img
            src="/measure-bg.jpg"
            alt="Фонове зображення заміру вікон"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70"></div>

          <div className="relative z-10 mx-auto px-4 py-4 h-full flex flex-col justify-center items-center">

            <h2 className="text-[#FAF3F3] text-[26px] md:text-[38px] font-mont font-semibold uppercase text-center">
              {t("title")}
            </h2>

            <p className="text-[#FAF3F3] text-[16px] md:text-[18px] font-opensans mt-2 text-center">
              {t("subtitle")}
            </p>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="mt-6 w-full flex flex-col md:flex-row gap-3 md:gap-6 justify-center"
            >
              <div className="grid gap-2 sm:flex">
                {/* NAME */}
                <div className="w-full md:w-[220px]">
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      setErrors({ ...errors, name: "" });
                    }}
                    placeholder={t("name")}
                    className={`
                      w-full h-[50px] px-4 bg-transparent text-[#FAF3F3]
                      text-[16px] font-opensans outline-none border-b
                      border-[#D9D9D9]
                      focus:border-[#0047FF]
                      ${errors.name ? "border-[#D20000]" : ""}
                    `}
                  />
                  {errors.name && (
                    <p className="flex items-center gap-1 text-[#D20000] text-xs mt-1">
                      <span>⚠️</span> {errors.name}
                    </p>
                  )}
                </div>

                {/* PHONE */}
                <div className="w-full md:w-[220px]">
                  <IMaskInput
                    mask="+38 (000) 000-00-00"
                    lazy={false}
                    value={form.phone}
                    required
                    autoComplete="tel"
                    onAccept={(val: string) => {
                      setForm({ ...form, phone: val });
                      setErrors({ ...errors, phone: "" });
                    }}
                    placeholder="+38 (0__) ___-__-__"
                    className={`
                      w-full h-[50px] px-4 bg-transparent text-[#FAF3F3]
                      text-[16px] font-opensans outline-none border-b
                      border-[#D9D9D9]
                      focus:border-[#0047FF]
                      ${errors.phone ? "border-[#D20000]" : ""}
                    `}
                  />
                  {errors.phone && (
                    <p className="flex items-center gap-1 text-[#D20000] text-xs mt-1">
                      <span>⚠️</span> {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={sending}
                className="
                  w-full md:w-[293px] h-[63px]
                  bg-primary hover:bg-accent text-white
                  font-opensans font-normal text-[20px] uppercase
                  tracking-normal leading-[100%] text-center
                  transition mt-4
                "
              >
                {sending ? t("sending") : t("btn")}
              </button>
            </form>

            {/* CHECKBOX */}
            <label
              htmlFor="agree"
              className="flex items-start gap-2 font-opensans font-normal text-white text-[14px] mt-6 text-left"
            >
              <input
                type="checkbox"
                name="agree"
                id="agree"
                required
                checked={form.agree}
                onChange={(e) => {
                  setForm({ ...form, agree: e.target.checked });
                  setErrors({ ...errors, agree: "" });
                }}
              />
              <span className="leading-tight">{t("agree")}</span>
            </label>

            {errors.agree && (
              <p className="flex items-center gap-1 text-[#D20000] text-xs mt-1">
                <span>⚠️</span> {errors.agree}
              </p>
            )}
          </div>
        </div>
      </section>

      {success && (
        <SuccessModal
          title={t("successTitle")}
          message={t("successMsg")}
          onClose={() => setSuccess(false)}
        />
      )}
    </>
  );
}
