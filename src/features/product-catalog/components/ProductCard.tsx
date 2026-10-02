import { useState, useRef, useEffect } from 'react'
import type { Product } from '@/shared/types'
import { formatPrice } from '@/shared/utils'
import { UI_TEXT } from '@/shared/constants'

export type { Product }

export type ButtonState = 'idle' | 'loading' | 'success' | 'error'

export interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void | Promise<void>
}

const BUTTON_STYLES: Record<ButtonState, string> = {
  idle: 'bg-cyan-700 hover:bg-cyan-800 text-white cursor-pointer active:scale-95',
  loading: 'bg-slate-400 text-white cursor-wait',
  success: 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer active:scale-95',
  error: 'bg-rose-600 hover:bg-rose-700 text-white cursor-pointer active:scale-95',
}

/**
 * Interactive product card with dynamic feedback states (idle, loading, success, error).
 * @prompt Implement responsive ProductCard with visual button transitions and accessible a11y labels.
 * @see docs/PROMPT_JOURNEY.md#23-product-card-with-dynamic-feedback
 */
export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [buttonState, setButtonState] = useState<ButtonState>('idle')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleAddToCart = async () => {
    if (buttonState === 'loading') return

    setButtonState('loading')

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    try {
      await Promise.resolve(onAddToCart(product))
      setButtonState('success')
    } catch {
      setButtonState('error')
    }

    timeoutRef.current = setTimeout(() => {
      setButtonState('idle')
    }, 1500)
  }

  return (
    <div
      data-testid="product-card"
      className="group rounded-2xl border border-sky-100/80 bg-white p-5 shadow-sm hover:shadow-xl hover:shadow-cyan-900/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="relative overflow-hidden rounded-xl bg-sky-50/50 aspect-4/3">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sky-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <h3 className="mt-4 text-base font-semibold text-slate-800 tracking-tight">
          {product.name}
        </h3>
        <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
      </div>

      <div className="mt-5 pt-3.5 border-t border-sky-50 flex items-center justify-between gap-3">
        <span className="text-lg font-bold text-cyan-950 tracking-tight">
          {formatPrice(product.price)}
        </span>
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={buttonState === 'loading'}
          aria-live="polite"
          className={`rounded-xl px-4 py-2 text-xs font-semibold shadow-sm transition-all duration-200 ${BUTTON_STYLES[buttonState]}`}
        >
          {buttonState === 'loading' && (
            <span className="flex items-center gap-1.5">
              <svg
                className="animate-spin h-3.5 w-3.5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Adding...</span>
            </span>
          )}

          {buttonState === 'success' && (
            <span className="flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Added!</span>
            </span>
          )}

          {buttonState === 'error' && (
            <span className="flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span>Failed (Retry)</span>
            </span>
          )}

          {buttonState === 'idle' && <span>{UI_TEXT.addToCart}</span>}
        </button>
      </div>
    </div>
  )
}
