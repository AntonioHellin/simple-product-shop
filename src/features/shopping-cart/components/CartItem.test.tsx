import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import type { CartItem as CartItemType } from '@/shared/types'
import { CartItem } from './CartItem'

const mockItem: CartItemType = {
  product: {
    id: 1,
    name: 'Oceanic Diving Mask',
    price: 50,
    image: 'https://example.com/mask.jpg',
    description: 'Panoramic diving mask',
  },
  quantity: 2,
}

describe('CartItem', () => {
  it('renders product name and unit price', () => {
    render(
      <CartItem
        item={mockItem}
        onUpdateQuantity={() => {}}
        onRemove={() => {}}
      />,
    )

    expect(screen.getByText('Oceanic Diving Mask')).toBeInTheDocument()
    expect(screen.getByText('$50.00')).toBeInTheDocument()
  })

  it('renders current quantity', () => {
    render(
      <CartItem
        item={mockItem}
        onUpdateQuantity={() => {}}
        onRemove={() => {}}
      />,
    )

    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('renders calculated subtotal', () => {
    render(
      <CartItem
        item={mockItem}
        onUpdateQuantity={() => {}}
        onRemove={() => {}}
      />,
    )

    // 50 * 2 = 100
    expect(screen.getByText('$100.00')).toBeInTheDocument()
  })

  it('calls onUpdateQuantity with incremented quantity when + is clicked', async () => {
    const user = userEvent.setup()
    const handleUpdateQuantity = vi.fn()

    render(
      <CartItem
        item={mockItem}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={() => {}}
      />,
    )

    const increaseBtn = screen.getByRole('button', {
      name: /increase quantity/i,
    })
    await user.click(increaseBtn)

    expect(handleUpdateQuantity).toHaveBeenCalledTimes(1)
    expect(handleUpdateQuantity).toHaveBeenCalledWith(3)
  })

  it('calls onUpdateQuantity with decremented quantity when - is clicked', async () => {
    const user = userEvent.setup()
    const handleUpdateQuantity = vi.fn()

    render(
      <CartItem
        item={mockItem}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={() => {}}
      />,
    )

    const decreaseBtn = screen.getByRole('button', {
      name: /decrease quantity/i,
    })
    await user.click(decreaseBtn)

    expect(handleUpdateQuantity).toHaveBeenCalledTimes(1)
    expect(handleUpdateQuantity).toHaveBeenCalledWith(1)
  })

  it('disables decrease button when quantity is 1', () => {
    const singleItem: CartItemType = { ...mockItem, quantity: 1 }

    render(
      <CartItem
        item={singleItem}
        onUpdateQuantity={() => {}}
        onRemove={() => {}}
      />,
    )

    const decreaseBtn = screen.getByRole('button', {
      name: /decrease quantity/i,
    })
    expect(decreaseBtn).toBeDisabled()
  })

  it('calls onRemove when remove button is clicked', async () => {
    const user = userEvent.setup()
    const handleRemove = vi.fn()

    render(
      <CartItem
        item={mockItem}
        onUpdateQuantity={() => {}}
        onRemove={handleRemove}
      />,
    )

    const removeBtn = screen.getByRole('button', { name: /remove/i })
    await user.click(removeBtn)

    expect(handleRemove).toHaveBeenCalledTimes(1)
  })
})
