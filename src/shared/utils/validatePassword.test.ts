import { describe, it, expect } from 'vitest'
import { validatePassword } from './validatePassword'

describe('validatePassword', () => {
  describe('validation rules', () => {
    it('fails when password has fewer than 12 characters', () => {
      const result = validatePassword('Ab1!short')

      expect(result.isValid).toBe(false)
      expect(result.errors).toEqual(
        expect.arrayContaining([expect.stringMatching(/12|length|characters/i)]),
      )
    })

    it('fails when password is missing an uppercase letter', () => {
      const result = validatePassword('lowercase123!@#')

      expect(result.isValid).toBe(false)
      expect(result.errors).toEqual(
        expect.arrayContaining([expect.stringMatching(/uppercase/i)]),
      )
    })

    it('fails when password is missing a lowercase letter', () => {
      const result = validatePassword('UPPERCASE123!@#')

      expect(result.isValid).toBe(false)
      expect(result.errors).toEqual(
        expect.arrayContaining([expect.stringMatching(/lowercase/i)]),
      )
    })

    it('fails when password is missing a number', () => {
      const result = validatePassword('NoNumberPassword!@#')

      expect(result.isValid).toBe(false)
      expect(result.errors).toEqual(
        expect.arrayContaining([expect.stringMatching(/number|digit/i)]),
      )
    })

    it('fails when password is missing a special character', () => {
      const result = validatePassword('NoSpecialChar12345')

      expect(result.isValid).toBe(false)
      expect(result.errors).toEqual(
        expect.arrayContaining([expect.stringMatching(/special/i)]),
      )
    })

    it('accumulates multiple errors when multiple rules fail', () => {
      const result = validatePassword('short')

      expect(result.isValid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(1)
    })
  })

  describe('valid passwords', () => {
    it('returns isValid true and empty errors array for a valid password', () => {
      const result = validatePassword('ValidPassword123!')

      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual([])
    })
  })

  describe('password strength', () => {
    it('evaluates strength as "weak" for invalid passwords', () => {
      const result = validatePassword('invalid')

      expect(result.isValid).toBe(false)
      expect(result.strength).toBe('weak')
    })

    it('evaluates strength as "medium" for valid passwords between 12 and 15 characters', () => {
      const result12 = validatePassword('ValidPass12!') // 12 characters
      const result15 = validatePassword('ValidPass123!@#') // 15 characters

      expect(result12.isValid).toBe(true)
      expect(result12.strength).toBe('medium')

      expect(result15.isValid).toBe(true)
      expect(result15.strength).toBe('medium')
    })

    it('evaluates strength as "strong" for valid passwords with 16 or more characters', () => {
      const result16 = validatePassword('ValidPass123!@#$') // 16 characters
      const resultLonger = validatePassword('SuperSecurePassword2026!@#$') // 28 characters

      expect(result16.isValid).toBe(true)
      expect(result16.strength).toBe('strong')

      expect(resultLonger.isValid).toBe(true)
      expect(resultLonger.strength).toBe('strong')
    })
  })
})
