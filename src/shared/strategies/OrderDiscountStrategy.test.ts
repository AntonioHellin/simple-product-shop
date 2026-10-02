import { describe, it, expect, beforeEach } from 'vitest'
import type { CartItem } from '@/shared/types'
import {
  ORDER_DISCOUNT_THRESHOLD,
  ORDER_DISCOUNT_RATE,
} from '@/shared/constants/businessRules'
import { OrderDiscountStrategy } from './OrderDiscountStrategy'

describe('OrderDiscountStrategy', () => {
  let strategy: OrderDiscountStrategy

  const emptyItems: CartItem[] = []

  beforeEach(() => {
    strategy = new OrderDiscountStrategy()
  })

  it('has the correct name "Order Discount"', () => {
    expect(strategy.name).toBe('Order Discount')
  })

  it('is NOT applicable if subtotal < $100', () => {
    const subtotal = ORDER_DISCOUNT_THRESHOLD - 0.01
    expect(strategy.isApplicable(emptyItems, subtotal)).toBe(false)
  })

  it('is applicable if subtotal >= $100', () => {
    expect(strategy.isApplicable(emptyItems, ORDER_DISCOUNT_THRESHOLD)).toBe(true)
    expect(strategy.isApplicable(emptyItems, 150)).toBe(true)
  })

  it('calculates 15% correctly', () => {
    const subtotal = 200
    const expectedDiscount = subtotal * ORDER_DISCOUNT_RATE
    expect(strategy.calculate(emptyItems, subtotal)).toBe(expectedDiscount)
  })

  it('returns 0 if subtotal < threshold when calculating', () => {
    expect(strategy.calculate(emptyItems, 50)).toBe(0)
  })
})
