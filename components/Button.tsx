"use client";

import { useState } from "react";
import FeedbackModal from "@/components/FeedbackModal";

interface Props {
  label: string;       // текст кнопки
  className?: string;  // додаткові стилі
}

export default function OpenFeedbackButton({ label, className }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
  onClick={() => setOpen(true)}
  className={className}
  aria-label={label}
>

        {label}
      </button>

      <FeedbackModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
