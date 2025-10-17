import React from "react"
export default function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center text-sm text-gray-600 dark:border-gray-700 dark:text-gray-400">
      No products match your filters. You can add a new product to get started.
      <div className="mt-4">
        <button
          onClick={onAdd}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Product
        </button>
      </div>
    </div>
  )
}
