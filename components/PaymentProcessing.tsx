import { formatPeso } from "@/lib/transaction";

interface PaymentProcessingProps {
  methodName: string;
  total: number;
}

export default function PaymentProcessing({ methodName, total }: PaymentProcessingProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 p-6 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-10 text-center shadow-2xl">
        <div className="mx-auto h-20 w-20 animate-spin rounded-full border-8 border-indigo-100 border-t-indigo-600" />
        <h2 className="mt-6 text-3xl font-extrabold text-slate-800">Processing payment…</h2>
        <p className="mt-2 text-lg font-semibold text-slate-500">
          {methodName} · {formatPeso(total)}
        </p>
        <p className="mt-1 text-base text-slate-400">Please do not close this screen</p>
      </div>
    </div>
  );
}
