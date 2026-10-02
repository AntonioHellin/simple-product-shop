import { describe, it, expect, beforeEach } from 'vitest'
import type { CartItem, Product } from '@/shared/types'
import { DiscountCalculator } from './DiscountCalculator'

/**
 * @prompt Implement discount engine using Strategy Pattern with BulkDiscountStrategy and OrderDiscountStrategy.
 * @tdd RED: Write unit tests verifying single and sequential strategy execution and breakdown output.
 *      GREEN: Implement DiscountCalculator orchestrator applying valid strategies in sequence.
 *      REFACTOR: Support arbitrary strategy injections and 0-discount omission.
 * @see docs/PROMPT_JOURNEY.md#24-discount-strategy-engine-oop-pattern
 */
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

  it('returns 0 for empty cart', () => {
    expect(calculator.calculate([], 0)).toBe(0)
    expect(calculator.getBreakdown([], 0)).toEqual([])
  })

  it('applies only bulk discount when applicable (subtotal < $100)', () => {
    // 5 units @ $10 = $50. Bulk discount (10%): $5. Remaining: $45 (< $100, no order discount).
    const items: CartItem[] = [{ product: mockProduct10, quantity: 5 }]
    const subtotal = 50

    expect(calculator.calculate(items, subtotal)).toBe(5)
  })

  it('applies only order discount when applicable (items with qty < 5)', () => {
    // 2 units @ $60 = $120. No bulk discount. Order discount (15% of $120): $18.
    const items: CartItem[] = [{ product: mockProduct60, quantity: 2 }]
    const subtotal = 120

    expect(calculator.calculate(items, subtotal)).toBe(18)
  })

  it('applies both sequentially when both apply', () => {
    // 5 units @ $25 = $125.
    // 1. Bulk discount (10% of $125): $12.50 -> remaining: $112.50
    // 2. Order discount (15% of $112.50): $16.875 -> total discount: $29.375
    const items: CartItem[] = [{ product: mockProduct25, quantity: 5 }]
    const subtotal = 125

    expect(calculator.calculate(items, subtotal)).toBe(29.375)
  })

  it('getBreakdown returns array with name and amount of each discount', () => {
    const items: CartItem[] = [{ product: mockProduct25, quantity: 5 }]
    const subtotal = 125

    const breakdown = calculator.getBreakdown(items, subtotal)

    expect(breakdown).toEqual([
      { name: 'Bulk Discount', amount: 12.5 },
      { name: 'Order Discount', amount: 16.875 },
    ])
  })

  it('omits strategies that calculate 0 discount', () => {
    const zeroStrategy = {
      name: 'Zero Strategy',
      description: 'Calculates 0',
      isApplicable: () => true,
      calculate: () => 0,
    }
    const customCalc = new DiscountCalculator([zeroStrategy])
    const items: CartItem[] = [{ product: mockProduct25, quantity: 1 }]
    expect(customCalc.getBreakdown(items, 25)).toEqual([])
  })
})
