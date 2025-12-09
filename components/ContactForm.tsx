'use client';

import { useState } from "react";
import { IMaskInput } from "react-imask";
import { useTranslations } from "next-intl";
import SuccessModal from "./SuccessModal";

export default function FeedbackForm() {
  const t = useTranslations("contact");

  type FormFields = {
    name: string;
    phone: string;
    email: string;
    message: string;
    agree: boolean;
  };

  type FieldStates = {
    name: boolean;
    phone: boolean;
    email: boolean;
    message: boolean;
  };

  type FormErrors = {
    name?: string;
    phone?: string;
    email?: string;
    message?: string;
    agree?: string;
  };

  const [form, setForm] = useState<FormFields>({
    name: "",
    phone: "",
    email: "",
    message: "",
    agree: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [focused, setFocused] = useState<FieldStates>({
    name: false,
    phone: false,
    email: false,
    message: false,
  });

  const [isSuccess, setIsSuccess] = useState<Omit<FieldStates, "message">>({
    name: false,
    phone: false,
    email: false,
  });

  const [isDisabled, setIsDisabled] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) newErrors.name = t("errors.required");

    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 12) newErrors.phone = t("errors.phone");

    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = t("errors.email");

    if (!form.agree) newErrors.agree = t("errors.agree");

    setErrors(newErrors);

    setIsSuccess({
      name: !newErrors.name,
      phone: !newErrors.phone,
      email: !newErrors.email && form.email.trim() !== "",
    });

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
        setForm({
          name: "",
          phone: "",
          email: "",
          message: "",
          agree: false,
        });

        setErrors({});
        setIsSuccess({ name: false, phone: false, email: false });
        setFocused({ name: false, phone: false, email: false, message: false });
      }
    } catch {
      alert(t("errors.server"));
    }

    setSending(false);
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
    const isFieldSuccess =
      field !== "email" && field !== "agree"
        ? isSuccess[field as keyof typeof isSuccess]
        : false;

    const isFocused =
      field in focused ? focused[field as keyof typeof focused] : false;

    return `outline-none h-[48px] px-4 w-full text-[16px] font-opensans transition-all duration-200
      ${isDisabled ? "bg-primary text-white cursor-not-allowed" :
      errors[field] ? "bg-[#FF393280] bg-opacity-50" :
      isFieldSuccess ? "bg-[#60B52780] bg-opacity-50" :
      isFocused ? "bg-[#0055FF80] bg-opacity-50" :
      form[field] ? "bg-[#0B0B7A] text-white border border-[#0B0B7A]" :
      "bg-[#EDEEEF] border border-secondary"}`;
  };

  return (
    <section className="container w-full py-10 md:py-20">
      <div className="mx-auto max-w-[1240px] px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col">
          <h2 className="title">{t("title")}</h2>
          <p className="text-secondary font-opensans text-[14px] md:text-[16px] mb-6">{t("desc")}</p>
          <div className="text-secondary font-opensans text-[16px]">
            <p>Телефон: +38 (067) 400-02-02</p>
            <p>Email: vn.callcenter@viknanovi.ua</p>
          </div>
          <div className="flex gap-4 mt-6">
            <a href="#"><img src="/contactform/facebook.svg" className="w-6" /></a>
            <a href="#"><img src="/contactform/insta.svg" className="w-6" /></a>
            <a href="#"><img src="/contactform/youtube.svg" className="pt-1 w-6" /></a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full lg:ml-auto">
          <div>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              onFocus={() => setFocused({ ...focused, name: true })}
              onBlur={() => setFocused({ ...focused, name: false })}
              placeholder={t("inputs.name")}
              disabled={isDisabled}
              className={getInputClass("name")}
            />
            {errors.name && <p className="text-[#FF393280] text-[16px] mt-1">{errors.name}</p>}
            {isSuccess.name && !errors.name && (
              <p className="text-[#60B52780] text-sm mt-1">Успешно</p>
            )}
          </div>

          <div>
            <IMaskInput
              mask="+38 (000) 000-00-00"
              value={form.phone}
              onAccept={(value: any) => {
                setForm({ ...form, phone: value });
                setErrors({ ...errors, phone: "" });
              }}
              onFocus={() => setFocused({ ...focused, phone: true })}
              onBlur={() => setFocused({ ...focused, phone: false })}
              placeholder={t("inputs.tel")}
              className={getInputClass("phone")}
            />
            {errors.phone && <p className="text-[#FF393280] text-sm">{errors.phone}</p>}
          </div>

          <div>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              onFocus={() => setFocused({ ...focused, email: true })}
              onBlur={() => setFocused({ ...focused, email: false })}
              placeholder="example@gmail.com"
              className={getInputClass("email")}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            onFocus={() => setFocused({ ...focused, message: true })}
            onBlur={() => setFocused({ ...focused, message: false })}
            placeholder={t("inputs.msg")}
            className={getInputClass("message")}
          />

          <label className="flex items-start gap-2 text-secondary text-[14px] font-opensans">
            <input
              type="checkbox"
              checked={form.agree}
              onChange={handleChange}
              className="mt-1"
              name="agree"
            />
            <span>{t("agree")}</span>
          </label>
          {errors.agree && <p className="text-[#FF393280] text-sm">{errors.agree}</p>}

          <button
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
