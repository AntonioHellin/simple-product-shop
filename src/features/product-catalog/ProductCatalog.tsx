import type { Product } from '@/shared/types'
import { products } from '@/shared/data/products'
import { ProductCard } from '@/features/product-catalog/components/ProductCard'
import { ProductCardSkeleton } from '@/features/product-catalog/components/ProductCardSkeleton'

export interface ProductCatalogProps {
  onAddToCart: (product: Product) => void
  isLoading?: boolean
}

export function ProductCatalog({ onAddToCart, isLoading = false }: ProductCatalogProps) {
  return (
    <section className="py-6">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 border-b border-sky-100 pb-5">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-700">
            Maritime & Coastal Essentials
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Products
          </h2>
        </div>
        <p className="text-sm text-slate-500 max-w-sm">
          Minimalist, high-performance gear engineered for open water and ocean life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <ProductCardSkeleton key={`skeleton-${index}`} />
            ))
          : products.map((product) => (
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
