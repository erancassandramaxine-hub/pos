/** Format a number as Philippine pesos, e.g. 1234.5 -> "₱1,234.50". */
export function formatPeso(amount: number): string {
  const [whole, cents] = amount.toFixed(2).split(".");
  const withCommas = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `₱${withCommas}.${cents}`;
}
