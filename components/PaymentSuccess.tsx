import { formatPeso } from "@/lib/transaction";

interface PaymentSuccessProps {
  total: number;
  amountPaid: number;
  change: number | null;
  methodName: string;
  onViewReceipt: () => void;
  onNewTransaction: () => void;
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-lg font-semibold text-slate-600">{label}</span>
      <span className="text-xl font-bold text-slate-900">{value}</span>
    </div>
  );
}

export default function PaymentSuccess({
  total,
  amountPaid,
  change,
  methodName,
  onViewReceipt,
  onNewTransaction,
}: PaymentSuccessProps) {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="rounded-3xl bg-white p-10 text-center shadow-lg ring-1 ring-slate-200">
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-emerald-500 text-6xl font-bold text-white shadow-lg">
          ✓
        </div>
        <h2 className="mt-6 text-4xl font-extrabold text-emerald-600">Payment Successful!</h2>

        <div className="mt-6 space-y-3 rounded-2xl bg-slate-50 p-5 text-left ring-1 ring-slate-200">
          <DetailRow label="Total" value={formatPeso(total)} />
          <DetailRow label="Amount Paid" value={formatPeso(amountPaid)} />
          {change !== null && change > 0 && <DetailRow label="Change" value={formatPeso(change)} />}
          <DetailRow label="Payment Method" value={methodName} />
        </div>

        <button
          type="button"
          onClick={onViewReceipt}
          className="select-none touch-manipulation mt-8 h-16 w-full rounded-2xl bg-indigo-600 text-2xl font-bold text-white shadow-lg transition hover:bg-indigo-700 active:scale-95"
        >
          View Receipt 🧾
        </button>
        <button
          type="button"
          onClick={onNewTransaction}
          className="select-none touch-manipulation mt-4 h-16 w-full rounded-2xl border-4 border-indigo-600 bg-white text-2xl font-bold text-indigo-600 transition hover:bg-indigo-50 active:scale-95"
        >
          Start New Transaction
        </button>
      </div>
    </div>
  );
}
