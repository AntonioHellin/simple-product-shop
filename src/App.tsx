import { ProductCatalog } from '@/features/product-catalog'
import type { Product } from '@/shared/types'

function App() {
  const handleAddToCart = (product: Product) => {
    console.log('Product added to cart:', product)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Simple Product Shop
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductCatalog onAddToCart={handleAddToCart} />
      </main>
    </div>
  )
}

export default App
