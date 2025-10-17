const LS_KEY = 'inventory.products.v1'
export function load<T = unknown>(): T[] {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as T[]
    return Array.isArray(parsed) ? parsed : []
  } catch { return [] }
}
export function save<T = unknown>(items: T[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(items))
}
export const lsKey = LS_KEY
