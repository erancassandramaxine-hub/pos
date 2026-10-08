import { formatPeso } from "@/lib/transaction";

interface CardPaymentProps {
  total: number;
  onConfirm: () => void;
  onBack: () => void;
}

export default function CardPayment({ total, onConfirm, onBack }: CardPaymentProps) {
  return (
    <div className="mx-auto w-full max-w-2xl text-center">
      <h2 className="mb-1 text-3xl font-extrabold text-slate-800">Card Payment 💳</h2>
      <p className="mb-6 text-xl font-semibold text-slate-500">
        Amount due: <span className="text-slate-900">{formatPeso(total)}</span>
      </p>

      <div className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
        <span className="text-7xl" aria-hidden="true">
          💳
        </span>
        <p className="mt-4 text-xl font-bold text-slate-800">
          Please tap, insert, or swipe your card
        </p>
        <p className="mt-1 text-base text-slate-500">(Demo simulation — no real payment is processed)</p>

        <button
          type="button"
          onClick={onConfirm}
          className="select-none touch-manipulation mt-6 h-16 w-full rounded-2xl bg-emerald-600 text-2xl font-bold text-white shadow-lg transition hover:bg-emerald-700 active:scale-95"
        >
          Process Payment →
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
