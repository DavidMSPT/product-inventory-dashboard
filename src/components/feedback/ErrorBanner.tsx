import React from 'react'
export default function ErrorBanner({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-800 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-300">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">Error</div>
          <div className="text-sm opacity-90">{message}</div>
        </div>
        <button onClick={onRetry} className="rounded-lg border border-rose-200 bg-white/40 px-3 py-1.5 text-sm hover:bg-white/70 focus:outline-none focus:ring-2 focus:ring-rose-500 dark:border-rose-700 dark:bg-rose-900/20 dark:hover:bg-rose-900/40">
          Retry
        </button>
      </div>
    </div>
  )
}
