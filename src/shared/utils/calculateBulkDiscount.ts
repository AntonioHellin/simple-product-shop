import type { CartItem } from '@/shared/types'
import { BULK_DISCOUNT } from '@/shared/constants'

export function calculateBulkDiscount(items: CartItem[]): number {
  return items.reduce((discount, item) => {
    if (item.quantity >= BULK_DISCOUNT.MIN_QUANTITY) {
      const itemSubtotal = item.product.price * item.quantity
      return discount + itemSubtotal * BULK_DISCOUNT.PERCENTAGE
    }
    return discount
  }, 0)
}
