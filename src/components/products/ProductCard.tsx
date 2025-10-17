import React from 'react'
import { formatCurrency } from '@lib/format'
import type { Product } from '@store/types'
import StatusBadge from './StatusBadge'
export default function ProductCard({ product, onEdit, onDelete }: { product: Product; onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-950">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-t-2xl">
        <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover transition group-hover:scale-105" />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-base font-semibold leading-tight">{product.name}</h3>
            <p className="mt-0.5 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{product.description}</p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">{formatCurrency(product.price)}</div>
            <StatusBadge stock={product.stock} />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span className="rounded-full bg-gray-100 px-2 py-1 dark:bg-gray-800">{product.category}</span>
          <div className="flex items-center gap-2">
            <button onClick={onEdit} className="rounded-lg border border-gray-200 px-2.5 py-1.5 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:hover:bg-gray-800">Edit</button>
            <button onClick={onDelete} className="rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-rose-700 hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-500 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-300">Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}
