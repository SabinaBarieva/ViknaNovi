// components/SuccessModal.tsx
"use client";

import React from "react";

type SuccessModalProps = {
  title: string;
  message: string;
  onClose: () => void;
};

export default function SuccessModal({ title, message, onClose }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-6 w-[85%] max-w-[350px] text-center shadow-xl">
        <h3 className="text-[20px] font-semibold text-primary font-mont mb-2">{title}</h3>
        <p className="text-secondary font-opensans text-[16px] mb-4">{message}</p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-primary text-white w-full font-opensans hover:bg-accent"
        >
          OK
        </button>
      </div>
    </div>
  );
}
