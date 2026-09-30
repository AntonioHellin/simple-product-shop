import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
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
})
