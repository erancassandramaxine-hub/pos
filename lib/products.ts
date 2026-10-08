import type { Product } from "./types";

/** Static catalog used by the kiosk (no database required). */
export const PRODUCTS: Product[] = [
  { id: "siomai", name: "Siomai (4 pcs)", price: 35, emoji: "🥟", category: "Snacks" },
  { id: "fried-chicken", name: "Fried Chicken", price: 95, emoji: "🍗", category: "Meals" },
  { id: "rice-meal", name: "Rice Meal", price: 120, emoji: "🍚", category: "Meals" },
  { id: "cheeseburger", name: "Cheeseburger", price: 80, emoji: "🍔", category: "Meals" },
  { id: "fries", name: "French Fries", price: 65, emoji: "🍟", category: "Snacks" },
  { id: "halo-halo", name: "Halo-Halo", price: 70, emoji: "🍧", category: "Desserts" },
  { id: "iced-tea", name: "Iced Tea", price: 30, emoji: "🧋", category: "Drinks" },
  { id: "coffee", name: "Hot Coffee", price: 50, emoji: "☕", category: "Drinks" },
];
