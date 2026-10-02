import type { CartItem as CartItemType } from '@/shared/types'
import { formatPrice } from '@/shared/utils'

export interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (quantity: number) => void
  onRemove: () => void
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const { product, quantity } = item
  const subtotal = product.price * quantity

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-sky-100/80 shadow-xs hover:border-sky-200 transition-all">
      {/* Thumbnail image on the left */}
      <img
        src={product.image}
        alt={product.name}
        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg bg-sky-50 shrink-0"
      />

      {/* Product info in the center */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm sm:text-base font-semibold text-slate-800 truncate">
          {product.name}
        </h4>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          {formatPrice(product.price)}
        </p>
      </div>

      {/* Quantity controls and subtotal on the right */}
      <div className="flex items-center gap-3 sm:gap-6 shrink-0">
        <div className="text-right">
          <span className="text-sm sm:text-base font-bold text-slate-900 block">
            {formatPrice(subtotal)}
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:block">Subtotal</span>
        </div>

        <div className="flex items-center border border-sky-200/80 rounded-lg bg-sky-50/40 p-0.5">
          <button
            type="button"
            onClick={() => onUpdateQuantity(quantity - 1)}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="w-7 h-7 flex items-center justify-center rounded text-slate-600 hover:bg-white hover:text-cyan-800 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-600 transition-all cursor-pointer disabled:cursor-not-allowed"
          >
            -
          </button>
          <span className="w-8 text-center text-xs sm:text-sm font-semibold text-slate-800">
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

        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove item"
          className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
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
    </div>
  )
}
