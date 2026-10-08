const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** Format a number as Philippine pesos, e.g. 1234.5 -> "₱1,234.50". */
export function formatPeso(amount: number): string {
  const [whole, cents] = amount.toFixed(2).split(".");
  const withCommas = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `₱${withCommas}.${cents}`;
}

/** Generate a unique transaction number, e.g. "TXN-20261008-143205-4821". */
export function generateTransactionNumber(now = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  const date = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
  const time = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  const random = Math.floor(1000 + Math.random() * 9000);
  return `TXN-${date}-${time}-${random}`;
}

/** Format a Date for the receipt, e.g. "Oct 8, 2026" and "02:31:05 PM". */
export function formatReceiptDate(now = new Date()): { date: string; time: string } {
  const pad = (n: number) => String(n).padStart(2, "0");
  const hours24 = now.getHours();
  const period = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  return {
    date: `${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`,
    time: `${pad(hours12)}:${pad(now.getMinutes())}:${pad(now.getSeconds())} ${period}`,
  };
}
