import { useEffect } from 'react'

export type ToastVariant = 'success' | 'error' | 'info'

export interface ToastProps {
  message: string
  variant?: ToastVariant
  duration?: number
  onClose: () => void
  className?: string
}

const VARIANT_STYLES: Record<ToastVariant, string> = {
  success:
    'bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-950/90 dark:border-emerald-800 dark:text-emerald-100',
  error:
    'bg-rose-50 border-rose-300 text-rose-900 dark:bg-rose-950/90 dark:border-rose-800 dark:text-rose-100',
  info:
    'bg-sky-50 border-sky-300 text-sky-900 dark:bg-sky-950/90 dark:border-sky-800 dark:text-sky-100',
}

const DEFAULT_DURATION = 3000

export function Toast({
  message,
  variant = 'info',
  duration = DEFAULT_DURATION,
  onClose,
  className = '',
}: ToastProps) {
  useEffect(() => {
    if (duration <= 0) return

    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => {
      clearTimeout(timer)
    }
  }, [duration, onClose])

  const variantClass = VARIANT_STYLES[variant] ?? VARIANT_STYLES.info

  return (
    <div
      role="alert"
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
      className={`fixed bottom-5 right-5 z-50 flex items-center justify-between gap-3 px-4 py-3 rounded-xl border shadow-lg transition-all ${variantClass} ${className}`.trim()}
    >
      <div className="flex items-center gap-2 text-sm font-medium">
        {variant === 'success' && (
          <svg
            className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
        {variant === 'error' && (
          <svg
            className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        {variant === 'info' && (
          <svg
            className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
        )}
        <span>{message}</span>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close notification"
        className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 cursor-pointer"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
