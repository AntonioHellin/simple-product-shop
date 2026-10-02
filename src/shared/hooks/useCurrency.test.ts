import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useCurrency } from './useCurrency'

describe('useCurrency', () => {
  it('formats numbers into USD currency strings', () => {
    const { result } = renderHook(() => useCurrency())
    expect(result.current.format(49.99)).toBe('$49.99')
  })

  it('parses formatted currency strings back into numbers', () => {
    const { result } = renderHook(() => useCurrency())
    expect(result.current.parse('$49.99')).toBe(49.99)
    expect(result.current.parse('$1,234.56')).toBe(1234.56)
  })
})
