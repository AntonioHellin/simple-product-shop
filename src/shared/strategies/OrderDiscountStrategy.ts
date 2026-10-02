import type { CartItem } from '@/shared/types'
import {
  ORDER_DISCOUNT_THRESHOLD,
  ORDER_DISCOUNT_RATE,
  ORDER_DISCOUNT,
} from '@/shared/constants/businessRules'
import type { DiscountStrategy } from './DiscountStrategy'

export class OrderDiscountStrategy implements DiscountStrategy {
  readonly name = 'Order Discount'
  readonly description = ORDER_DISCOUNT.LABEL

  isApplicable(_items: CartItem[], subtotal: number): boolean {
    return subtotal >= ORDER_DISCOUNT_THRESHOLD
  }

  calculate(_items: CartItem[], subtotal: number): number {
    return subtotal * ORDER_DISCOUNT_RATE
  }
}
