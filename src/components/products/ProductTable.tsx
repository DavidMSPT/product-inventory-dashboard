import React from 'react'
import StatusBadge from './StatusBadge'
import type { Product } from '@store/types'
import { formatCurrency } from '@lib/format'
export default function ProductTable({ products, onEdit, onDelete }: { products: Product[]; onEdit: (p: Product) => void; onDelete: (p: Product) => void }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
        <thead className="bg-gray-50 text-left text-sm font-medium dark:bg-gray-900">
          <tr>
            <th className="px-4 py-3">Product</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Stock</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-sm dark:divide-gray-800">
          {products.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50/60 dark:hover:bg-gray-900">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img src={p.imageUrl} alt="" className="h-12 w-16 rounded object-cover" />
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="line-clamp-1 text-gray-500 dark:text-gray-400">{p.description}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">{p.category}</td>
              <td className="px-4 py-3">{formatCurrency(p.price)}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <StatusBadge stock={p.stock} />
                  <span className="text-gray-500">({p.stock})</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                  <button onClick={() => onEdit(p)} className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:hover:bg-gray-800">Edit</button>
                  <button onClick={() => onDelete(p)} className="rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-xs text-rose-700 hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-500 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-300">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
