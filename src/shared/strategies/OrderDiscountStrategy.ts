import type { CartItem } from '@/shared/types'
import { businessRules } from '@/shared/constants/businessRules'
import type { DiscountStrategy } from './DiscountStrategy'

export class OrderDiscountStrategy implements DiscountStrategy {
  readonly name = 'Order Discount'
  readonly description = businessRules.orderDiscount.label

  isApplicable(_items: CartItem[], subtotal: number): boolean {
    return subtotal >= businessRules.orderDiscount.threshold
  }

  calculate(_items: CartItem[], subtotal: number): number {
    if (subtotal < businessRules.orderDiscount.threshold) {
      return 0
    }
    return subtotal * businessRules.orderDiscount.percentage
  }
}
