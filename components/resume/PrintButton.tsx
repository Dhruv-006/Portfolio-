"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center gap-2 bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-[var(--color-saffron)] transition-colors duration-300 px-6 py-4 rounded-full shadow-lg font-sans text-sm uppercase tracking-widest print:hidden group"
      aria-label="Download Resume as PDF"
    >
      <Printer className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
      <span>Save PDF</span>
    </button>
  );
}
