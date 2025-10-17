export default function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-text-muted">
      No products match your filters. You can add a new product to get started.
      <div className="mt-4">
        <button
          onClick={onAdd}
          className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Add Product
        </button>
      </div>
    </div>
  )
}
