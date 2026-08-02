"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { IMaskInput } from "react-imask";
import { useTranslations } from "next-intl";
import { createPortal } from "react-dom";
import { Turnstile } from "@marsidev/react-turnstile";

import SuccessModal from "./SuccessModal";
import { trackLead } from "@/lib/trackLead";

type FormFields = {
  name: string;
  phone: string;
  city: string;
};

type FormErrors = {
  name?: string;
  phone?: string;
  city?: string;
};

export default function PromoModal() {
  const t = useTranslations("promoForm");

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState<FormFields>({
    name: "",
    phone: "",
    city: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  // ✅ captcha
  const [token, setToken] = useState("");

  // ✅ anti-bot
  const [startedAt, setStartedAt] = useState(Date.now());
  const [company, setCompany] = useState("");

  useEffect(() => setMounted(true), []);


  useEffect(() => {

    if (typeof window !== "undefined" && sessionStorage.getItem("promo_shown")) {
      return;
    }

    const showModal = () => {
      setOpen(true);
      setStartedAt(Date.now()); 
      sessionStorage.setItem("promo_shown", "true");
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeTimer);
    };


    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 40) {
        showModal();
      }
    };

    const timeTimer = setTimeout(() => {
      showModal();
    }, 15000);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeTimer);
    };
  }, []);

  if (!open || !mounted) return null;

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!form.city.trim()) newErrors.city = t("errors.city");
    if (!form.name.trim()) newErrors.name = t("errors.name");

    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 12) newErrors.phone = t("errors.phone");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (sending) return;
    if (!validate()) return;

    if (!token) {
      alert("Підтвердіть, що ви не робот");
      return;
    }

    setSending(true);

    try {
      const res = await fetch("/api/sendContact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          token,
          company,
          startedAt,
        }),
      });

      if (res.ok) {
        trackLead("promo_modal");

        setSuccess(true);

        setForm({
          name: "",
          phone: "",
          city: "",
        });

        setErrors({});
        setToken("");
        setCompany("");
        setStartedAt(Date.now());

        setTimeout(() => setOpen(false), 3000);
      } else {
        alert(t("errors.server"));
      }
    } catch (err) {
      alert(t("errors.server"));
    } finally {
      setSending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const successModal =
    success && mounted
      ? createPortal(
          <SuccessModal
            title={t("successTitle")}
            message={t("successMsg")}
            onClose={() => {
              setSuccess(false);
              setOpen(false);
            }}
          />,
          document.getElementById("modal-root")!
        )
      : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-[#0B0F1A] p-6 text-white shadow-xl">

        <button
          type="button"
          onClick={() => setOpen(false)}
          className="w-11 h-11 flex items-center justify-center text-[30px] absolute right-1 top-1 z-20 text-white/60 hover:text-white transition cursor-pointer"
          aria-label="Закрыть подарок"
        >
          ✕
        </button>

        {/* BG */}
        <Image
          src="/promomodal/top.webp"
          alt=""
          width={160}
          height={160}
          className="absolute right-0 top-0 z-10 pointer-events-none"
        />

        <Image
          src="/promomodal/bottom.webp"
          alt=""
          width={160}
          height={160}
          className="absolute bottom-0 left-0 z-10 pointer-events-none"
        />

        {/* GIFT */}
        <div className="relative z-20 mb-4 flex justify-center">
          <Image
            src="/promomodal/priz.webp"
            alt="Подарочный купон 500 грн"
            width={90}
            height={90}
          />
        </div>

        <h2 className="relative z-20 mb-6 text-center text-xl font-bold font-mont">
          {t("title")}{" "}
          <span className="text-cyan-400">500 грн</span>
          <br />
          {t("subtitle")}
        </h2>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="relative z-20 space-y-4"
        >
          {/* CITY */}
          <div>
            <input
              name="city"
              type="text"
              value={form.city}
              onChange={handleChange}
              placeholder={t("city")}
              className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-[16px] font-opensans"
              required
            />

            {errors.city && (
              <p className="text-red-400 text-sm mt-1">
                {errors.city}
              </p>
            )}
          </div>

          {/* NAME */}
          <div>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder={t("name")}
              className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-[16px] font-opensans"
              required
            />

            {errors.name && (
              <p className="text-red-400 text-sm mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* PHONE */}
 {/* PHONE */}
<div>
  <IMaskInput
    type="tel"
    inputMode="tel"
    mask="+38 (000) 000-00-00"
    name="phone"
    value={form.phone}

    onAccept={(value: string, mask: any) => {
      setForm({
        ...form,
        phone: mask.value, 
      });

      setErrors({
        ...errors,
        phone: "",
      });
    }}
    placeholder={t("phone")}
    className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-[16px] font-opensans"
    required
  />

  {errors.phone && (
    <p className="text-red-400 text-sm mt-1">
      {errors.phone}
    </p>
  )}
</div>


          {/* 🕳 Honeypot */}
          <input
            type="text"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            autoComplete="off"
            tabIndex={-1}
            className="hidden"
          />

          {/* ✅ CAPTCHA */}
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            onSuccess={(token) => setToken(token)}
          />

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={sending}
            className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 py-3 font-semibold text-black uppercase tracking-wider text-[15px] font-mont transition hover:opacity-95"
          >
            {sending ? t("sending") : t("submit")}
          </button>
        </form>

        {successModal}
      </div>
    </div>
  );
}
