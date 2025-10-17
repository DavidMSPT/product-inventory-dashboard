import { describe, it, expect } from 'vitest'
import { formatCurrency } from './format'

describe('formatCurrency', () => {
  it('should format numbers as EUR currency', () => {
    expect(formatCurrency(10)).toBe('€10.00')
    expect(formatCurrency(99.99)).toBe('€99.99')
    expect(formatCurrency(1000)).toBe('€1,000.00')
  })

  it('should handle zero', () => {
    expect(formatCurrency(0)).toBe('€0.00')
  })

  it('should round to 2 decimal places', () => {
    expect(formatCurrency(10.999)).toBe('€11.00')
    expect(formatCurrency(10.001)).toBe('€10.00')
  })

  it('should handle large numbers', () => {
    expect(formatCurrency(1234567.89)).toBe('€1,234,567.89')
  })
})
