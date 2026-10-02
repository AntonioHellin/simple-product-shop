import { ProductCatalog } from '@/features/product-catalog'
import { CartItem, CartSummary } from '@/features/shopping-cart'
import type { CartItem as CartItemType, Product } from '@/shared/types'

const sampleCartItem: CartItemType = {
  product: {
    id: 1,
    name: 'Oceanic Diving Mask & Snorkel',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=80',
    description: 'Máscara panorámica de silicona hipoalergénica con lente de cristal templado y tubo seco.',
  },
  quantity: 2,
}

function App() {
  const handleAddToCart = (product: Product) => {
    console.log('Product added to cart:', product)
  }

  const handleUpdateQuantity = (quantity: number) => {
    console.log('Update quantity to:', quantity)
  }

  const handleRemoveItem = () => {
    console.log('Remove item from cart')
  }

  const handleCheckout = () => {
    console.log('Proceeding to checkout')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/40 via-slate-50 to-cyan-50/20 text-slate-800">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-sky-100/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-cyan-700 text-white flex items-center justify-center shadow-sm shadow-cyan-900/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="M2 12c.6 0 1.2-.2 1.7-.6.9-.8 2.5-.8 3.4 0 1 1 2.5 1 3.5 0 .9-.8 2.5-.8 3.4 0 1 1 2.5 1 3.5 0 .5.4 1.1.6 1.7.6" />
                <path d="M2 18c.6 0 1.2-.2 1.7-.6.9-.8 2.5-.8 3.4 0 1 1 2.5 1 3.5 0 .9-.8 2.5-.8 3.4 0 1 1 2.5 1 3.5 0 .5.4 1.1.6 1.7.6" />
                <path d="M2 6c.6 0 1.2-.2 1.7-.6.9-.8 2.5-.8 3.4 0 1 1 2.5 1 3.5 0 .9-.8 2.5-.8 3.4 0 1 1 2.5 1 3.5 0 .5.4 1.1.6 1.7.6" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                Simple Product Shop
              </h1>
              <span className="text-[11px] font-medium tracking-wide text-cyan-700 block">
                Sea & Coastal Edition
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500 bg-sky-50/80 px-3 py-1.5 rounded-full border border-sky-100">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            Nautical Gear 2026 Collection
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <ProductCatalog onAddToCart={handleAddToCart} />

        {/* Temporary Preview Section */}
        <section className="pt-8 border-t border-sky-100">
          <div className="mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-700">
              Visual Preview (Temporary)
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Shopping Cart Components Preview
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                Cart Items
              </h3>
              <CartItem
                item={sampleCartItem}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">
                Summary
              </h3>
              <CartSummary
                subtotal={99.98}
                discount={10.0}
                total={89.98}
                itemCount={2}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-16 border-t border-sky-100/80 bg-white/40 py-8 text-center text-xs text-slate-400">
        <p>Simple Product Shop &bull; Ocean Edition &bull; Minimalist Maritime Goods</p>
      </footer>
    </div>
  )
}

export default App
