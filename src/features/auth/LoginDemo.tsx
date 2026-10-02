import { useState } from 'react'
import type { FormEvent } from 'react'
import { validatePassword } from '@/shared/utils'
import { PasswordInput } from './components/PasswordInput'

export type LoginState = 'idle' | 'success' | 'error' | 'locked'

const MAX_FAILED_ATTEMPTS = 3
const DEMO_EMAIL = 'demo@example.com'
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function LoginDemo() {
  const [email, setEmail] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [password, setPassword] = useState('')
  const [state, setState] = useState<LoginState>('idle')
  const [failedAttempts, setFailedAttempts] = useState(0)

  const isEmailValid = EMAIL_REGEX.test(email)
  const isPasswordValid = validatePassword(password).isValid
  const isLocked = state === 'locked' || failedAttempts >= MAX_FAILED_ATTEMPTS
  const isFormValid = isEmailValid && isPasswordValid && !isLocked
  const showEmailError = emailTouched && !isEmailValid && email.length > 0

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isFormValid) {
      setEmailTouched(true)
      return
    }

    if (email === DEMO_EMAIL) {
      setState('success')
      return
    }

    const nextAttempts = failedAttempts + 1
    setFailedAttempts(nextAttempts)

    if (nextAttempts >= MAX_FAILED_ATTEMPTS) {
      setState('locked')
    } else {
      setState('error')
    }
  }

  const remainingAttempts = MAX_FAILED_ATTEMPTS - failedAttempts
  const emailBorderClass = showEmailError
    ? 'border-rose-500 dark:border-rose-500 focus:border-rose-500 focus:ring-rose-500'
    : 'border-slate-300 dark:border-slate-700 focus:ring-sky-500'

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
        Sign In
      </h2>

      {state === 'success' && (
        <div
          role="alert"
          className="mb-5 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-sm font-medium"
        >
          Welcome back! Login successful.
        </div>
      )}

      {state === 'error' && !isLocked && (
        <div
          role="alert"
          className="mb-5 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-sm"
        >
          <p className="font-medium">Invalid credentials. Please check your email and password.</p>
          <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">
            {remainingAttempts} attempt{remainingAttempts === 1 ? '' : 's'} remaining before account lockout.
          </p>
        </div>
      )}

      {isLocked && (
        <div
          role="alert"
          className="mb-5 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-sm font-medium"
        >
          Account locked. Too many failed attempts. Please try again later.
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <label
              htmlFor="login-email"
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Email
            </label>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              Demo: <code className="text-sky-600 dark:text-sky-400 font-mono">demo@example.com</code>
            </span>
          </div>
          <input
            id="login-email"
            type="email"
            aria-label="Email"
            aria-invalid={showEmailError}
            aria-describedby={showEmailError ? 'login-email-error' : undefined}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (state === 'error') setState('idle')
            }}
            onBlur={() => setEmailTouched(true)}
            placeholder="demo@example.com"
            disabled={isLocked}
            className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${emailBorderClass}`}
          />
          {showEmailError && (
            <p id="login-email-error" role="alert" className="text-xs text-rose-600 dark:text-rose-400">
              Please enter a valid email address (e.g. name@domain.com).
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Password
          </span>
          <PasswordInput
            id="login-password"
            value={password}
            onChange={(newVal) => {
              setPassword(newVal)
              if (state === 'error') setState('idle')
            }}
            disabled={isLocked}
            showRequirements={!isLocked && password.length > 0}
          />
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className="w-full mt-2 py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg shadow transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        >
          Sign In
        </button>
      </form>
    </div>
  )
}
