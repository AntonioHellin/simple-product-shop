import { describe, it, expect } from 'vitest'
import type { CartItem } from '@/shared/types'
import { BULK_DISCOUNT } from '@/shared/constants'
import { calculateBulkDiscount } from './calculateBulkDiscount'

describe('calculateBulkDiscount', () => {
  it('returns 0 when items array is empty', () => {
    expect(calculateBulkDiscount([])).toBe(0)
  })

  it('returns 0 when items have less than 5 units', () => {
    const items: CartItem[] = [
      {
        product: { id: 1, name: 'Item 1', price: 20, image: '', description: '' },
        quantity: BULK_DISCOUNT.MIN_QUANTITY - 1,
      },
    ]

    expect(calculateBulkDiscount(items)).toBe(0)
  })

  it('calculates 10% discount when item has exactly 5 units', () => {
    const items: CartItem[] = [
      {
        product: { id: 1, name: 'Item 1', price: 20, image: '', description: '' },
        quantity: BULK_DISCOUNT.MIN_QUANTITY,
      },
    ]

    const expectedDiscount = 20 * BULK_DISCOUNT.MIN_QUANTITY * BULK_DISCOUNT.PERCENTAGE
    expect(calculateBulkDiscount(items)).toBe(expectedDiscount)
  })

  it('calculates 10% discount when item has more than 5 units', () => {
    const items: CartItem[] = [
      {
        product: { id: 1, name: 'Item 1', price: 20, image: '', description: '' },
        quantity: 10,
      },
    ]

    const expectedDiscount = 20 * 10 * BULK_DISCOUNT.PERCENTAGE
    expect(calculateBulkDiscount(items)).toBe(expectedDiscount)
  })

  it('only discounts items that qualify in a cart with multiple items', () => {
    const items: CartItem[] = [
      {
        product: { id: 1, name: 'Qualifying Item', price: 30, image: '', description: '' },
        quantity: 5,
      },
      {
        product: { id: 2, name: 'Non-qualifying Item', price: 50, image: '', description: '' },
        quantity: 2,
      },
      {
        product: { id: 3, name: 'Another Qualifying Item', price: 10, image: '', description: '' },
        quantity: 6,
      },
    ]

    // (30 * 5 * 0.1) + (10 * 6 * 0.1) = 15 + 6 = 21
    expect(calculateBulkDiscount(items)).toBe(21)
  })
})
