import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CartSummary } from './CartSummary'

describe('CartSummary', () => {
  it('renders formatted subtotal', () => {
    render(
      <CartSummary
        subtotal={80}
        discount={10}
        total={70}
        itemCount={2}
      />,
    )

    expect(screen.getByText('$80.00')).toBeInTheDocument()
  })

  it('renders discount with negative sign when discount > 0', () => {
    render(
      <CartSummary
        subtotal={120}
        discount={18}
        total={102}
        itemCount={3}
      />,
    )

    expect(screen.getByText('-$18.00')).toBeInTheDocument()
  })

  it('does NOT render discount line when discount is 0', () => {
    render(
      <CartSummary
        subtotal={50}
        discount={0}
        total={50}
        itemCount={1}
      />,
    )

    expect(screen.queryByText(/-\$/)).not.toBeInTheDocument()
  })

  it('renders formatted total', () => {
    render(
      <CartSummary
        subtotal={80}
        discount={10}
        total={70}
        itemCount={2}
      />,
    )

    expect(screen.getByText('$70.00')).toBeInTheDocument()
  })

  it('shows promo message when subtotal < 100', () => {
    render(
      <CartSummary
        subtotal={75}
        discount={0}
        total={75}
        itemCount={2}
      />,
    )

    // 100 - 75 = 25 -> "Add $25.00 more for 15% off!"
    expect(screen.getByText('Add $25.00 more for 15% off!')).toBeInTheDocument()
  })

  it('does NOT show promo message when subtotal >= 100', () => {
    render(
      <CartSummary
        subtotal={100}
        discount={15}
        total={85}
        itemCount={3}
      />,
    )

    expect(screen.queryByText(/more for 15% off/i)).not.toBeInTheDocument()
  })

  it('renders checkout button', () => {
    render(
      <CartSummary
        subtotal={80}
        discount={0}
        total={80}
        itemCount={2}
      />,
    )

    expect(
      screen.getByRole('button', { name: /checkout/i }),
    ).toBeInTheDocument()
  })
})
