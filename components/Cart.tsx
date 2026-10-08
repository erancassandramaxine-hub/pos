import type { CartItem } from "@/lib/types";
import { formatPeso } from "@/lib/transaction";

interface CartProps {
  items: CartItem[];
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onRemove: (productId: string) => void;
}

export default function Cart({ items, onIncrease, onDecrease, onRemove }: CartProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-white/60 p-8 text-center text-lg font-medium text-slate-500">
        Your order is empty.
        <br />
        Tap a product to add it. 🛒
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {items.map(({ product, quantity }) => (
        <li key={product.id} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          {/* Product identity: icon, name, unit price */}
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-3xl"
            >
              {product.emoji}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-lg font-bold leading-snug text-slate-800">
                {product.name}
              </p>
              <p className="text-base font-medium text-slate-500">
                {formatPeso(product.price)} each
              </p>
            </div>
          </div>

          {/* Quantity controls, line subtotal, and remove */}
          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
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
              <span className="min-w-12 text-center text-2xl font-bold text-slate-900">
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
            </div>
            <div className="flex items-center gap-3">
              <p className="min-w-20 text-right text-xl font-bold text-slate-900">
                {formatPeso(product.price * quantity)}
              </p>
              <button
                type="button"
                onClick={() => onRemove(product.id)}
                aria-label={`Remove ${product.name} from the order`}
                className="select-none touch-manipulation flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-xl text-red-600 ring-1 ring-red-100 transition hover:bg-red-100 active:scale-90"
              >
                ✕
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
