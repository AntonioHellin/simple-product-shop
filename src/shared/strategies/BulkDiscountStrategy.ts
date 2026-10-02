import type { CartItem } from '@/shared/types'
import { businessRules } from '@/shared/constants/businessRules'
import type { DiscountStrategy } from './DiscountStrategy'

export class BulkDiscountStrategy implements DiscountStrategy {
  readonly name = 'Bulk Discount'
  readonly description = businessRules.bulkDiscount.label

  isApplicable(items: CartItem[], _subtotal: number): boolean {
    return items.some((item) => item.quantity >= businessRules.bulkDiscount.threshold)
  }

  calculate(items: CartItem[], _subtotal: number): number {
    if (items.length === 0) return 0

    return items.reduce((totalDiscount, item) => {
      if (item.quantity < businessRules.bulkDiscount.threshold) {
        return totalDiscount
      }
      return totalDiscount + item.product.price * item.quantity * businessRules.bulkDiscount.percentage
    }, 0)
  }
}
