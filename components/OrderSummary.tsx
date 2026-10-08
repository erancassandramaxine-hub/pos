import type { CartItem } from "@/lib/types";
import { formatPeso } from "@/lib/transaction";

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
  onBack: () => void;
  onContinue: () => void;
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
}

export default function OrderSummary({
  items,
  total,
  onBack,
  onContinue,
  onIncrease,
  onDecrease,
}: OrderSummaryProps) {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <h2 className="mb-4 text-3xl font-extrabold text-slate-800">Order Summary</h2>

      <div className="overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-200">
        <ul className="divide-y divide-slate-100">
          {items.map(({ product, quantity }) => (
            <li
              key={product.id}
              className="flex flex-wrap items-center justify-between gap-4 px-6 py-4"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="text-3xl" aria-hidden="true">
                  {product.emoji}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-lg font-semibold text-slate-800">
                    {product.name}
                  </span>
                  <span className="block text-sm text-slate-500">
                    {formatPeso(product.price)} each
                  </span>
                </span>
              </span>
              <span className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onDecrease(product.id)}
                  aria-label={`Decrease quantity of ${product.name}`}
                  className={`select-none touch-manipulation flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-2xl font-bold text-slate-700 transition hover:bg-slate-200 active:scale-90 ${
                    quantity === 1 ? "opacity-60" : ""
                  }`}
                >
                  −
                </button>
                <span className="min-w-10 text-center text-xl font-bold text-slate-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => onIncrease(product.id)}
                  aria-label={`Increase quantity of ${product.name}`}
                  className="select-none touch-manipulation flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-2xl font-bold text-slate-700 transition hover:bg-slate-200 active:scale-90"
                >
                  +
                </button>
              </span>
              <span className="min-w-24 text-right text-lg font-bold text-slate-800">
                {formatPeso(product.price * quantity)}
              </span>
            </li>
          ))}
        </ul>
        <div className="space-y-2 border-t-2 border-dashed border-slate-200 bg-slate-50 px-6 py-5">
          <div className="flex justify-between text-lg font-medium text-slate-600">
            <span>Subtotal</span>
            <span>{formatPeso(total)}</span>
          </div>
          <div className="flex justify-between text-2xl font-extrabold text-slate-900">
            <span>Total</span>
            <span>{formatPeso(total)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={onBack}
          className="select-none touch-manipulation h-16 rounded-2xl border-4 border-indigo-600 bg-white text-xl font-bold text-indigo-600 transition hover:bg-indigo-50 active:scale-95"
        >
          ← Back to Products
        </button>
        <button
          type="button"
          onClick={onContinue}
          disabled={items.length === 0}
          className="select-none touch-manipulation h-16 rounded-2xl bg-indigo-600 text-xl font-bold text-white shadow-lg transition hover:bg-indigo-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continue to Payment →
        </button>
      </div>

      <p className="mt-4 text-center text-base text-slate-500">
        Adjust quantities here, or go back to browse more products. Your order is never lost.
      </p>
    </div>
  );
}
