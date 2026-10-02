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

  it('tiene el nombre correcto "Order Discount"', () => {
    expect(strategy.name).toBe('Order Discount')
  })

  it('NO es aplicable si subtotal < $100', () => {
    const subtotal = ORDER_DISCOUNT_THRESHOLD - 0.01
    expect(strategy.isApplicable(emptyItems, subtotal)).toBe(false)
  })

  it('ES aplicable si subtotal >= $100', () => {
    expect(strategy.isApplicable(emptyItems, ORDER_DISCOUNT_THRESHOLD)).toBe(true)
    expect(strategy.isApplicable(emptyItems, 150)).toBe(true)
  })

  it('calcula 15% correctamente', () => {
    const subtotal = 200
    const expectedDiscount = subtotal * ORDER_DISCOUNT_RATE
    expect(strategy.calculate(emptyItems, subtotal)).toBe(expectedDiscount)
  })
})
