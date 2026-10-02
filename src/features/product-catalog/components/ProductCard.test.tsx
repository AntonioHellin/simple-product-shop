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

    expect(screen.getByText('Test Product')).toBeInTheDocument()
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

    const image = screen.getByRole('img', { name: 'Test Product' })
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

  it('muestra "Added!" al hacer click y vuelve a "Add to Cart" tras 1.5s', () => {
    vi.useFakeTimers()
    const handleAddToCart = vi.fn()

    render(<ProductCard product={mockProduct} onAddToCart={handleAddToCart} />)

    const button = screen.getByRole('button', { name: /add to cart/i })
    fireEvent.click(button)

    expect(screen.getByRole('button', { name: /added!/i })).toBeInTheDocument()
    expect(handleAddToCart).toHaveBeenCalledWith(mockProduct)

    act(() => {
      vi.advanceTimersByTime(1500)
    })

    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument()
  })

  it('sigue funcionando durante la transición de estado "added"', () => {
    vi.useFakeTimers()
    const handleAddToCart = vi.fn()

    render(<ProductCard product={mockProduct} onAddToCart={handleAddToCart} />)

    const button = screen.getByRole('button', { name: /add to cart/i })
    fireEvent.click(button)
    expect(handleAddToCart).toHaveBeenCalledTimes(1)

    const addedButton = screen.getByRole('button', { name: /added!/i })
    fireEvent.click(addedButton)
    expect(handleAddToCart).toHaveBeenCalledTimes(2)

    act(() => {
      vi.advanceTimersByTime(1500)
    })

    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument()
  })
})
