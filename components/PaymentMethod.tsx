import { PAYMENT_METHODS } from "@/lib/products";
import { formatPeso } from "@/lib/transaction";
import type { PaymentMethodId } from "@/lib/types";

interface PaymentMethodProps {
  total: number;
  onSelect: (id: PaymentMethodId) => void;
  onBack: () => void;
}

export default function PaymentMethod({ total, onSelect, onBack }: PaymentMethodProps) {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <h2 className="mb-1 text-3xl font-extrabold text-slate-800">Payment Method</h2>
      <p className="mb-6 text-xl font-semibold text-slate-500">
        Amount due: <span className="text-slate-900">{formatPeso(total)}</span>
      </p>

      <div className="grid gap-4 sm:grid-cols-3">
        {PAYMENT_METHODS.map((method) => (
          <button
            key={method.id}
            type="button"
            onClick={() => onSelect(method.id)}
            className="select-none touch-manipulation flex min-h-56 flex-col items-center justify-center gap-3 rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-400 hover:shadow-xl active:scale-95"
          >
            <span className="text-6xl" aria-hidden="true">
              {method.emoji}
            </span>
            <span className="text-2xl font-bold text-slate-800">{method.name}</span>
            <span className="text-base font-medium text-slate-500">{method.description}</span>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onBack}
        className="select-none touch-manipulation mt-8 h-16 w-full rounded-2xl border-4 border-indigo-600 bg-white text-xl font-bold text-indigo-600 transition hover:bg-indigo-50 active:scale-95"
      >
        ← Back to Order Summary
      </button>
    </div>
  );
}
