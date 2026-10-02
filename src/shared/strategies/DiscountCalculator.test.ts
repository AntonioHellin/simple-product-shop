import { describe, it, expect, beforeEach } from 'vitest'
import type { CartItem, Product } from '@/shared/types'
import { DiscountCalculator } from './DiscountCalculator'

describe('DiscountCalculator', () => {
  let calculator: DiscountCalculator

  const mockProduct10: Product = {
    id: 1,
    name: 'Snorkel Clip',
    price: 10,
    image: 'https://example.com/clip.jpg',
    description: 'Small accessory',
  }

  const mockProduct25: Product = {
    id: 2,
    name: 'Dry Bag Mini',
    price: 25,
    image: 'https://example.com/bag.jpg',
    description: 'Medium accessory',
  }

  const mockProduct60: Product = {
    id: 3,
    name: 'Diving Fins',
    price: 60,
    image: 'https://example.com/fins.jpg',
    description: 'Large gear',
  }

  beforeEach(() => {
    calculator = new DiscountCalculator()
  })

  it('retorna 0 para carrito vacío', () => {
    expect(calculator.calculate([], 0)).toBe(0)
    expect(calculator.getBreakdown([], 0)).toEqual([])
  })

  it('aplica solo bulk cuando corresponde (subtotal < $100)', () => {
    // 5 units @ $10 = $50. Bulk discount (10%): $5. Remaining: $45 (< $100, no order discount).
    const items: CartItem[] = [{ product: mockProduct10, quantity: 5 }]
    const subtotal = 50

    expect(calculator.calculate(items, subtotal)).toBe(5)
  })

  it('aplica solo order cuando corresponde (items con qty < 5)', () => {
    // 2 units @ $60 = $120. No bulk discount. Order discount (15% of $120): $18.
    const items: CartItem[] = [{ product: mockProduct60, quantity: 2 }]
    const subtotal = 120

    expect(calculator.calculate(items, subtotal)).toBe(18)
  })

  it('aplica ambos secuencialmente cuando ambos aplican', () => {
    // 5 units @ $25 = $125.
    // 1. Bulk discount (10% of $125): $12.50 -> remaining: $112.50
    // 2. Order discount (15% of $112.50): $16.875 -> total discount: $29.375
    const items: CartItem[] = [{ product: mockProduct25, quantity: 5 }]
    const subtotal = 125

    expect(calculator.calculate(items, subtotal)).toBe(29.375)
  })

  it('getBreakdown retorna array con nombre y monto de cada descuento', () => {
    const items: CartItem[] = [{ product: mockProduct25, quantity: 5 }]
    const subtotal = 125

    const breakdown = calculator.getBreakdown(items, subtotal)

    expect(breakdown).toEqual([
      { name: 'Bulk Discount', amount: 12.5 },
      { name: 'Order Discount', amount: 16.875 },
    ])
  })
})
