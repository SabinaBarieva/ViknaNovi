"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { IMaskInput } from "react-imask";
import SuccessModal from "./SuccessModal";

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
    agree: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!open || !mounted) return null;

  // ---------------------- VALIDATION -----------------------
  const validate = () => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) newErrors.name = t("errors.required");

    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 12) newErrors.phone = t("errors.phone");

    // if (!form.message.trim()) newErrors.message = t("errors.required");

    if (!form.agree) newErrors.agree = t("errors.agree");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------------------- SUBMIT -----------------------
  const handleSubmit = async (e: React.FormEvent) => {
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

        // Clear form after success
        setForm({ name: "", phone: "",  message: "", agree: false });
        setErrors({});
      }
    } catch (err) {
      alert(t("errors.server"));
    }

    setSending(false);
  };

  // ---------------------- INPUT HANDLER -----------------------
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });

    setErrors({ ...errors, [name]: "" });
  };

  // ---------------------- SUCCESS MODAL PORTAL -----------------------
  const successModal = success
    ? createPortal(
        <SuccessModal
          title={t("successTitle")}
          message={t("successMsg")}
          onClose={() => {
            setSuccess(false); // close success modal
            onClose(); // close main modal AFTER pressing OK
          }}
        />,
        document.getElementById("modal-root")!
      )
    : null;

  // ---------------------- MAIN JSX -----------------------
  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm">

      <div className="w-[360px] bg-primary text-white p-6  relative animate-fadeIn">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white text-3xl leading-none"
        >
          ×
        </button>

        {/* TITLE */}
        <h2 className="text-[26px] font-mont font-semibold uppercase mb-6 pr-6">
          {t("title")}
        </h2>

        {/* FORM */}
        <form className="flex flex-col font-opensans text-[16px] gap-4" onSubmit={handleSubmit}>

          {/* NAME */}
          <div>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={t("name")}
              className="w-full font-opensans text-[16px] bg-transparent border border-white/50 px-3 py-2 placeholder-white/70"
            />
            {errors.name && <p className="text-red-300 text-sm">{errors.name}</p>}
          </div>

          {/* PHONE */}
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
              className="w-full bg-transparent border border-white/50 rounded px-3 py-2 placeholder-white/70"
            />
            {errors.phone && <p className="text-red-300 text-sm">{errors.phone}</p>}
          </div>



          {/* MESSAGE */}
          <div>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder={t("message")}
              rows={4}
              className="w-full bg-transparent border border-white/50 rounded px-3 py-2 placeholder-white/70 resize-none"
            />
            {errors.message && <p className="text-red-300 text-sm">{errors.message}</p>}
          </div>

          {/* CHECKBOX */}


          {/* BUTTON */}
          <button
            type="submit"
            disabled={sending}
            className="w-full bg-white text-secondary font-opensans font-normal py-3 hover:bg-gray-200 transition"
          >
            {sending ? t("sending") : t("submit")}
          </button>
                    <label className="flex font-opensans items-start gap-2 text-[14px] mt-1 leading-tight">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              className="mt-1"
            />
            <span>{t("policy")}</span>
          </label>
          {errors.agree && <p className="text-red-300 text-sm">{errors.agree}</p>}
        </form>

        {/* SUCCESS MODAL PORTAL */}
        {successModal}
      </div>

      {/* ANIMATION */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.25s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

    </div>,
    document.getElementById("modal-root")!
  );
}
