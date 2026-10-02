import {
  useReducer,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  type ReactNode,
} from 'react'
import * as Sentry from '@sentry/react'
import type { Product } from '@/shared/types'
import { calculateSubtotal } from '@/shared/utils'
import { DiscountCalculator } from '@/shared/strategies'
import { businessRules } from '@/shared/constants/businessRules'
import {
  CartContext,
  type CartState,
  type CartAction,
} from './CartContextValue'

const STORAGE_KEY = 'cart_items'

const initialCartState: CartState = {
  items: [],
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === action.payload.id
      )

      if (existingItemIndex > -1) {
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        return { ...state, items: updatedItems }
      }

      return {
        ...state,
        items: [...state.items, { product: action.payload, quantity: businessRules.quantity.min }],
      }
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.payload),
      }
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload

      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.product.id !== productId),
        }
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        ),
      }
    }

    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
      }
    }

    default:
      return state
  }
}

function initCartState(initial: CartState): CartState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return initial

    const parsed = JSON.parse(saved)
    if (!Array.isArray(parsed)) return initial

    return { items: parsed }
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error)
    return initial
  }
}

interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialCartState,
    initCartState
  )
  const isInitialMount = useRef(true)
  const discountCalculator = useMemo(() => new DiscountCalculator(), [])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error)
    }
  }, [state.items])

  const addItem = useCallback((product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product })
    Sentry.addBreadcrumb({
      category: 'cart',
      message: `Added ${product.name} to cart`,
      level: 'info',
      data: { productId: product.id, productName: product.name },
    })
  }, [])

  const removeItem = useCallback((productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId })
    Sentry.addBreadcrumb({
      category: 'cart',
      message: `Removed item ${productId} from cart`,
      level: 'info',
    })
  }, [])

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' })
    Sentry.addBreadcrumb({
      category: 'cart',
      message: 'Cleared cart',
      level: 'info',
    })
  }, [])

  const itemCount = useMemo(
    () => state.items.reduce((acc, item) => acc + item.quantity, 0),
    [state.items]
  )

  const subtotal = useMemo(
    () => calculateSubtotal(state.items),
    [state.items]
  )

  const discountBreakdown = useMemo(
    () => discountCalculator.getBreakdown(state.items, subtotal),
    [discountCalculator, state.items, subtotal]
  )

  const discount = useMemo(
    () => discountBreakdown.reduce((acc, item) => acc + item.amount, 0),
    [discountBreakdown]
  )

  const total = useMemo(
    () => Math.max(0, subtotal - discount),
    [subtotal, discount]
  )

  const value = useMemo(
    () => ({
      items: state.items,
      itemCount,
      subtotal,
      discount,
      total,
      discountBreakdown,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [
      state.items,
      itemCount,
      subtotal,
      discount,
      total,
      discountBreakdown,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    ]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
