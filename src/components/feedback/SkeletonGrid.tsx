export default function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
        >
          <div className="h-40 w-full bg-bg-muted" />
          <div className="space-y-2 p-4">
            <div className="h-4 w-1/2 rounded bg-bg-muted" />
            <div className="h-3 w-11/12 rounded bg-bg-muted" />
            <div className="h-3 w-10/12 rounded bg-bg-muted" />
          </div>
        </div>
      ))}
    </div>
  )
}
