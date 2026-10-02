import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import type { ReactNode } from 'react'
import type { Product } from '@/shared/types'
import { CartProvider } from './CartContext'
import { useCart } from './useCart'

const mockProduct1: Product = {
  id: 1,
  name: 'Oceanic Diving Mask',
  price: 50,
  image: 'https://example.com/mask.jpg',
  description: 'Panoramic diving mask',
}

const mockProduct2: Product = {
  id: 2,
  name: 'Marine Dry Bag',
  price: 30,
  image: 'https://example.com/bag.jpg',
  description: 'Waterproof dry bag',
}

const wrapper = ({ children }: { children: ReactNode }) => (
  <CartProvider>{children}</CartProvider>
)

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('starts with empty cart (itemCount 0, subtotal 0)', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    expect(result.current.items).toEqual([])
    expect(result.current.itemCount).toBe(0)
    expect(result.current.subtotal).toBe(0)
    expect(result.current.discount).toBe(0)
    expect(result.current.total).toBe(0)
    expect(result.current.discountBreakdown).toEqual([])
  })

  it('addItem adds a new product with quantity 1', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem(mockProduct1)
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0]).toEqual({
      product: mockProduct1,
      quantity: 1,
    })
    expect(result.current.itemCount).toBe(1)
    expect(result.current.subtotal).toBe(50)
  })

  it('addItem increments quantity if product already exists', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem(mockProduct1)
    })
    act(() => {
      result.current.addItem(mockProduct1)
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(2)
    expect(result.current.itemCount).toBe(2)
    expect(result.current.subtotal).toBe(100)
  })

  it('updateQuantity changes the item quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem(mockProduct1)
    })
    act(() => {
      result.current.updateQuantity(mockProduct1.id, 5)
    })

    expect(result.current.items[0].quantity).toBe(5)
    expect(result.current.itemCount).toBe(5)
    expect(result.current.subtotal).toBe(250)
  })

  it('updateQuantity with 0 removes the item', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem(mockProduct1)
    })
    act(() => {
      result.current.updateQuantity(mockProduct1.id, 0)
    })

    expect(result.current.items).toHaveLength(0)
    expect(result.current.itemCount).toBe(0)
    expect(result.current.subtotal).toBe(0)
  })

  it('removeItem removes an item from the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem(mockProduct1)
      result.current.addItem(mockProduct2)
    })
    expect(result.current.items).toHaveLength(2)

    act(() => {
      result.current.removeItem(mockProduct1.id)
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].product.id).toBe(mockProduct2.id)
  })

  it('clearCart empties the entire cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem(mockProduct1)
      result.current.addItem(mockProduct2)
    })
    expect(result.current.items).toHaveLength(2)

    act(() => {
      result.current.clearCart()
    })

    expect(result.current.items).toEqual([])
    expect(result.current.itemCount).toBe(0)
    expect(result.current.subtotal).toBe(0)
  })

  it('itemCount sums all quantities', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem(mockProduct1)
      result.current.addItem(mockProduct1) // qty 2
      result.current.addItem(mockProduct2) // qty 1
    })

    expect(result.current.itemCount).toBe(3)
  })

  it('subtotal calculates correctly (price * quantity for each item)', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem(mockProduct1)
      result.current.addItem(mockProduct1) // 50 * 2 = 100
      result.current.addItem(mockProduct2) // 30 * 1 = 30
    })

    // 100 + 30 = 130
    expect(result.current.subtotal).toBe(130)
  })

  it('loads previous data from localStorage on initialization with lazy initializer', () => {
    const savedCart = [{ product: mockProduct1, quantity: 3 }]
    localStorage.setItem('cart_items', JSON.stringify(savedCart))

    const { result } = renderHook(() => useCart(), { wrapper })

    expect(result.current.items).toEqual(savedCart)
    expect(result.current.itemCount).toBe(3)
    expect(result.current.subtotal).toBe(150)
  })

  it('persists changes to localStorage when adding items', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem(mockProduct1)
    })

    const stored = JSON.parse(localStorage.getItem('cart_items') || '[]')
    expect(stored).toEqual([{ product: mockProduct1, quantity: 1 }])
  })

  it('does not overwrite localStorage on first render (isInitialMount)', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')

    renderHook(() => useCart(), { wrapper })

    expect(setItemSpy).not.toHaveBeenCalled()
    setItemSpy.mockRestore()
  })

  it('calculates discounts automatically when items are added', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem(mockProduct1)
      result.current.updateQuantity(mockProduct1.id, 5)
    })

    expect(result.current.subtotal).toBe(250)
    expect(result.current.discount).toBe(58.75)
    expect(result.current.total).toBe(191.25)
    expect(result.current.discountBreakdown).toEqual([
      { name: 'Bulk Discount', amount: 25 },
      { name: 'Order Discount', amount: 33.75 },
    ])
  })

  it('recalculates discounts when items are cleared', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem(mockProduct1)
      result.current.updateQuantity(mockProduct1.id, 5)
    })
    expect(result.current.discount).toBe(58.75)

    act(() => {
      result.current.clearCart()
    })

    expect(result.current.subtotal).toBe(0)
    expect(result.current.discount).toBe(0)
    expect(result.current.total).toBe(0)
    expect(result.current.discountBreakdown).toEqual([])
  })

  it('throws an error when useCart is used outside CartProvider', () => {
    expect(() => renderHook(() => useCart())).toThrow(
      'useCart must be used within a CartProvider'
    )
  })

  it('handles errors when reading invalid localStorage', () => {
    localStorage.setItem('cart_items', 'invalid-json{')
    const { result } = renderHook(() => useCart(), { wrapper })
    expect(result.current.items).toEqual([])
  })
})
