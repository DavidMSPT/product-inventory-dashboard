export type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock'

export const STOCK_STATUSES: readonly StockStatus[] = ['In Stock', 'Low Stock', 'Out of Stock'] as const

export const stockStatus = (stock: number): StockStatus => {
  if (stock <= 0) return 'Out of Stock'
  if (stock <= 5) return 'Low Stock'
  return 'In Stock'
}
