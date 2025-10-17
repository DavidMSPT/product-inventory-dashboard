import { memo } from "react"
import StatusBadge from "./StatusBadge"
import type { Product } from "@store/types"
import { formatCurrency } from "@lib/format"

function ProductTable({
  products,
  onEdit,
  onDelete,
}: {
  products: Product[]
  onEdit: (p: Product) => void
  onDelete: (p: Product) => void
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-bg-muted text-left text-sm font-medium">
          <tr>
            <th className="px-4 py-3">Product</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Stock</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border text-sm">
          {products.map((p) => (
            <tr key={p.id} className="hover:bg-bg-muted/60">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img src={p.imageUrl} alt="" className="h-12 w-16 rounded object-cover" />
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="line-clamp-1 text-text-muted">{p.description}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">{p.category}</td>
              <td className="px-4 py-3">{formatCurrency(p.price)}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <StatusBadge stock={p.stock} />
                  <span className="text-text-muted">({p.stock})</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEdit(p)}
                    className="rounded-lg border border-border px-2.5 py-1.5 text-xs hover:bg-bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(p)}
                    className="rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-xs text-rose-700 hover:bg-rose-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-300"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default memo(ProductTable)
