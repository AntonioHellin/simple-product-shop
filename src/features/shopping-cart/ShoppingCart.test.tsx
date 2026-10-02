import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { ShoppingCart } from './ShoppingCart'
import { useCart } from '@/context/useCart'
import type { CartItem as CartItemType } from '@/shared/types'

vi.mock('@/context/useCart')

const PRODUCT_NAME = 'Ocean Diving Mask'
const EMPTY_CART_MSG = 'Shopping cart is empty'
const CART_LIVE_REGION = 'cart-live-region'

const mockItem: CartItemType = {
  product: {
    id: 1,
    name: PRODUCT_NAME,
    price: 50,
    image: '/mask.jpg',
    description: 'High performance diving mask',
  },
  quantity: 2,
}

describe('ShoppingCart', () => {
  const updateQuantityMock = vi.fn()
  const removeItemMock = vi.fn()

  it('renders empty cart state when there are no items', () => {
    vi.mocked(useCart).mockReturnValue({
      items: [],
      itemCount: 0,
      subtotal: 0,
      discount: 0,
      total: 0,
      discountBreakdown: [],
      addItem: vi.fn(),
      updateQuantity: updateQuantityMock,
      removeItem: removeItemMock,
      clearCart: vi.fn(),
    })

    render(<ShoppingCart />)

    expect(screen.getByText(EMPTY_CART_MSG)).toBeInTheDocument()
    expect(screen.getByTestId('empty-cart-message')).toBeInTheDocument()
    expect(screen.getByTestId(CART_LIVE_REGION)).toHaveTextContent(EMPTY_CART_MSG)
  })

  it('renders cart items, summary, and live region when items exist', async () => {
    const user = userEvent.setup()
    vi.mocked(useCart).mockReturnValue({
      items: [mockItem],
      itemCount: 2,
      subtotal: 100,
      discount: 0,
      total: 100,
      discountBreakdown: [],
      addItem: vi.fn(),
      updateQuantity: updateQuantityMock,
      removeItem: removeItemMock,
      clearCart: vi.fn(),
    })

    render(<ShoppingCart />)

    expect(screen.getByText(PRODUCT_NAME)).toBeInTheDocument()
    expect(screen.getByTestId(CART_LIVE_REGION)).toHaveTextContent(
      'Shopping cart updated: 2 items, total is $100.00'
    )

    const increaseBtn = screen.getByRole('button', { name: new RegExp(`increase quantity of ${PRODUCT_NAME}`, 'i') })
    await user.click(increaseBtn)
    expect(updateQuantityMock).toHaveBeenCalledWith(1, 3)

    const removeBtn = screen.getByRole('button', { name: new RegExp(`remove ${PRODUCT_NAME} from cart`, 'i') })
    await user.click(removeBtn)
    expect(removeItemMock).toHaveBeenCalledWith(1)
  })

  it('announces singular "1 item" in live region when itemCount is 1', () => {
    vi.mocked(useCart).mockReturnValue({
      items: [{ ...mockItem, quantity: 1 }],
      itemCount: 1,
      subtotal: 50,
      discount: 0,
      total: 50,
      discountBreakdown: [],
      addItem: vi.fn(),
      updateQuantity: updateQuantityMock,
      removeItem: removeItemMock,
      clearCart: vi.fn(),
    })

    render(<ShoppingCart />)

    expect(screen.getByTestId(CART_LIVE_REGION)).toHaveTextContent(
      'Shopping cart updated: 1 item, total is $50.00'
    )
  })
})
