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
        <li
          key={product.id}
          className="flex items-center gap-2 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-200"
        >
          <span className="text-3xl" aria-hidden="true">
            {product.emoji}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-semibold text-slate-800">{product.name}</p>
            <p className="text-sm text-slate-500">{formatPeso(product.price)} each</p>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onDecrease(product.id)}
              aria-label={`Decrease quantity of ${product.name}`}
              className={`select-none touch-manipulation flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-2xl font-bold text-slate-700 transition hover:bg-slate-200 active:scale-90 ${
                quantity === 1 ? "opacity-60" : ""
              }`}
            >
              −
            </button>
            <span className="w-10 text-center text-xl font-bold text-slate-800">{quantity}</span>
            <button
              type="button"
              onClick={() => onIncrease(product.id)}
              aria-label={`Increase quantity of ${product.name}`}
              className="select-none touch-manipulation flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-2xl font-bold text-slate-700 transition hover:bg-slate-200 active:scale-90"
            >
              +
            </button>
          </div>
          <p className="w-24 text-right text-lg font-bold text-slate-800">
            {formatPeso(product.price * quantity)}
          </p>
          <button
            type="button"
            onClick={() => onRemove(product.id)}
            aria-label={`Remove ${product.name} from the order`}
            className="select-none touch-manipulation flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-xl text-red-600 transition hover:bg-red-100 active:scale-90"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
