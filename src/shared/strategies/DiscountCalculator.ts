import type { CartItem } from '@/shared/types'
import type { DiscountStrategy } from './DiscountStrategy'
import { BulkDiscountStrategy } from './BulkDiscountStrategy'
import { OrderDiscountStrategy } from './OrderDiscountStrategy'

export interface DiscountBreakdownItem {
  name: string
  amount: number
}

export class DiscountCalculator {
  private strategies: DiscountStrategy[]

  constructor(strategies?: DiscountStrategy[]) {
    this.strategies = strategies ?? [
      new BulkDiscountStrategy(),
      new OrderDiscountStrategy(),
    ]
  }

  getBreakdown(items: CartItem[], subtotal: number): DiscountBreakdownItem[] {
    const breakdown: DiscountBreakdownItem[] = []
    let currentSubtotal = subtotal

    for (const strategy of this.strategies) {
      if (strategy.isApplicable(items, currentSubtotal)) {
        const discountAmount = strategy.calculate(items, currentSubtotal)
        if (discountAmount > 0) {
          breakdown.push({
            name: strategy.name,
            amount: discountAmount,
          })
          currentSubtotal -= discountAmount
        }
      }
    }

    return breakdown
  }

  calculate(items: CartItem[], subtotal: number): number {
    const breakdown = this.getBreakdown(items, subtotal)
    return breakdown.reduce((total, item) => total + item.amount, 0)
  }
}
