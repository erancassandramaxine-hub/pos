import { useState } from "react";
import { formatPeso } from "@/lib/transaction";

interface CashPaymentProps {
  total: number;
  onConfirm: (amountPaid: number, change: number) => void;
  onBack: () => void;
}

/** Parse a peso amount from a string; null = blank, NaN = invalid format. */
function parseAmount(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed === "") return null;
  if (!/^\d+(\.\d{1,2})?$/.test(trimmed)) return NaN;
  return Math.round(Number.parseFloat(trimmed) * 100) / 100;
}

export default function CashPayment({ total, onConfirm, onBack }: CashPaymentProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const parsed = parseAmount(input);
  const change =
    parsed !== null && !Number.isNaN(parsed) && parsed >= total
      ? Math.round((parsed - total) * 100) / 100
      : null;

  // Quick cash buttons: the exact amount plus rounding up to the nearest 50/100/500.
  const exact = total.toFixed(2);
  const quickValues = [50, 100, 500]
    .map((step) => (Math.ceil(total / step) * step).toFixed(2))
    .filter((value) => value !== exact);

  const pickAmount = (value: string) => {
    setInput(value);
    setError(null);
  };

  const handleConfirm = () => {
    if (parsed === null) {
      setError("Please enter the amount paid.");
      return;
    }
    if (Number.isNaN(parsed)) {
      setError("Please enter a valid amount (numbers only, e.g. 200 or 200.50).");
      return;
    }
    if (parsed < 0) {
      setError("Amount cannot be negative.");
      return;
    }
    if (parsed < total) {
      setError(`Insufficient payment. You still need ${formatPeso(total - parsed)}.`);
      return;
    }
    onConfirm(parsed, change as number);
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <h2 className="mb-1 text-3xl font-extrabold text-slate-800">Cash Payment 💵</h2>
      <p className="mb-6 text-xl font-semibold text-slate-500">
        Amount due: <span className="text-slate-900">{formatPeso(total)}</span>
      </p>

      <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
        <label htmlFor="cash-amount" className="mb-2 block text-lg font-bold text-slate-700">
          Amount paid
        </label>
        <div className="flex items-center gap-2 rounded-2xl border-2 border-slate-300 bg-slate-50 px-4 focus-within:border-indigo-500">
          <span className="text-2xl font-bold text-slate-500">₱</span>
          <input
            id="cash-amount"
            type="text"
            inputMode="decimal"
            placeholder="0.00"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              setError(null);
            }}
            className="h-16 w-full bg-transparent text-3xl font-bold text-slate-900 outline-none placeholder:text-slate-300"
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <button
            type="button"
            onClick={() => pickAmount(exact)}
            className="select-none touch-manipulation flex h-16 flex-col items-center justify-center rounded-2xl border-2 border-indigo-200 bg-indigo-50 transition hover:bg-indigo-100 active:scale-95"
          >
            <span className="text-sm font-semibold text-indigo-500">Exact</span>
            <span className="text-lg font-bold text-indigo-700">{formatPeso(total)}</span>
          </button>
          {quickValues.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => pickAmount(value)}
              className="select-none touch-manipulation flex h-16 items-center justify-center rounded-2xl border-2 border-indigo-200 bg-indigo-50 text-lg font-bold text-indigo-700 transition hover:bg-indigo-100 active:scale-95"
            >
              {formatPeso(Number(value))}
            </button>
          ))}
        </div>

        {change !== null && (
          <div className="mt-4 flex items-center justify-between rounded-2xl bg-emerald-50 px-5 py-4 ring-1 ring-emerald-200">
            <span className="text-xl font-bold text-emerald-800">Change</span>
            <span className="text-3xl font-extrabold text-emerald-700">{formatPeso(change)}</span>
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mt-4 rounded-2xl bg-red-50 px-5 py-4 text-lg font-bold text-red-700 ring-1 ring-red-200"
          >
            ⚠️ {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleConfirm}
          className="select-none touch-manipulation mt-6 h-16 w-full rounded-2xl bg-emerald-600 text-2xl font-bold text-white shadow-lg transition hover:bg-emerald-700 active:scale-95"
        >
          Confirm Payment ✓
        </button>
      </div>

      <button
        type="button"
        onClick={onBack}
        className="select-none touch-manipulation mt-6 h-16 w-full rounded-2xl border-4 border-indigo-600 bg-white text-xl font-bold text-indigo-600 transition hover:bg-indigo-50 active:scale-95"
      >
        ← Choose a different method
      </button>
    </div>
  );
}
