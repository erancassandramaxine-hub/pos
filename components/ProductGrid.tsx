"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onAdd: (product: Product) => void;
}

export default function ProductGrid({ products, onAdd }: ProductGridProps) {
  const [category, setCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(products.map((entry) => entry.category)))];
  const visible = category === "All" ? products : products.filter((entry) => entry.category === category);

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {categories.map((entry) => (
          <button
            key={entry}
            type="button"
            onClick={() => setCategory(entry)}
            className={`select-none touch-manipulation rounded-full px-4 py-2 text-sm font-semibold transition active:scale-95 ${
              category === entry
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-indigo-300"
            }`}
          >
            {entry}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={onAdd} />
        ))}
      </div>
    </div>
  );
}
