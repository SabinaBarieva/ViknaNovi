"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { IMaskInput } from "react-imask";
import { Turnstile } from "@marsidev/react-turnstile";

import SuccessModal from "./SuccessModal";
import { trackLead } from "@/lib/trackLead";

type FormFields = {
  name: string;
  phone: string;
  message: string;
  agree: boolean;
};

type FormErrors = {
  name?: string;
  phone?: string;
  message?: string;
  agree?: string;
};

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function FeedbackModal({ open, onClose }: Props) {
  const t = useTranslations("feedbackForm");

  const [mounted, setMounted] = useState(false);

  const [form, setForm] = useState<FormFields>({
    name: "",
    phone: "",
    message: "",
    agree: false,
  });

  const [token, setToken] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!open || !mounted) return null;

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) newErrors.name = t("errors.required");

    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 12) newErrors.phone = t("errors.phone");

    if (!form.agree) newErrors.agree = t("errors.agree");

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
          token,
        }),
      });

      if (res.ok) {
        trackLead("feedback_modal");

        setSuccess(true);
        setForm({ name: "", phone: "", message: "", agree: false });
        setErrors({});
        setToken("");
      } else {
        alert(t("errors.server"));
      }
    } catch (err) {
      alert(t("errors.server"));
    } finally {
      setSending(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });

    setErrors({ ...errors, [name]: "" });
  };

  const successModal = success
    ? createPortal(
        <SuccessModal
          title={t("successTitle")}
          message={t("successMsg")}
          onClose={() => {
            setSuccess(false);
            onClose();
          }}
        />,
        document.getElementById("modal-root")!
      )
    : null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm">
      <div className="w-[360px] bg-primary text-white p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white text-3xl"
        >
          ×
        </button>

        <h2 className="text-[26px] font-mont font-semibold uppercase mb-6 pr-6">
          {t("title")}
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder={t("name")}
            className="w-full bg-transparent border border-white/50 px-3 py-2"
          />

          <IMaskInput
            mask="+38 (000) 000-00-00"
            name="phone"
            value={form.phone}
            onAccept={(value: any) => {
              setForm({ ...form, phone: value });
              setErrors({ ...errors, phone: "" });
            }}
            placeholder={t("phone")}
            className="w-full bg-transparent border border-white/50 px-3 py-2"
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder={t("message")}
            rows={4}
            className="w-full bg-transparent border border-white/50 px-3 py-2"
          />

          {/* 👇 КАПЧА */}
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            onSuccess={(token) => setToken(token)}
          />

          <button
            type="submit"
            disabled={sending}
            className="w-full bg-white text-secondary py-3"
          >
            {sending ? t("sending") : t("submit")}
          </button>

          <label className="flex gap-2 text-[14px]">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
            />
            <span>{t("policy")}</span>
          </label>
        </form>

        {successModal}
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
}