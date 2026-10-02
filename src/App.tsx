import { useState } from 'react'
import { CartProvider } from '@/context/CartContext'
import { useCart } from '@/context/useCart'
import { ProductCatalog } from '@/features/product-catalog'
import { ShoppingCart } from '@/features/shopping-cart'
import { LoginDemo } from '@/features/auth'

function ShopApp() {
  const { addItem, itemCount } = useCart()
  const [showAuthDemo, setShowAuthDemo] = useState(false)

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

          <div className="flex items-center gap-3">
            {/* Auth Demo Toggle Button */}
            <button
              type="button"
              onClick={() => setShowAuthDemo((prev) => !prev)}
              aria-expanded={showAuthDemo}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                showAuthDemo
                  ? 'bg-cyan-700 text-white border-cyan-700 shadow-sm'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-2xs'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>{showAuthDemo ? 'Close Demo' : 'Sign In Demo'}</span>
            </button>

            {/* Cart Icon with Item Count Badge */}
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-slate-700"
              aria-label={`Shopping cart with ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
              role="status"
            >
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

      {/* Collapsible Auth Demo Section */}
      {showAuthDemo && (
        <section
          aria-label="Authentication Demo"
          className="border-b border-sky-200/70 bg-gradient-to-r from-sky-50/90 via-white to-cyan-50/90 py-8 px-4 sm:px-6 shadow-sm"
        >
          <div className="max-w-md mx-auto">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-800">
                Security &amp; Auth Demo
              </span>
              <button
                type="button"
                onClick={() => setShowAuthDemo(false)}
                className="text-xs text-slate-400 hover:text-slate-700 transition-colors"
                aria-label="Close authentication demo"
              >
                &times; Close
              </button>
            </div>
            <LoginDemo />
          </div>
        </section>
      )}

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
