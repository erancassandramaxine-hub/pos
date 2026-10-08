import { useMemo } from "react";
import { formatPeso } from "@/lib/transaction";

interface QRPaymentProps {
  total: number;
  onConfirm: () => void;
  onBack: () => void;
}

const QR_SIZE = 21;

/** Deterministic demo QR code drawn as an SVG grid (decorative placeholder only). */
function DemoQrCode({ size = 240 }: { size?: number }) {
  const cells = useMemo(() => {
    // Simple deterministic PRNG so the pattern stays stable between renders.
    let seed = 20261008;
    const rand = () => {
      seed = (seed * 1103515245 + 12345) % 2147483648;
      return seed / 2147483648;
    };
    const grid = Array.from({ length: QR_SIZE * QR_SIZE }, () => rand() < 0.45);

    // Draw the three QR finder patterns (7x7 squares with 3x3 centers).
    const drawFinder = (row: number, col: number) => {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          const border = r === 0 || r === 6 || c === 0 || c === 6;
          const center = r >= 2 && r <= 4 && c >= 2 && c <= 4;
          grid[(row + r) * QR_SIZE + (col + c)] = border || center;
        }
      }
    };
    drawFinder(0, 0);
    drawFinder(0, QR_SIZE - 7);
    drawFinder(QR_SIZE - 7, 0);
    return grid;
  }, []);

  const cell = size / QR_SIZE;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="Demo QR code placeholder"
      className="rounded-2xl bg-white p-3 ring-2 ring-slate-200"
    >
      {cells.map((filled, index) =>
        filled ? (
          <rect
            key={index}
            x={(index % QR_SIZE) * cell}
            y={Math.floor(index / QR_SIZE) * cell}
            width={cell + 0.1}
            height={cell + 0.1}
            fill="#0f172a"
          />
        ) : null
      )}
    </svg>
  );
}

export default function QRPayment({ total, onConfirm, onBack }: QRPaymentProps) {
  return (
    <div className="mx-auto w-full max-w-2xl text-center">
      <h2 className="mb-1 text-3xl font-extrabold text-slate-800">QR Payment 📱</h2>
      <p className="mb-6 text-xl font-semibold text-slate-500">
        Amount due: <span className="text-slate-900">{formatPeso(total)}</span>
      </p>

      <div className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
        <div className="flex justify-center">
          <DemoQrCode />
        </div>
        <p className="mt-4 text-lg font-semibold text-slate-700">
          Scan this QR code with your payment app
        </p>
        <p className="text-base text-slate-500">(Demo simulation — no real payment is processed)</p>

        <button
          type="button"
          onClick={onConfirm}
          className="select-none touch-manipulation mt-6 h-16 w-full rounded-2xl bg-emerald-600 text-2xl font-bold text-white shadow-lg transition hover:bg-emerald-700 active:scale-95"
        >
          Payment Scanned ✓ Confirm
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
