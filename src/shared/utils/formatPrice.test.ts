import { describe, it, expect } from 'vitest'
import { formatPrice } from './formatPrice'

describe('formatPrice', () => {
  it('formats integer numbers with two decimal places', () => {
    expect(formatPrice(25)).toBe('$25.00')
    expect(formatPrice(100)).toBe('$100.00')
  })

  it('formats decimal numbers with two decimal places', () => {
    expect(formatPrice(29.99)).toBe('$29.99')
    expect(formatPrice(10.5)).toBe('$10.50')
  })

  it('formats zero correctly', () => {
    expect(formatPrice(0)).toBe('$0.00')
  })

  it('formats large numbers with thousands separators', () => {
    expect(formatPrice(1000)).toBe('$1,000.00')
    expect(formatPrice(1234.56)).toBe('$1,234.56')
    expect(formatPrice(1000000)).toBe('$1,000,000.00')
  })
})
