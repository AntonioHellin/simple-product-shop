import { useState } from 'react'
import { validatePassword } from '@/shared/utils'

export interface PasswordInputProps {
  value: string
  onChange: (value: string) => void
  showRequirements?: boolean
  placeholder?: string
  id?: string
  name?: string
  className?: string
  disabled?: boolean
}

const STRENGTH_COLORS: Record<string, string> = {
  strong: 'bg-emerald-500',
  medium: 'bg-amber-500',
  weak: 'bg-rose-500',
}

function getStrengthWidth(strength: string, valueLength: number): string {
  if (strength === 'strong') return 'w-full'
  if (strength === 'medium') return 'w-2/3'
  if (valueLength > 0) return 'w-1/3'
  return 'w-0'
}

export function PasswordInput({
  value,
  onChange,
  showRequirements = false,
  placeholder = 'Enter password',
  id,
  name,
  className = '',
  disabled = false,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  const { strength } = validatePassword(value)

  const requirements = [
    {
      id: 'length',
      label: 'At least 12 characters',
      met: value.length >= 12,
    },
    {
      id: 'uppercase',
      label: 'At least one uppercase letter',
      met: /[A-Z]/.test(value),
    },
    {
      id: 'lowercase',
      label: 'At least one lowercase letter',
      met: /[a-z]/.test(value),
    },
    {
      id: 'number',
      label: 'At least one number',
      met: /[0-9]/.test(value),
    },
    {
      id: 'special',
      label: 'At least one special character',
      met: /[^a-zA-Z0-9]/.test(value),
    },
  ]

  const strengthColor = STRENGTH_COLORS[strength] ?? 'bg-rose-500'
  const strengthWidth = getStrengthWidth(strength, value.length)

  return (
    <div className={`w-full flex flex-col gap-2 ${className}`.trim()}>
      <div className="relative flex items-center">
        <input
          id={id}
          name={name}
          type={showPassword ? 'text' : 'password'}
          aria-label="Password"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full px-3 py-2 pr-10 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? 'Hide text' : 'Show text'}
          disabled={disabled}
          className="absolute right-2.5 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors focus:outline-none"
        >
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
              <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
              <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
              <line x1="2" x2="22" y1="2" y2="22" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>

      <div data-testid="password-strength" className="flex flex-col gap-1 text-xs">
        <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
          <span>Password strength</span>
          <span className="font-medium capitalize">{strength}</span>
        </div>
        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${strengthColor} ${strengthWidth}`}
          />
        </div>
      </div>

      {showRequirements && (
        <ul className="flex flex-col gap-1 text-xs mt-1" data-testid="password-requirements">
          {requirements.map((req) => (
            <li
              key={req.id}
              className={`flex items-center gap-1.5 transition-colors ${
                req.met
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-rose-500 dark:text-rose-400'
              }`}
            >
              <span aria-hidden="true">{req.met ? '✓' : '✗'}</span>
              <span>{req.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
