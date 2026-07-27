"use client";

import { useState } from "react";
import FeedbackModal from "@/components/FeedbackModal";

interface Props {
  label: string;       
  className?: string;  
}

export default function OpenFeedbackButton({ label, className }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button" 
        onClick={() => setOpen(true)}
        className={`min-h-[48px] ${className || ""}`} 
        aria-label={label}
      >
        {label}
      </button>

      <FeedbackModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
