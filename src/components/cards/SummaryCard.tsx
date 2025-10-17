import React from 'react'
export default function SummaryCard({ title, value, full = false }: { title: string; value: string; full?: boolean }) {
  return (
    <div className={`${full ? 'col-span-2 sm:col-span-4' : ''}`}>
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md focus-within:ring-2 focus-within:ring-blue-500 dark:border-gray-800 dark:bg-gray-950">
        <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{title}</div>
        <div className="mt-1 text-2xl font-semibold">{value}</div>
      </div>
    </div>
  )
}
