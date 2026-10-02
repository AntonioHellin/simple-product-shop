import { createContext } from 'react'
import type { CartItem, Product } from '@/shared/types'
import type { DiscountBreakdownItem } from '@/shared/strategies'

export type { DiscountBreakdownItem }

export type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' }

export interface CartState {
  items: CartItem[]
}

export interface CartContextType {
  items: CartItem[]
  itemCount: number
  subtotal: number
  discount: number
  total: number
  discountBreakdown: DiscountBreakdownItem[]
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextType | null>(null)
