export type PasswordStrength = 'weak' | 'medium' | 'strong'

export interface PasswordValidationResult {
  isValid: boolean
  errors: string[]
  strength: PasswordStrength
}

const MIN_LENGTH = 12
const STRONG_LENGTH = 16

const UPPERCASE_REGEX = /[A-Z]/
const LOWERCASE_REGEX = /[a-z]/
const NUMBER_REGEX = /[0-9]/
const SPECIAL_CHAR_REGEX = /[^a-zA-Z0-9]/

export function validatePassword(password: string): PasswordValidationResult {
  const errors: string[] = []

  if (password.length < MIN_LENGTH) {
    errors.push(`Password must be at least ${MIN_LENGTH} characters long`)
  }

  if (!UPPERCASE_REGEX.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }

  if (!LOWERCASE_REGEX.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }

  if (!NUMBER_REGEX.test(password)) {
    errors.push('Password must contain at least one number')
  }

  if (!SPECIAL_CHAR_REGEX.test(password)) {
    errors.push('Password must contain at least one special character')
  }

  const isValid = errors.length === 0

  let strength: PasswordStrength = 'weak'
  if (isValid) {
    strength = password.length >= STRONG_LENGTH ? 'strong' : 'medium'
  }

  return {
    isValid,
    errors,
    strength,
  }
}
