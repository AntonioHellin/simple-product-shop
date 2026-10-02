import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SentryErrorBoundary } from './SentryErrorBoundary'

/**
 * @prompt Integrate Sentry Error Boundary to isolate React subtree crashes with fallback recovery.
 * @tdd RED: Write assertions ensuring children render normally when error-free.
 *      GREEN: Implement SentryErrorBoundary wrapping @sentry/react ErrorBoundary.
 *      REFACTOR: Add refresh / retry recovery actions.
 * @see docs/PROMPT_JOURNEY.md#42-react-error-boundary-integration
 */
describe('SentryErrorBoundary', () => {
  it('renders children when there are no errors', () => {
    render(
      <SentryErrorBoundary>
        <div>Content loaded properly</div>
      </SentryErrorBoundary>
    )

    expect(screen.getByText('Content loaded properly')).toBeInTheDocument()
  })
})
