import { formatPeso } from "@/lib/transaction";
import type { ReceiptData } from "@/lib/types";

interface ReceiptProps {
  receipt: ReceiptData;
  onNewTransaction: () => void;
}

function ReceiptRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span
        className={
          strong ? "text-xl font-extrabold text-slate-900" : "text-lg font-semibold text-slate-600"
        }
      >
        {label}
      </span>
      <span
        className={
          strong ? "text-xl font-extrabold text-slate-900" : "text-lg font-bold text-slate-900"
        }
      >
        {value}
      </span>
    </div>
  );
}

export default function Receipt({ receipt, onNewTransaction }: ReceiptProps) {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <h2 className="mb-4 text-center text-3xl font-extrabold text-slate-800">Digital Receipt 🧾</h2>

      <div className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
        {/* Store header */}
        <div className="text-center">
          <p className="text-2xl font-extrabold text-slate-900">🍜 QuickBites POS</p>
          <p className="text-sm font-medium text-slate-500">
            Touchscreen Kiosk — Official Receipt
          </p>
        </div>

        {/* Transaction number and date/time */}
        <div className="mt-5 rounded-2xl bg-slate-100 px-5 py-4 text-center">
          <p className="text-sm font-semibold text-slate-500">Transaction Number</p>
          <p className="font-mono text-xl font-bold tracking-wide text-slate-900">
            {receipt.transactionNumber}
          </p>
          <p className="mt-1 text-base font-medium text-slate-600">
            {receipt.date} · {receipt.time}
          </p>
        </div>

        {/* Purchased items */}
        <div className="mt-6 border-t-2 border-dashed border-slate-200 pt-4">
          <div className="grid grid-cols-[1fr_3.5rem_6.5rem_6.5rem] gap-2 pb-2 text-sm font-bold uppercase tracking-wide text-slate-400">
            <span>Item</span>
            <span className="text-center">Qty</span>
            <span className="text-right">Unit Price</span>
            <span className="text-right">Subtotal</span>
          </div>
          <ul className="divide-y divide-slate-100">
            {receipt.items.map((item, index) => (
              <li
                key={`${item.name}-${index}`}
                className="grid grid-cols-[1fr_3.5rem_6.5rem_6.5rem] items-center gap-2 py-3 text-lg"
              >
                <span className="font-semibold text-slate-800">{item.name}</span>
                <span className="text-center font-bold text-slate-600">{item.quantity}</span>
                <span className="text-right text-slate-600">{formatPeso(item.unitPrice)}</span>
                <span className="text-right font-bold text-slate-900">
                  {formatPeso(item.lineTotal)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Totals and payment details */}
        <div className="mt-4 space-y-3 border-t-2 border-dashed border-slate-200 pt-4">
          <ReceiptRow label="Subtotal" value={formatPeso(receipt.total)} />
          <ReceiptRow label="Total" value={formatPeso(receipt.total)} strong />
          <ReceiptRow label="Payment Method" value={receipt.paymentMethod} />
          <ReceiptRow label="Amount Paid" value={formatPeso(receipt.amountPaid)} />
          <ReceiptRow label="Change" value={formatPeso(receipt.change)} />
        </div>

        {/* Payment status */}
        <div className="mt-5 flex items-center justify-center gap-3 rounded-2xl bg-emerald-50 px-5 py-4 ring-1 ring-emerald-200">
          <span className="text-3xl" aria-hidden="true">
            ✓
          </span>
          <span className="text-xl font-extrabold text-emerald-700">Payment {receipt.status}</span>
        </div>

        <p className="mt-6 text-center text-base font-medium text-slate-500">
          Thank you for your purchase! 😊
        </p>
      </div>

      <button
        type="button"
        onClick={onNewTransaction}
        className="select-none touch-manipulation mt-6 h-16 w-full rounded-2xl bg-indigo-600 text-2xl font-bold text-white shadow-lg transition hover:bg-indigo-700 active:scale-95"
      >
        Start New Transaction
      </button>
      <p className="mt-3 text-center text-base text-slate-500">
        This clears the order, payment, and receipt, and returns to item selection.
      </p>
    </div>
  );
}
