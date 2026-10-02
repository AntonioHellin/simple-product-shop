import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { Toast } from './Toast'

/**
 * @prompt Create a Toast notification component using TDD with success, error, info variants,
 *         accessible close button, and auto-dismiss timer.
 * @tdd RED: Write assertions for role="alert", variant colors, manual close trigger, and fake timer auto-dismiss.
 *      GREEN: Implement Toast component with useEffect timeout cleanup and accessible SVG icons.
 *      REFACTOR: Consolidate variant styles dictionary and aria-live configurations.
 * @see docs/PROMPT_JOURNEY.md#22-toast-notification-system
 */
describe('Toast', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the message with role="alert"', () => {
    render(<Toast message="Item added to cart" onClose={() => {}} />)

    const alert = screen.getByRole('alert')
    expect(alert).toBeInTheDocument()
    expect(screen.getByText('Item added to cart')).toBeInTheDocument()
  })

  it('applies the correct color styling according to variant', () => {
    const { rerender } = render(
      <Toast message="Success message" variant="success" onClose={() => {}} />,
    )
    const successToast = screen.getByRole('alert')
    expect(successToast.className).toMatch(/emerald|green/i)

    rerender(
      <Toast message="Error message" variant="error" onClose={() => {}} />,
    )
    const errorToast = screen.getByRole('alert')
    expect(errorToast.className).toMatch(/rose|red/i)

    rerender(
      <Toast message="Info message" variant="info" onClose={() => {}} />,
    )
    const infoToast = screen.getByRole('alert')
    expect(infoToast.className).toMatch(/sky|blue/i)
  })

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn()
    render(<Toast message="Notification" onClose={handleClose} />)

    const closeButton = screen.getByRole('button', { name: /close/i })
    fireEvent.click(closeButton)

    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('auto-closes and calls onClose after 3 seconds', () => {
    vi.useFakeTimers()
    const handleClose = vi.fn()

    render(<Toast message="Auto-closing toast" onClose={handleClose} />)

    expect(handleClose).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(handleClose).toHaveBeenCalledTimes(1)
  })
})
