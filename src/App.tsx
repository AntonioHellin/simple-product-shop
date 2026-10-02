import { CartProvider, useCart } from '@/context/CartContext'
import { ProductCatalog } from '@/features/product-catalog'
import { ShoppingCart } from '@/features/shopping-cart'

function ShopApp() {
  const { addItem, itemCount } = useCart()

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/40 via-slate-50 to-cyan-50/20 text-slate-800 flex flex-col">
      {/* Header */}
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

          {/* Cart Icon with Item Count Badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-slate-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-cyan-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="text-xs font-bold text-cyan-900 bg-cyan-100 px-2 py-0.5 rounded-full">
                {itemCount}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column (Wider): Product Catalog */}
          <div className="lg:col-span-2">
            <ProductCatalog onAddToCart={addItem} />
          </div>

          {/* Right Column: Sticky Shopping Cart */}
          <div className="lg:col-span-1 lg:sticky lg:top-24">
            <ShoppingCart />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-sky-100/80 bg-white/40 py-8 text-center text-xs text-slate-400">
        <p>Simple Product Shop &bull; Ocean Edition &bull; Minimalist Maritime Goods</p>
      </footer>
    </div>
  )
}

function App() {
  return (
    <CartProvider>
      <ShopApp />
    </CartProvider>
  )
}

export default App
