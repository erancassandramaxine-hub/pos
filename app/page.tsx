"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import { PRODUCTS } from "@/lib/products";
import type { Product, ToastState } from "@/lib/types";

const STEP_LABELS = ["Item Selection", "Order Summary", "Payment", "Complete"];

const TOAST_STYLES: Record<ToastState["tone"], string> = {
  success: "bg-emerald-600",
  warning: "bg-amber-500",
  error: "bg-red-600",
};

export default function Home() {
  const [toast, setToast] = useState<ToastState | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback(
    (message: string, tone: ToastState["tone"] = "success") => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
      setToast({ message, tone });
      toastTimer.current = setTimeout(() => setToast(null), 2400);
    },
    []
  );

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const handleAdd = (product: Product) => {
    showToast(`${product.name} added to the order ✓`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-indigo-600 px-4 py-4 text-white shadow-lg">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">🍜 QuickBites POS</h1>
            <p className="text-sm font-medium text-indigo-100">
              Touchscreen Kiosk — tap to order
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-16 pt-6">
        <ol className="mb-6 flex items-center justify-center gap-3">
          {STEP_LABELS.map((label, index) => (
            <li key={label} className="flex items-center gap-3">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full text-base font-bold ${
                  index === 0
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {index + 1}
              </span>
              <span
                className={`hidden text-sm font-semibold sm:block ${
                  index === 0 ? "text-indigo-700" : "text-slate-400"
                }`}
              >
                {label}
              </span>
              {index < STEP_LABELS.length - 1 && (
                <span className="h-1 w-8 rounded-full bg-slate-300" />
              )}
            </li>
          ))}
        </ol>

        <h2 className="mb-4 text-2xl font-extrabold text-slate-800">
          Tap a product to add it to your order
        </h2>
        <ProductGrid products={PRODUCTS} onAdd={handleAdd} />
      </main>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-2xl px-8 py-4 text-xl font-bold text-white shadow-2xl ${TOAST_STYLES[toast.tone]}`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
