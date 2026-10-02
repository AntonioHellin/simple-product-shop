import { describe, it, expect, beforeEach } from 'vitest'
import type { CartItem } from '@/shared/types'
import { BULK_DISCOUNT_THRESHOLD, BULK_DISCOUNT_RATE } from '@/shared/constants/businessRules'
import { BulkDiscountStrategy } from './BulkDiscountStrategy'

describe('BulkDiscountStrategy', () => {
  let strategy: BulkDiscountStrategy

  const mockProduct1 = {
    id: 1,
    name: 'Product 1',
    price: 100,
    image: 'https://example.com/1.jpg',
    description: 'Description 1',
  }

  const mockProduct2 = {
    id: 2,
    name: 'Product 2',
    price: 50,
    image: 'https://example.com/2.jpg',
    description: 'Description 2',
  }

  beforeEach(() => {
    strategy = new BulkDiscountStrategy()
  })

  it('tiene el nombre correcto "Bulk Discount"', () => {
    expect(strategy.name).toBe('Bulk Discount')
  })

  it('NO es aplicable si ningún item tiene 5+ unidades', () => {
    const items: CartItem[] = [
      { product: mockProduct1, quantity: BULK_DISCOUNT_THRESHOLD - 1 },
      { product: mockProduct2, quantity: 2 },
    ]
    const subtotal = 400

    expect(strategy.isApplicable(items, subtotal)).toBe(false)
  })

  it('ES aplicable si algún item tiene 5+ unidades', () => {
    const items: CartItem[] = [
      { product: mockProduct1, quantity: BULK_DISCOUNT_THRESHOLD },
      { product: mockProduct2, quantity: 1 },
    ]
    const subtotal = 550

    expect(strategy.isApplicable(items, subtotal)).toBe(true)
  })

  it('calcula 10% correctamente para items que califican', () => {
    const items: CartItem[] = [
      { product: mockProduct1, quantity: BULK_DISCOUNT_THRESHOLD },
    ]
    const subtotal = mockProduct1.price * BULK_DISCOUNT_THRESHOLD
    const expectedDiscount = subtotal * BULK_DISCOUNT_RATE

    expect(strategy.calculate(items, subtotal)).toBe(expectedDiscount)
  })

  it('si hay múltiples items, solo descuenta los que califican (no todos)', () => {
    const items: CartItem[] = [
      { product: mockProduct1, quantity: BULK_DISCOUNT_THRESHOLD },
      { product: mockProduct2, quantity: 2 },
    ]
    const subtotal = 600
    const qualifyingSubtotal = mockProduct1.price * BULK_DISCOUNT_THRESHOLD
    const expectedDiscount = qualifyingSubtotal * BULK_DISCOUNT_RATE

    expect(strategy.calculate(items, subtotal)).toBe(expectedDiscount)
  })
})
