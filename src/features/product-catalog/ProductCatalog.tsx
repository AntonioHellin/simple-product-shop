import type { Product } from '../../shared/types'
import { products } from '../../shared/data/products'
import { ProductCard } from './components/ProductCard'

export interface ProductCatalogProps {
  onAddToCart: (product: Product) => void
}

export function ProductCatalog({ onAddToCart }: ProductCatalogProps) {
  return (
    <section className="py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  )
}
