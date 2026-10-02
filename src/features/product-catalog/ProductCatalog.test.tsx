import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import type { Product } from '@/shared/types'
import { ProductCatalog } from '@/features/product-catalog'

const { mockProducts } = vi.hoisted(() => ({
  mockProducts: [
    {
      id: 1,
      name: 'Product 1',
      price: 10,
      image: 'https://example.com/1.jpg',
      description: 'Description 1',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 20,
      image: 'https://example.com/2.jpg',
      description: 'Description 2',
    },
  ] as Product[],
}))

vi.mock('@/shared/data/products', () => ({
  products: mockProducts,
  mockProducts: mockProducts,
}))

vi.mock('@/shared/data', () => ({
  products: mockProducts,
  mockProducts: mockProducts,
}))

vi.mock('../../shared/data/products', () => ({
  products: mockProducts,
  mockProducts: mockProducts,
}))

vi.mock('../../shared/data', () => ({
  products: mockProducts,
  mockProducts: mockProducts,
}))

describe('ProductCatalog', () => {
  it('renders "Products" heading', () => {
    render(<ProductCatalog onAddToCart={() => {}} />)

    const heading = screen.getByRole('heading', { name: /products/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders all products from data module', () => {
    render(<ProductCatalog onAddToCart={() => {}} />)

    expect(screen.getByText('Product 1')).toBeInTheDocument()
    expect(screen.getByText('Product 2')).toBeInTheDocument()
  })

  it('passes onAddToCart callback to product cards', async () => {
    const user = userEvent.setup()
    const handleAddToCart = vi.fn()

    render(<ProductCatalog onAddToCart={handleAddToCart} />)

    const addButtons = screen.getAllByRole('button', { name: /add to cart/i })
    expect(addButtons).toHaveLength(2)

    await user.click(addButtons[0])
    expect(handleAddToCart).toHaveBeenCalledTimes(1)
    expect(handleAddToCart).toHaveBeenCalledWith(mockProducts[0])
  })

  it('renders skeletons when isLoading is true', () => {
    render(<ProductCatalog onAddToCart={() => {}} isLoading={true} />)

    const skeletons = screen.getAllByTestId('product-card-skeleton')
    expect(skeletons).toHaveLength(6)
    expect(screen.queryByText('Product 1')).not.toBeInTheDocument()
  })
})
