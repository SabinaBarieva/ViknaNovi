'use client';

import { useState } from "react";
import { IMaskInput } from "react-imask";
import { useTranslations } from "next-intl";
import { Turnstile } from "@marsidev/react-turnstile";

import SuccessModal from "./SuccessModal";
import { trackLead } from "@/lib/trackLead";

export default function FeedbackForm() {
  const t = useTranslations("contact");

  type FormFields = {
    name: string;
    phone: string;
    message: string;
    agree: boolean;
  };

  type FieldStates = {
    name: boolean;
    phone: boolean;
    message: boolean;
  };

  type FormErrors = {
    name?: string;
    phone?: string;
    message?: string;
    agree?: string;
  };

  const [form, setForm] = useState<FormFields>({
    name: "",
    phone: "",
    message: "",
    agree: false,
  });

  const [token, setToken] = useState("");
  const [startedAt, setStartedAt] = useState(Date.now());
  const [company, setCompany] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [focused, setFocused] = useState<FieldStates>({
    name: false,
    phone: false,
    message: false,
  });

  const [isSuccess, setIsSuccess] = useState<Omit<FieldStates, "message">>({
    name: false,
    phone: false,
  });

  const [isDisabled] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) newErrors.name = t("errors.required");

    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 12) newErrors.phone = t("errors.phone");

    if (!form.agree) newErrors.agree = t("errors.agree");

    setErrors(newErrors);

    setIsSuccess({
      name: !newErrors.name,
      phone: !newErrors.phone,
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (sending) return;
    if (!validate()) return;

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
          company,
          startedAt,
        }),
      });

      if (res.ok) {
        trackLead("feedback_form");

        setSuccess(true);
        setForm({
          name: "",
          phone: "",
          message: "",
          agree: false,
        });

        setToken("");
        setCompany("");
        setStartedAt(Date.now());
        setErrors({});
        setIsSuccess({ name: false, phone: false });
        setFocused({ name: false, phone: false, message: false });
      } else {
        alert(t("errors.server"));
      }
    } catch {
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

  const getInputClass = (field: keyof FormFields) => {
    const isFocused =
      field in focused ? focused[field as keyof typeof focused] : false;

    return `outline-none h-[48px] px-4 w-full text-[16px] font-opensans transition-all duration-200
      ${
        isDisabled
          ? "bg-primary text-white cursor-not-allowed"
          : errors[field]
          ? "bg-[#FF393280] bg-opacity-50"
          : isFocused
          ? "bg-[#0055FF80] bg-opacity-50"
          : form[field]
          ? "bg-[#0B0B7A] text-white border border-[#0B0B7A]"
          : "bg-[#EDEEEF] border border-secondary"
      }`;
  };

  return (
    <section className="container w-full py-10 md:py-20" id="contact">
      <div className="mx-auto max-w-[1240px] px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col">
          <h2 className="title">{t("title")}</h2>
          <p className="text-secondary font-opensans text-[14px] md:text-[16px] mb-6">
            {t("desc")}
          </p>
          <div className="text-secondary font-opensans text-[16px]">
            <p>Телефон: +38 (067) 400-02-02</p>
            <p>Email: vn.callcenter@viknanovi.ua</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full lg:ml-auto"
        >
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            onFocus={() => setFocused({ ...focused, name: true })}
            onBlur={() => setFocused({ ...focused, name: false })}
            placeholder={t("inputs.name")}
            disabled={isDisabled}
            className={getInputClass("name")}
            required
          />

          <IMaskInput
            mask="+38 (000) 000-00-00"
            value={form.phone}
            onAccept={(value: any) => {
              setForm({ ...form, phone: value });
              setErrors({ ...errors, phone: "" });
            }}
            placeholder={t("inputs.tel")}
            className={getInputClass("phone")}
            required
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder={t("inputs.msg")}
            className={getInputClass("message")}
          />

          <label className="flex items-start gap-2 text-secondary text-[14px] font-opensans">
            <input
              type="checkbox"
              checked={form.agree}
              onChange={handleChange}
              name="agree"
              required
            />
            <span>{t("agree")}</span>
          </label>

          <input
            type="text"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            autoComplete="off"
            tabIndex={-1}
            className="hidden"
          />

          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            onSuccess={(token) => setToken(token)}
          />

          <button
            type="submit"
            disabled={sending}
            className="h-[55px] bg-primary hover:bg-accent text-white uppercase font-montserrat text-[16px] rounded transition"
          >
            {sending ? t("sending") : t("btn")}
          </button>
        </form>
      </div>

      {success && (
        <SuccessModal
          title={t("successTitle")}
          message={t("successMsg")}
          onClose={() => setSuccess(false)}
        />
      )}
    </section>
  );
}