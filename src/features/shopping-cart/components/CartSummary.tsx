import { formatPrice } from '@/shared/utils'

export interface CartSummaryProps {
  subtotal: number
  discount: number
  total: number
  itemCount: number
  onCheckout?: () => void
}

export function CartSummary({
  subtotal,
  discount,
  total,
  itemCount,
  onCheckout,
}: CartSummaryProps) {
  const PROMO_THRESHOLD = 100
  const remainingForPromo = PROMO_THRESHOLD - subtotal
  const showPromo = subtotal < PROMO_THRESHOLD

  return (
    <div className="rounded-2xl border border-sky-100/90 bg-slate-50/80 p-6 shadow-xs flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-sky-100">
          Order Summary ({itemCount} {itemCount === 1 ? 'item' : 'items'})
        </h3>

        {/* Breakdown */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center text-slate-600">
            <span>Subtotal</span>
            <span className="font-medium text-slate-900">
              {formatPrice(subtotal)}
            </span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between items-center text-emerald-700">
              <span>Discount</span>
              <span className="font-semibold">
                -{formatPrice(discount)}
              </span>
            </div>
          )}

          <div className="pt-3 border-t border-sky-100/80 flex justify-between items-center">
            <span className="text-base font-semibold text-slate-900">Total</span>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              {formatPrice(total)}
            </span>
          </div>
        </div>

        {/* Promotional message */}
        {showPromo && (
          <div className="mt-5 rounded-xl border border-cyan-200/80 bg-cyan-50/70 p-3 text-xs font-medium text-cyan-900 text-center">
            Add {formatPrice(remainingForPromo)} more for 15% off!
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onCheckout}
        className="mt-6 w-full rounded-xl bg-cyan-700 py-3 px-4 text-sm font-semibold text-white shadow-sm hover:bg-cyan-800 active:scale-95 transition-all cursor-pointer"
      >
        Checkout
      </button>
    </div>
  )
}
