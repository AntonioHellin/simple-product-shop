import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  type ReactNode,
} from 'react'
import type { CartItem, Product } from '@/shared/types'
import { calculateSubtotal } from '@/shared/utils'

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
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
}

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
        items: [...state.items, { product: action.payload, quantity: 1 }],
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
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed)) {
        return { items: parsed }
      }
    }
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error)
  }
  return initial
}

const CartContext = createContext<CartContextType | null>(null)

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
  }, [])

  const removeItem = useCallback((productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId })
  }, [])

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' })
  }, [])

  const itemCount = useMemo(
    () => state.items.reduce((acc, item) => acc + item.quantity, 0),
    [state.items]
  )

  const subtotal = useMemo(
    () => calculateSubtotal(state.items),
    [state.items]
  )

  const value = useMemo(
    () => ({
      items: state.items,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [state.items, itemCount, subtotal, addItem, removeItem, updateQuantity, clearCart]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// oxlint-disable-next-line react/only-export-components
export function useCart(): CartContextType {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
