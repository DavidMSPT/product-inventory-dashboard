import { stockStatus } from "@utilities/stock"
export default function StatusBadge({ stock }: { stock: number }) {
  const status = stockStatus(stock)
  const color =
    status === "In Stock"
      ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300"
      : status === "Low Stock"
        ? "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
        : "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300"
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${color}`}
    >
      {status}
    </span>
  )
}
