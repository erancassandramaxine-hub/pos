// Shared types for the POS kiosk.

export interface Product {
  id: string;
  name: string;
  price: number;
  emoji: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

/** Kiosk screen currently shown to the customer. */
export type Step = "select" | "summary";

export type ToastTone = "success" | "warning" | "error";

export interface ToastState {
  message: string;
  tone: ToastTone;
}
