import { useCart } from '@/context/useCart'
import { UI_TEXT } from '@/shared/constants'
import { CartItem, CartSummary } from './components'

export function ShoppingCart() {
  const {
    items,
    itemCount,
    subtotal,
    discount,
    total,
    discountBreakdown,
    updateQuantity,
    removeItem,
  } = useCart()

  return (
    <section className="py-6">
      {/* Title & Item Count Badge */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-sky-100">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Shopping Cart
        </h2>
        <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-100 text-cyan-800">
          {itemCount}
        </span>
      </div>

      {/* Empty State vs Cart Content */}
      {items.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-2xl bg-white border border-dashed border-sky-200 shadow-xs">
          <div className="mx-auto w-16 h-16 rounded-full bg-sky-50 flex items-center justify-center text-cyan-600 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <p data-testid="empty-cart-message" className="text-lg font-semibold text-slate-700">
            {UI_TEXT.emptyCart}
          </p>
          <p className="text-sm text-slate-400 mt-1">
            Browse our catalog to add items to your cart.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-3">
            {items.map((item) => (
              <CartItem
                key={item.product.id}
                item={item}
                onUpdateQuantity={(quantity) =>
                  updateQuantity(item.product.id, quantity)
                }
                onRemove={() => removeItem(item.product.id)}
              />
            ))}
          </div>

          <CartSummary
            subtotal={subtotal}
            discount={discount}
            total={total}
            itemCount={itemCount}
            discountBreakdown={discountBreakdown}
          />
        </div>
      )}
    </section>
  )
}
