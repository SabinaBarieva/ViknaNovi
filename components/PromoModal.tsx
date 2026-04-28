"use client";

import { useEffect, useState } from "react";
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

  // 👇 токен капчи
  const [token, setToken] = useState("");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 800);
    return () => clearTimeout(timer);
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

    // ❗ проверка капчи
    if (!token) {
      alert("Подтвердите, что вы не робот");
      return;
    }

    setSending(true);

    try {
      const res = await fetch("/api/sendContact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          token, // 👈 отправляем капчу
        }),
      });

      if (res.ok) {
        trackLead("promo_modal");

        setSuccess(true);
        setForm({ name: "", phone: "", city: "" });
        setErrors({});
        setToken(""); // сброс токена
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
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-[#0B0F1A] p-6 text-white shadow-xl">
        <button
          onClick={() => setOpen(false)}
          className="text-[30px] absolute right-2 top-0 z-20 text-white/60 hover:text-white"
        >
          ✕
        </button>

        <Image
          src="/promomodal/top.webp"
          alt=""
          width={160}
          height={160}
          className="absolute right-0 top-0 z-10"
        />
        <Image
          src="/promomodal/bottom.webp"
          alt=""
          width={160}
          height={160}
          className="absolute bottom-0 left-0 z-10"
        />

        <div className="relative z-20 mb-4 flex justify-center">
          <Image src="/promomodal/priz.webp" alt="" width={90} height={90} />
        </div>

        <h2 className="relative z-20 mb-6 text-center text-xl font-bold">
          {t("title")} <span className="text-cyan-400">500 грн</span> <br />
          {t("subtitle")}
        </h2>

        <form onSubmit={handleSubmit} className="relative z-20 space-y-4">
          <div>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder={t("city")}
              className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3"
            />
            {errors.city && <p className="text-red-400 text-sm">{errors.city}</p>}
          </div>

          <div>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={t("name")}
              className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3"
            />
            {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
          </div>

          <div>
            <IMaskInput
              mask="+38 (000) 000-00-00"
              name="phone"
              value={form.phone}
              onAccept={(value: any) => {
                setForm({ ...form, phone: value });
                setErrors({ ...errors, phone: "" });
              }}
              placeholder={t("phone")}
              className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3"
            />
            {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
          </div>

          {/* 👇 КАПЧА */}
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            onSuccess={(token) => setToken(token)}
          />

          <button
            type="submit"
            disabled={sending}
            className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 py-3 font-semibold text-black"
          >
            {sending ? t("sending") : t("submit")}
          </button>
        </form>

        {successModal}
      </div>
    </div>
  );
}