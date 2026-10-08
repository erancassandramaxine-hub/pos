"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Cart from "@/components/Cart";
import OrderSummary from "@/components/OrderSummary";
import ProductGrid from "@/components/ProductGrid";
import { PRODUCTS } from "@/lib/products";
import { formatPeso } from "@/lib/transaction";
import type { CartItem, Product, Step, ToastState } from "@/lib/types";

const STEP_LABELS = ["Item Selection", "Order Summary", "Payment", "Complete"];

const STEP_INDEX: Record<Step, number> = { select: 0, summary: 1 };

const TOAST_STYLES: Record<ToastState["tone"], string> = {
  success: "bg-emerald-600",
  warning: "bg-amber-500",
  error: "bg-red-600",
};

function StepIndicator({ current }: { current: number }) {
  return (
    <ol className="mb-6 flex items-center justify-center gap-3">
      {STEP_LABELS.map((label, index) => {
        const state = index < current ? "done" : index === current ? "active" : "todo";
        return (
          <li key={label} className="flex items-center gap-3">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full text-base font-bold ${
                state === "active"
                  ? "bg-indigo-600 text-white"
                  : state === "done"
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-200 text-slate-500"
              }`}
            >
              {state === "done" ? "✓" : index + 1}
            </span>
            <span
              className={`hidden text-sm font-semibold sm:block ${
                state === "active"
                  ? "text-indigo-700"
                  : state === "done"
                    ? "text-emerald-600"
                    : "text-slate-400"
              }`}
            >
              {label}
            </span>
            {index < STEP_LABELS.length - 1 && (
              <span
                className={`h-1 w-8 rounded-full ${
                  index < current ? "bg-emerald-400" : "bg-slate-300"
                }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

export default function Home() {
  const [step, setStep] = useState<Step>("select");
  const [cart, setCart] = useState<CartItem[]>([]);
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

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`${product.name} added to the order ✓`);
  };

  const changeQuantity = (productId: string, delta: number) => {
    const item = cart.find((entry) => entry.product.id === productId);
    if (!item) return;
    if (item.quantity + delta < 1) {
      showToast("Quantity cannot go below 1", "warning");
      return;
    }
    setCart((prev) =>
      prev.map((entry) =>
        entry.product.id === productId
          ? { ...entry, quantity: entry.quantity + delta }
          : entry
      )
    );
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find((entry) => entry.product.id === productId);
    setCart((prev) => prev.filter((entry) => entry.product.id !== productId));
    if (item) showToast(`${item.product.name} removed from the order`, "warning");
  };

  const goToSummary = () => {
    if (cart.length === 0) {
      showToast("Add at least one product before continuing", "warning");
      return;
    }
    setStep("summary");
  };

  const backToProducts = () => {
    setStep("select");
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
        <StepIndicator current={STEP_INDEX[step]} />

        {step === "select" ? (
          <div className="grid gap-8 lg:grid-cols-[1fr_24rem]">
            <section>
              <h2 className="mb-4 text-2xl font-extrabold text-slate-800">
                Tap a product to add it to your order
              </h2>
              <ProductGrid products={PRODUCTS} onAdd={addToCart} />
            </section>

            <aside className="h-fit rounded-3xl bg-slate-100 p-4 ring-1 ring-slate-200 lg:sticky lg:top-4">
              <h2 className="mb-3 text-2xl font-extrabold text-slate-800">Your Order 🛒</h2>
              <Cart
                items={cart}
                onIncrease={(id) => changeQuantity(id, 1)}
                onDecrease={(id) => changeQuantity(id, -1)}
                onRemove={removeFromCart}
              />
              {cart.length > 0 && (
                <>
                  <div className="mt-4 rounded-2xl bg-white p-5 ring-1 ring-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-slate-600">Subtotal</span>
                      <span className="text-lg font-bold text-slate-700">{formatPeso(total)}</span>
                    </div>
                    <div className="my-3 border-t-2 border-dashed border-slate-200" />
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-extrabold uppercase tracking-wide text-slate-900">
                        Total
                      </span>
                      <span className="text-3xl font-extrabold text-indigo-600">
                        {formatPeso(total)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={goToSummary}
                    className="select-none touch-manipulation mt-4 h-16 w-full rounded-2xl bg-indigo-600 text-2xl font-bold text-white shadow-lg transition hover:bg-indigo-700 active:scale-95"
                  >
                    Review Order →
                  </button>
                </>
              )}
            </aside>
          </div>
        ) : (
          <OrderSummary
            items={cart}
            total={total}
            onBack={backToProducts}
            onContinue={() =>
              showToast("Payment is implemented in the next feature branch", "warning")
            }
          />
        )}
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
