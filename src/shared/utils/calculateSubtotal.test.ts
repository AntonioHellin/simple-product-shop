import { describe, it, expect } from 'vitest'
import type { CartItem } from '@/shared/types'
import { calculateSubtotal } from './calculateSubtotal'

describe('calculateSubtotal', () => {
  it('returns 0 for an empty cart', () => {
    expect(calculateSubtotal([])).toBe(0)
  })

  it('calculates subtotal for a single item', () => {
    const items: CartItem[] = [
      {
        product: {
          id: 1,
          name: 'Item 1',
          price: 25.5,
          image: '',
          description: '',
        },
        quantity: 2,
      },
    ]

    expect(calculateSubtotal(items)).toBe(51)
  })

  it('calculates subtotal for multiple items', () => {
    const items: CartItem[] = [
      {
        product: {
          id: 1,
          name: 'Item 1',
          price: 10,
          image: '',
          description: '',
        },
        quantity: 3,
      },
      {
        product: {
          id: 2,
          name: 'Item 2',
          price: 20.25,
          image: '',
          description: '',
        },
        quantity: 2,
      },
      {
        product: {
          id: 3,
          name: 'Item 3',
          price: 15,
          image: '',
          description: '',
        },
        quantity: 1,
      },
    ]

    expect(calculateSubtotal(items)).toBe(85.5)
  })
})
