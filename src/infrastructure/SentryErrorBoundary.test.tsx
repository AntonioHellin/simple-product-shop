import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SentryErrorBoundary } from './SentryErrorBoundary'

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
