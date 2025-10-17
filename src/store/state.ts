import type { Product, ViewMode, Theme, SortKey } from './types'
import type { StockStatus } from '@lib/stock'
const themeStorageKey = 'inventory.theme'

export type GlobalState = {
  products: Product[]
  loading: boolean
  error: string | null
  view: ViewMode
  query: string
  category: Product['category'] | 'All'
  stockFilter: StockStatus | 'All'
  priceMin: string
  priceMax: string
  sortKey: SortKey
  sortDir: 'asc' | 'desc'
  theme: Theme
  modal: { type: 'add' | 'edit' | null; product: Product | null }
  confirmDelete: Product | null
}

export const initialState: GlobalState = {
  products: [], loading: true, error: null,
  view: (localStorage.getItem('inventory.view') as ViewMode) || 'grid',
  query: '',
  category: 'All',
  stockFilter: 'All',
  priceMin: '',
  priceMax: '',
  sortKey: 'name',
  sortDir: 'asc',
  theme: (localStorage.getItem(themeStorageKey) as Theme) || 'light',
  modal: { type: null, product: null },
  confirmDelete: null
}

export const setViewPersist = (v: ViewMode) => localStorage.setItem('inventory.view', v)
export const setThemePersist = (t: Theme) => localStorage.setItem(themeStorageKey, t)
