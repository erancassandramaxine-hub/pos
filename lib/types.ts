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

export type PaymentMethodId = "cash" | "qr" | "card";

export interface PaymentMethodInfo {
  id: PaymentMethodId;
  name: string;
  description: string;
  emoji: string;
}

/** Kiosk screen currently shown to the customer. */
export type Step =
  | "select"
  | "summary"
  | "payment"
  | "processing"
  | "success"
  | "receipt";

export interface ReceiptItem {
  name: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export interface ReceiptData {
  transactionNumber: string;
  date: string;
  time: string;
  items: ReceiptItem[];
  total: number;
  paymentMethod: string;
  amountPaid: number;
  change: number;
  status: "PAID";
}

export type ToastTone = "success" | "warning" | "error";

export interface ToastState {
  message: string;
  tone: ToastTone;
}
