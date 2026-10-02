import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Skeleton } from './Skeleton'

describe('Skeleton', () => {
  it('renders with role="status" and animate-pulse class', () => {
    render(<Skeleton />)

    const skeleton = screen.getByRole('status')
    expect(skeleton).toBeInTheDocument()
    expect(skeleton).toHaveClass('animate-pulse')
  })

  it('applies the text variant styling', () => {
    render(<Skeleton variant="text" />)

    const skeleton = screen.getByRole('status')
    expect(skeleton).toHaveClass('rounded')
  })

  it('applies the rectangular variant styling', () => {
    render(<Skeleton variant="rectangular" />)

    const skeleton = screen.getByRole('status')
    expect(skeleton).toHaveClass('rounded-md')
  })

  it('applies the circular variant styling with full border radius', () => {
    render(<Skeleton variant="circular" />)

    const skeleton = screen.getByRole('status')
    expect(skeleton).toHaveClass('rounded-full')
  })

  it('accepts custom width and height as styles', () => {
    render(<Skeleton width="150px" height="30px" />)

    const skeleton = screen.getByRole('status')
    expect(skeleton).toHaveStyle({
      width: '150px',
      height: '30px',
    })
  })

  it('accepts numeric width and height converted to pixels', () => {
    render(<Skeleton width={64} height={64} />)

    const skeleton = screen.getByRole('status')
    expect(skeleton).toHaveStyle({
      width: '64px',
      height: '64px',
    })
  })
})
