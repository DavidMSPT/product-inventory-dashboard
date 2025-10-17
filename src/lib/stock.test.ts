import { describe, it, expect } from 'vitest'
import { stockStatus } from './stock'

describe('stockStatus', () => {
  it('should return "Out of Stock" for 0 stock', () => {
    expect(stockStatus(0)).toBe('Out of Stock')
  })

  it('should return "Low Stock" for 1-5 items', () => {
    expect(stockStatus(1)).toBe('Low Stock')
    expect(stockStatus(3)).toBe('Low Stock')
    expect(stockStatus(5)).toBe('Low Stock')
  })

  it('should return "In Stock" for more than 5 items', () => {
    expect(stockStatus(6)).toBe('In Stock')
    expect(stockStatus(50)).toBe('In Stock')
    expect(stockStatus(1000)).toBe('In Stock')
  })

  it('should handle edge cases', () => {
    expect(stockStatus(-1)).toBe('Out of Stock')
    expect(stockStatus(5.5)).toBe('In Stock')
  })
})
