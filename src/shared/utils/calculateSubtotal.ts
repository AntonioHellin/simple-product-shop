import type { CartItem } from '@/shared/types'

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.product.price * item.quantity, 0)
}
