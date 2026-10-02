import type { CartItem as CartItemType } from '@/shared/types'
import { formatPrice } from '@/shared/utils'
import { businessRules, UI_TEXT } from '@/shared/constants'

export interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (quantity: number) => void
  onRemove: () => void
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const { product, quantity } = item
  const subtotal = product.price * quantity

  return (
    <div
      data-testid="cart-item"
      className="p-3.5 sm:p-4 rounded-xl bg-white border border-sky-100/90 shadow-xs hover:border-sky-200 transition-all flex flex-col gap-3"
    >
      {/* Top row: Thumbnail + Product Name & Unit Price + Delete Button */}
      <div className="flex items-start gap-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg bg-sky-50 shrink-0 border border-sky-100/60"
        />

        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-slate-800 leading-snug break-words">
            {product.name}
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            {formatPrice(product.price)}
          </p>
        </div>

        <button
          type="button"
          onClick={onRemove}
          aria-label={UI_TEXT.removeFromCart}
          className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer shrink-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 sm:w-5 sm:h-5"
            aria-hidden="true"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </button>
      </div>

      {/* Bottom row: Quantity Controls (left) + Calculated Total in big (right) */}
      <div className="flex items-center justify-between pt-2.5 border-t border-sky-50">
        <div className="flex items-center border border-sky-200/80 rounded-lg bg-sky-50/40 p-0.5">
          <button
            type="button"
            onClick={() => onUpdateQuantity(quantity - 1)}
            disabled={quantity <= businessRules.quantity.min}
            aria-label="Decrease quantity"
            className="w-7 h-7 flex items-center justify-center rounded text-slate-600 hover:bg-white hover:text-cyan-800 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-600 transition-all cursor-pointer disabled:cursor-not-allowed"
          >
            -
          </button>
          <span
            data-testid="cart-item-quantity"
            className="w-8 text-center text-xs sm:text-sm font-semibold text-slate-800"
          >
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => onUpdateQuantity(quantity + 1)}
            aria-label="Increase quantity"
            className="w-7 h-7 flex items-center justify-center rounded text-slate-600 hover:bg-white hover:text-cyan-800 transition-all cursor-pointer"
          >
            +
          </button>
        </div>

        <div className="text-right">
          <span className="text-[11px] text-slate-400 block font-medium">Subtotal</span>
          <span className="text-base sm:text-lg font-bold text-slate-900 block tracking-tight">
            {formatPrice(subtotal)}
          </span>
        </div>
      </div>
    </div>
  )
}
