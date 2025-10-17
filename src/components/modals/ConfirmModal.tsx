import { useState } from "react"
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
      <div className="rounded-2xl border border-border bg-surface p-5 shadow-xl">
        <div className="text-lg font-semibold">{title}</div>
        <p className="mt-2 text-sm text-text-muted">{body}</p>
        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            onClick={onCancel}
            disabled={busy}
            className="rounded-xl border border-border px-3 py-2 text-sm shadow-sm hover:bg-bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
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
            className={`rounded-xl px-3 py-2 text-sm font-medium shadow focus:outline-none focus:ring-2 focus:ring-offset-0 ${destructive ? "bg-rose-600 hover:bg-rose-700 focus:ring-rose-500 text-white" : "bg-primary hover:bg-primary/90 focus:ring-ring text-primary-foreground"}`}
          >
            {busy ? "Working..." : confirmText}
          </button>
        </div>
      </div>
    </ModalShell>
  )
}
