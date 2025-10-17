import { describe, it, expect } from 'vitest'
import { reducer } from './reducer'
import type { GlobalState } from './state'

const mockState: GlobalState = {
  products: [],
  loading: false,
  error: null,
  view: 'grid',
  query: '',
  category: 'All',
  stockFilter: 'All',
  priceMin: '',
  priceMax: '',
  sortKey: 'name',
  sortDir: 'asc',
  theme: 'light',
  modal: { type: null, product: null },
  confirmDelete: null,
}

describe('reducer', () => {
  describe('LOAD_START', () => {
    it('should set loading to true and clear error', () => {
      const state = { ...mockState, loading: false, error: 'Some error' }
      const result = reducer(state, { type: 'LOAD_START' })
      
      expect(result.loading).toBe(true)
      expect(result.error).toBe(null)
    })
  })

  describe('LOAD_SUCCESS', () => {
    it('should set products and stop loading', () => {
      const products = [
        { id: '1', name: 'Product 1', description: 'Desc', price: 10, category: 'Electronics' as const, stock: 5, imageUrl: 'url' }
      ]
      const result = reducer(mockState, { type: 'LOAD_SUCCESS', products })
      
      expect(result.loading).toBe(false)
      expect(result.products).toEqual(products)
    })
  })

  describe('LOAD_ERROR', () => {
    it('should set error and stop loading', () => {
      const result = reducer(mockState, { type: 'LOAD_ERROR', error: 'Failed' })
      
      expect(result.loading).toBe(false)
      expect(result.error).toBe('Failed')
    })
  })

  describe('SET_QUERY', () => {
    it('should update search query', () => {
      const result = reducer(mockState, { type: 'SET_QUERY', query: 'laptop' })
      expect(result.query).toBe('laptop')
    })
  })

  describe('SET_VIEW', () => {
    it('should toggle between grid and table view', () => {
      const result = reducer(mockState, { type: 'SET_VIEW', view: 'table' })
      expect(result.view).toBe('table')
    })
  })

  describe('SET_THEME', () => {
    it('should toggle theme', () => {
      const result = reducer(mockState, { type: 'SET_THEME', theme: 'dark' })
      expect(result.theme).toBe('dark')
    })
  })

  describe('OPEN_MODAL', () => {
    it('should open add modal', () => {
      const result = reducer(mockState, {
        type: 'OPEN_MODAL',
        modal: { type: 'add', product: null }
      })
      
      expect(result.modal.type).toBe('add')
      expect(result.modal.product).toBe(null)
    })
  })

  describe('CLOSE_MODAL', () => {
    it('should close modal', () => {
      const state = {
        ...mockState,
        modal: { type: 'add' as const, product: null }
      }
      const result = reducer(state, { type: 'CLOSE_MODAL' })
      
      expect(result.modal.type).toBe(null)
    })
  })
})
