import type { CartItem } from '@/shared/types'
import { businessRules } from '@/shared/constants/businessRules'

export function calculateBulkDiscount(items: CartItem[]): number {
  if (items.length === 0) return 0

  return items.reduce((discount, item) => {
    if (item.quantity < businessRules.bulkDiscount.threshold) {
      return discount
    }
    const itemSubtotal = item.product.price * item.quantity
    return discount + itemSubtotal * businessRules.bulkDiscount.percentage
  }, 0)
}
