import type { CartItem } from '@/shared/types'
import {
  BULK_DISCOUNT_THRESHOLD,
  BULK_DISCOUNT_RATE,
  BULK_DISCOUNT,
} from '@/shared/constants/businessRules'
import type { DiscountStrategy } from './DiscountStrategy'

export class BulkDiscountStrategy implements DiscountStrategy {
  readonly name = 'Bulk Discount'
  readonly description = BULK_DISCOUNT.LABEL

  isApplicable(items: CartItem[], _subtotal: number): boolean {
    return items.some((item) => item.quantity >= BULK_DISCOUNT_THRESHOLD)
  }

  calculate(items: CartItem[], _subtotal: number): number {
    return items.reduce((totalDiscount, item) => {
      if (item.quantity >= BULK_DISCOUNT_THRESHOLD) {
        return totalDiscount + item.product.price * item.quantity * BULK_DISCOUNT_RATE
      }
      return totalDiscount
    }, 0)
  }
}
