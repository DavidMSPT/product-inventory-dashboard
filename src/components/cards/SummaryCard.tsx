export default function SummaryCard({
  title,
  value,
  full = false,
}: {
  title: string
  value: string
  full?: boolean
}) {
  return (
    <div className={`${full ? "col-span-2 sm:col-span-4" : ""}`}>
      <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm transition hover:shadow-md focus-within:ring-2 focus-within:ring-ring">
        <div className="text-xs uppercase tracking-wide text-text-muted">{title}</div>
        <div className="mt-1 text-2xl font-semibold">{value}</div>
      </div>
    </div>
  )
}
