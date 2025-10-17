import { useCallback, useEffect, useMemo, useReducer } from "react"
import SummaryCard from "@components/cards/SummaryCard"
import ProductCard from "@components/products/ProductCard"
import ProductTable from "@components/products/ProductTable"
import ErrorBanner from "@components/feedback/ErrorBanner"
import EmptyState from "@components/feedback/EmptyState"
import SkeletonGrid from "@components/feedback/SkeletonGrid"
import ConfirmModal from "@components/modals/ConfirmModal"
import ProductModal from "@components/modals/ProductModal"
import { api } from "@lib/api"
import { stockStatus } from "@lib/stock"
import { formatCurrency } from "@lib/format"
import { initialState } from "@store/state"
import { reducer } from "@store/reducer"
import type { SortKey } from "@store/types"

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const root = document.documentElement
    if (state.theme === "dark") root.classList.add("dark")
    else root.classList.remove("dark")
  }, [state.theme])

  const load = useCallback(async () => {
    dispatch({ type: "LOAD_START" })
    try {
      const products = await api.list()
      dispatch({ type: "LOAD_SUCCESS", products })
    } catch (e: any) {
      dispatch({ type: "LOAD_ERROR", error: e?.message || "Failed to load" })
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const filtered = useMemo(() => {
    const q = state.query.trim().toLowerCase()
    const min = parseFloat(state.priceMin)
    const max = parseFloat(state.priceMax)
    let list = state.products.filter((p) => {
      const matchesQuery =
        q.length === 0 ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      const matchesCategory = state.category === "All" || p.category === state.category
      const status = stockStatus(p.stock)
      const matchesStock = state.stockFilter === "All" || status === state.stockFilter
      const matchesPriceMin = isNaN(min) ? true : p.price >= min
      const matchesPriceMax = isNaN(max) ? true : p.price <= max
      return matchesQuery && matchesCategory && matchesStock && matchesPriceMin && matchesPriceMax
    })
    list.sort((a, b) => {
      const dir = state.sortDir === "asc" ? 1 : -1
      switch (state.sortKey) {
        case "name":
          return a.name.localeCompare(b.name) * dir
        case "price":
          return (a.price - b.price) * dir
        case "stock":
          return (a.stock - b.stock) * dir
      }
    })
    return list
  }, [
    state.products,
    state.query,
    state.category,
    state.stockFilter,
    state.priceMin,
    state.priceMax,
    state.sortKey,
    state.sortDir,
  ])

  const stats = useMemo(() => {
    const total = state.products.length
    const inStock = state.products.filter((p) => stockStatus(p.stock) === "In Stock").length
    const lowStock = state.products.filter((p) => stockStatus(p.stock) === "Low Stock").length
    const outStock = state.products.filter((p) => stockStatus(p.stock) === "Out of Stock").length
    const avg = state.products.length
      ? state.products.reduce((s, p) => s + p.price, 0) / state.products.length
      : 0
    return { total, inStock, lowStock, outStock, avg }
  }, [state.products])

  const onAdd = () => dispatch({ type: "OPEN_MODAL", modal: { type: "add", product: null } })
  const onEdit = (p: any) => dispatch({ type: "OPEN_MODAL", modal: { type: "edit", product: p } })
  const onDelete = (p: any) => dispatch({ type: "CONFIRM_DELETE", product: p })

  return (
    <div className="min-h-screen bg-bg text-text transition-colors duration-300">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
          <h1 className="text-2xl font-bold tracking-tight">Product Inventory Dashboard</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                dispatch({ type: "SET_THEME", theme: state.theme === "light" ? "dark" : "light" })
              }
              className="rounded-xl border border-border px-3 py-2 text-sm shadow-sm hover:bg-bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {state.theme === "light" ? "Dark" : "Light"} mode
            </button>
            <button
              onClick={onAdd}
              className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              + Add Product
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          <div className="md:col-span-4">
            <input
              type="text"
              value={state.query}
              onChange={(e) => dispatch({ type: "SET_QUERY", query: e.target.value })}
              placeholder="Search by name or description"
              className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm shadow-sm placeholder:text-text-muted focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="md:col-span-2">
            <select
              value={state.category}
              onChange={(e) => dispatch({ type: "SET_CATEGORY", category: e.target.value as any })}
              className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm shadow-sm focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="All">All Categories</option>
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Grocery</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <select
              value={state.stockFilter}
              onChange={(e) => dispatch({ type: "SET_STOCK", stock: e.target.value as any })}
              className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm shadow-sm focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="All">Any Stock</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <input
              type="number"
              inputMode="decimal"
              value={state.priceMin}
              onChange={(e) => dispatch({ type: "SET_PRICE_MIN", value: e.target.value })}
              placeholder="Min €"
              className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm shadow-sm placeholder:text-text-muted focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="md:col-span-2">
            <input
              type="number"
              inputMode="decimal"
              value={state.priceMax}
              onChange={(e) => dispatch({ type: "SET_PRICE_MAX", value: e.target.value })}
              placeholder="Max €"
              className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm shadow-sm placeholder:text-text-muted focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm">Sort by</label>
            <select
              value={state.sortKey}
              onChange={(e) =>
                dispatch({ type: "SET_SORT", key: e.target.value as SortKey, dir: state.sortDir })
              }
              className="rounded-xl border border-border bg-surface px-3 py-2 text-sm shadow-sm focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="stock">Stock</option>
            </select>
            <button
              onClick={() =>
                dispatch({
                  type: "SET_SORT",
                  key: state.sortKey,
                  dir: state.sortDir === "asc" ? "desc" : "asc",
                })
              }
              className="rounded-xl border border-border px-3 py-2 text-sm shadow-sm hover:bg-bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {state.sortDir === "asc" ? "Asc" : "Desc"}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch({ type: "SET_VIEW", view: "grid" })}
              className={`rounded-xl border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring ${state.view === "grid" ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-bg-muted"}`}
            >
              Grid
            </button>
            <button
              onClick={() => dispatch({ type: "SET_VIEW", view: "table" })}
              className={`rounded-xl border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring ${state.view === "table" ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-bg-muted"}`}
            >
              Table
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <SummaryCard title="Total" value={String(stats.total)} />
          <SummaryCard title="In Stock" value={String(stats.inStock)} />
          <SummaryCard title="Low Stock" value={String(stats.lowStock)} />
          <SummaryCard title="Out of Stock" value={String(stats.outStock)} />
        </div>
        <div className="mt-3">
          <SummaryCard title="Average Price" value={formatCurrency(stats.avg)} full />
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-6">
        {state.loading ? (
          <SkeletonGrid />
        ) : state.error ? (
          <ErrorBanner message={state.error} onRetry={load} />
        ) : filtered.length === 0 ? (
          <EmptyState onAdd={onAdd} />
        ) : state.view === "grid" ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onEdit={() => onEdit(p)}
                onDelete={() => onDelete(p)}
              />
            ))}
          </div>
        ) : (
          <ProductTable products={filtered} onEdit={onEdit} onDelete={onDelete} />
        )}
      </main>

      {state.modal.type && (
        <ProductModal
          mode={state.modal.type}
          product={state.modal.product ?? undefined}
          onClose={() => dispatch({ type: "CLOSE_MODAL" })}
          onSubmit={async (payload) => {
            try {
              if (state.modal.type === "add") {
                const created = await api.create(payload as any)
                dispatch({ type: "UPSERT_PRODUCT", product: created })
              } else if (state.modal.type === "edit" && state.modal.product) {
                const updated = await api.update(state.modal.product.id, payload)
                dispatch({ type: "UPSERT_PRODUCT", product: updated })
              }
              dispatch({ type: "CLOSE_MODAL" })
            } catch (e: any) {
              alert(e?.message || "Failed to save product")
            }
          }}
        />
      )}

      {state.confirmDelete && (
        <ConfirmModal
          title="Delete product"
          body={`Are you sure you want to delete "${state.confirmDelete.name}"? This cannot be undone.`}
          confirmText="Delete"
          destructive
          onCancel={() => dispatch({ type: "CONFIRM_DELETE", product: null })}
          onConfirm={async () => {
            try {
              await api.remove(state.confirmDelete!.id)
              dispatch({ type: "REMOVE_PRODUCT", id: state.confirmDelete!.id })
            } catch (e: any) {
              alert(e?.message || "Failed to delete")
            } finally {
              dispatch({ type: "CONFIRM_DELETE", product: null })
            }
          }}
        />
      )}

      <footer className="mx-auto max-w-7xl px-4 pb-10 pt-6 text-center text-xs text-text-muted">
        Built with React + TypeScript + Tailwind. Data persists in your browser.
      </footer>
    </div>
  )
}
