import React, { useState } from "react"
import ModalShell from "./ModalShell"
export default function ConfirmModal({
  title,
  body,
  confirmText = "Confirm",
  destructive,
  onCancel,
  onConfirm,
}: {
  title: string
  body: string
  confirmText?: string
  destructive?: boolean
  onCancel: () => void
  onConfirm: () => void | Promise<void>
}) {
  const [busy, setBusy] = useState(false)
  return (
    <ModalShell onClose={onCancel}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xl dark:border-gray-800 dark:bg-gray-950"
      >
        <div className="text-lg font-semibold">{title}</div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{body}</p>
        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            onClick={onCancel}
            disabled={busy}
            className="rounded-xl border border-gray-200 px-3 py-2 text-sm shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              try {
                setBusy(true)
                await onConfirm()
              } finally {
                setBusy(false)
              }
            }}
            disabled={busy}
            className={`rounded-xl px-3 py-2 text-sm font-medium text-white shadow focus:outline-none focus:ring-2 focus:ring-offset-0 ${destructive ? "bg-rose-600 hover:bg-rose-700 focus:ring-rose-500" : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"}`}
          >
            {busy ? "Working..." : confirmText}
          </button>
        </div>
      </div>
    </ModalShell>
  )
}
