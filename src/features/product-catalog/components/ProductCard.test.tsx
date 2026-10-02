import { render, screen, act, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import type { Product } from '@/shared/types'
import { ProductCard } from './ProductCard'

const mockProduct: Product = {
  id: 1,
  name: 'Test Product',
  price: 29.99,
  image: 'https://example.com/image.jpg',
  description: 'A test product description for testing purposes.',
}

describe('ProductCard', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders product name', () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />)

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument()
  })

  it('renders product description', () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />)

    expect(
      screen.getByText('A test product description for testing purposes.'),
    ).toBeInTheDocument()
  })

  it('renders formatted price as $XX.XX', () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />)

    expect(screen.getByText('$29.99')).toBeInTheDocument()
  })

  it('renders product image', () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />)

    const image = screen.getByRole('img', { name: mockProduct.name })
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg')
  })

  it('calls onAddToCart with product when "Add to Cart" button is clicked', async () => {
    const user = userEvent.setup()
    const handleAddToCart = vi.fn()

    render(<ProductCard product={mockProduct} onAddToCart={handleAddToCart} />)

    const button = screen.getByRole('button', { name: /add to cart/i })
    await user.click(button)

    expect(handleAddToCart).toHaveBeenCalledTimes(1)
    expect(handleAddToCart).toHaveBeenCalledWith(mockProduct)
  })

  it('shows "Adding..." loading state immediately on click', () => {
    const handleAddToCart = () => new Promise(() => {}) // Pending promise

    render(<ProductCard product={mockProduct} onAddToCart={handleAddToCart} />)

    const button = screen.getByRole('button', { name: /add to cart/i })
    fireEvent.click(button)

    expect(screen.getByRole('button', { name: /adding\.\.\./i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /adding\.\.\./i })).toBeDisabled()
  })

  it('shows "Added!" on click and reverts to "Add to Cart" after 1.5s', async () => {
    vi.useFakeTimers()
    const handleAddToCart = vi.fn()

    render(<ProductCard product={mockProduct} onAddToCart={handleAddToCart} />)

    const button = screen.getByRole('button', { name: /add to cart/i })
    fireEvent.click(button)

    await act(async () => {
      await Promise.resolve()
    })

    expect(screen.getByRole('button', { name: /added!/i })).toBeInTheDocument()
    expect(handleAddToCart).toHaveBeenCalledWith(mockProduct)

    act(() => {
      vi.advanceTimersByTime(1500)
    })

    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument()
  })

  it('shows "Failed" error state when onAddToCart rejects', async () => {
    vi.useFakeTimers()
    const handleAddToCart = vi.fn().mockRejectedValue(new Error('Network error'))

    render(<ProductCard product={mockProduct} onAddToCart={handleAddToCart} />)

    const button = screen.getByRole('button', { name: /add to cart/i })
    fireEvent.click(button)

    await act(async () => {
      await Promise.resolve()
    })

    expect(screen.getByRole('button', { name: /failed/i })).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(1500)
    })

    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument()
  })

  it('allows retrying when in error state', async () => {
    vi.useFakeTimers()
    const handleAddToCart = vi
      .fn()
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce(undefined)

    render(<ProductCard product={mockProduct} onAddToCart={handleAddToCart} />)

    const button = screen.getByRole('button', { name: /add to cart/i })
    fireEvent.click(button)

    await act(async () => {
      await Promise.resolve()
    })

    const retryButton = screen.getByRole('button', { name: /failed/i })
    fireEvent.click(retryButton)

    await act(async () => {
      await Promise.resolve()
    })

    expect(screen.getByRole('button', { name: /added!/i })).toBeInTheDocument()
    expect(handleAddToCart).toHaveBeenCalledTimes(2)
  })

  it('continues to function during the "added" state transition', async () => {
    vi.useFakeTimers()
    const handleAddToCart = vi.fn()

    render(<ProductCard product={mockProduct} onAddToCart={handleAddToCart} />)

    const button = screen.getByRole('button', { name: /add to cart/i })
    fireEvent.click(button)

    await act(async () => {
      await Promise.resolve()
    })
    expect(handleAddToCart).toHaveBeenCalledTimes(1)

    const addedButton = screen.getByRole('button', { name: /added!/i })
    fireEvent.click(addedButton)

    await act(async () => {
      await Promise.resolve()
    })
    expect(handleAddToCart).toHaveBeenCalledTimes(2)

    act(() => {
      vi.advanceTimersByTime(1500)
    })

    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument()
  })
})
