import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import * as Sentry from '@sentry/react'
import { LoginDemo } from './LoginDemo'

vi.mock('@sentry/react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@sentry/react')>()
  return {
    ...actual,
    setUser: vi.fn(),
  }
})

/**
 * @prompt Enhance LoginDemo with onBlur email validation, accessible alert errors,
 *         demo credentials display, and Sentry user context telemetry.
 * @tdd RED: Write assertions for onBlur invalid aria attributes, error alerts, lockout after 3 attempts, and Sentry.setUser calls.
 *      GREEN: Implement onBlur state tracking, account lockout handling, and Sentry context attachment.
 *      REFACTOR: Decouple password validation logic into reusable validatePassword utility.
 * @see docs/PROMPT_JOURNEY.md#33-auth--form-validation-on-blur
 */
describe('LoginDemo', () => {
  const validPassword = 'ValidPassword123!'
  const demoEmail = 'demo@example.com'
  const wrongEmail = 'wrong@example.com'

  it('renders email and password inputs and submit button', () => {
    render(<LoginDemo />)

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /login|submit|sign in/i }),
    ).toBeInTheDocument()
  })

  it('disables submit button when the form is invalid', () => {
    render(<LoginDemo />)

    const submitBtn = screen.getByRole('button', {
      name: /login|submit|sign in/i,
    })
    expect(submitBtn).toBeDisabled()
  })

  it('enables submit button when the form is valid', async () => {
    const user = userEvent.setup()
    render(<LoginDemo />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText('Password')
    const submitBtn = screen.getByRole('button', {
      name: /login|submit|sign in/i,
    })

    await user.type(emailInput, demoEmail)
    await user.type(passwordInput, validPassword)

    expect(submitBtn).toBeEnabled()
  })

  it('shows success message when logging in with demo credentials', async () => {
    const user = userEvent.setup()
    render(<LoginDemo />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText('Password')
    const submitBtn = screen.getByRole('button', {
      name: /login|submit|sign in/i,
    })

    await user.type(emailInput, demoEmail)
    await user.type(passwordInput, validPassword)
    await user.click(submitBtn)

    expect(
      screen.getByText(/success|welcome|logged in/i),
    ).toBeInTheDocument()
  })

  it('shows lockout message and disables inputs after 3 failed attempts', async () => {
    const user = userEvent.setup()
    render(<LoginDemo />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText('Password')
    const submitBtn = screen.getByRole('button', {
      name: /login|submit|sign in/i,
    })

    // Attempt 1 (wrong email with valid password)
    await user.type(emailInput, wrongEmail)
    await user.type(passwordInput, validPassword)
    await user.click(submitBtn)
    expect(screen.getByText(/invalid credentials|failed/i)).toBeInTheDocument()

    // Clear fields between attempt 1 and attempt 2
    await user.clear(emailInput)
    await user.clear(passwordInput)

    // Attempt 2
    await user.type(emailInput, wrongEmail)
    await user.type(passwordInput, validPassword)
    await user.click(submitBtn)

    // Clear fields between attempt 2 and attempt 3
    await user.clear(emailInput)
    await user.clear(passwordInput)

    // Attempt 3
    await user.type(emailInput, wrongEmail)
    await user.type(passwordInput, validPassword)
    await user.click(submitBtn)

    // After 3rd attempt: form is locked out, DO NOT clear fields
    expect(
      screen.getByText(/blocked|locked|too many attempts/i),
    ).toBeInTheDocument()
    expect(emailInput).toBeDisabled()
    expect(passwordInput).toBeDisabled()
    expect(submitBtn).toBeDisabled()
  })

  it('shows error message and marks email invalid on blur when email format is invalid', async () => {
    const user = userEvent.setup()
    render(<LoginDemo />)

    const emailInput = screen.getByLabelText(/email/i)

    // Type invalid email format
    await user.type(emailInput, 'antonio.hh6')
    // Click outside or tab away to trigger onBlur
    await user.tab()

    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument()
    expect(emailInput).toHaveAttribute('aria-invalid', 'true')
  })

  it('sets Sentry user context on login and clears it on logout', async () => {
    const user = userEvent.setup()
    render(<LoginDemo />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText('Password')
    const submitBtn = screen.getByRole('button', { name: /login|submit|sign in/i })

    await user.type(emailInput, demoEmail)
    await user.type(passwordInput, validPassword)
    await user.click(submitBtn)

    expect(Sentry.setUser).toHaveBeenCalledWith({
      email: demoEmail,
      id: 'demo-user-123',
    })

    const logoutBtn = screen.getByRole('button', { name: /log out/i })
    await user.click(logoutBtn)

    expect(Sentry.setUser).toHaveBeenCalledWith(null)
  })
})

