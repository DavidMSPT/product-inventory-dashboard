import type { GlobalState } from './state'
import type { SortKey } from './types'
import { save } from '@lib/storage'

export type Action =
  | { type: 'LOAD_START' }
  | { type: 'LOAD_SUCCESS'; products: GlobalState['products'] }
  | { type: 'LOAD_ERROR'; error: string }
  | { type: 'SET_VIEW'; view: GlobalState['view'] }
  | { type: 'SET_QUERY'; query: string }
  | { type: 'SET_CATEGORY'; category: GlobalState['category'] }
  | { type: 'SET_STOCK'; stock: GlobalState['stockFilter'] }
  | { type: 'SET_PRICE_MIN'; value: string }
  | { type: 'SET_PRICE_MAX'; value: string }
  | { type: 'SET_SORT'; key: SortKey; dir: 'asc' | 'desc' }
  | { type: 'SET_THEME'; theme: GlobalState['theme'] }
  | { type: 'OPEN_MODAL'; modal: GlobalState['modal'] }
  | { type: 'CLOSE_MODAL' }
  | { type: 'CONFIRM_DELETE'; product: GlobalState['confirmDelete'] }
  | { type: 'UPSERT_PRODUCT'; product: GlobalState['products'][number] }
  | { type: 'REMOVE_PRODUCT'; id: string }

export function reducer(state: GlobalState, action: Action): GlobalState {
  switch (action.type) {
    case 'LOAD_START': return { ...state, loading: true, error: null }
    case 'LOAD_SUCCESS': return { ...state, loading: false, products: action.products }
    case 'LOAD_ERROR': return { ...state, loading: false, error: action.error }
    case 'SET_VIEW': return { ...state, view: action.view }
    case 'SET_QUERY': return { ...state, query: action.query }
    case 'SET_CATEGORY': return { ...state, category: action.category }
    case 'SET_STOCK': return { ...state, stockFilter: action.stock }
    case 'SET_PRICE_MIN': return { ...state, priceMin: action.value }
    case 'SET_PRICE_MAX': return { ...state, priceMax: action.value }
    case 'SET_SORT': return { ...state, sortKey: action.key, sortDir: action.dir }
    case 'SET_THEME': return { ...state, theme: action.theme }
    case 'OPEN_MODAL': return { ...state, modal: action.modal }
    case 'CLOSE_MODAL': return { ...state, modal: { type: null, product: null } }
    case 'CONFIRM_DELETE': return { ...state, confirmDelete: action.product }
    case 'UPSERT_PRODUCT': {
      const idx = state.products.findIndex(p => p.id === action.product.id)
      const next = [...state.products]
      if (idx >= 0) next[idx] = action.product; else next.unshift(action.product)
      save(next)
      return { ...state, products: next }
    }
    case 'REMOVE_PRODUCT': {
      const next = state.products.filter(p => p.id !== action.id)
      save(next); return { ...state, products: next }
    }
    default: return state
  }
}
