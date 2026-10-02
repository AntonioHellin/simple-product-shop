import type { CartItem } from '@/shared/types'
import type { DiscountStrategy } from './DiscountStrategy'
import { BulkDiscountStrategy } from './BulkDiscountStrategy'
import { OrderDiscountStrategy } from './OrderDiscountStrategy'

export interface DiscountBreakdownItem {
  name: string
  amount: number
}

/**
 * Context class coordinating discount strategy evaluation.
 * @prompt Implement Strategy Pattern orchestrator computing best discounts and breakdowns.
 * @see docs/PROMPT_JOURNEY.md#24-discount-strategy-engine-oop-pattern
 */
export class DiscountCalculator {
  private strategies: DiscountStrategy[]

  constructor(strategies?: DiscountStrategy[]) {
    this.strategies = strategies ?? [
      new BulkDiscountStrategy(),
      new OrderDiscountStrategy(),
    ]
  }

  getBreakdown(items: CartItem[], subtotal: number): DiscountBreakdownItem[] {
    if (items.length === 0 || subtotal <= 0) {
      return []
    }

    const breakdown: DiscountBreakdownItem[] = []
    let currentSubtotal = subtotal

    for (const strategy of this.strategies) {
      if (!strategy.isApplicable(items, currentSubtotal)) {
        continue
      }

      const discountAmount = strategy.calculate(items, currentSubtotal)
      if (discountAmount <= 0) {
        continue
      }

      breakdown.push({
        name: strategy.name,
        amount: discountAmount,
      })
      currentSubtotal -= discountAmount
    }

    return breakdown
  }

  calculate(items: CartItem[], subtotal: number): number {
    const breakdown = this.getBreakdown(items, subtotal)
    return breakdown.reduce((total, item) => total + item.amount, 0)
  }
}
