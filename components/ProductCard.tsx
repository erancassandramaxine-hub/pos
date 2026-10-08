import type { Product } from "@/lib/types";
import { formatPeso } from "@/lib/transaction";

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <button
      type="button"
      onClick={() => onAdd(product)}
      className="select-none touch-manipulation group flex h-full min-h-56 flex-col items-center justify-between gap-3 rounded-3xl border-2 border-slate-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-400 hover:shadow-xl active:scale-95"
    >
      <span className="text-6xl" aria-hidden="true">
        {product.emoji}
      </span>
      <span className="w-full">
        <span className="block text-xl font-bold leading-tight text-slate-800">
          {product.name}
        </span>
        <span className="block text-sm font-medium text-slate-500">{product.category}</span>
      </span>
      <span className="block w-full rounded-2xl bg-indigo-600 py-3 text-2xl font-bold text-white transition group-hover:bg-indigo-700">
        {formatPeso(product.price)}
      </span>
    </button>
  );
}
