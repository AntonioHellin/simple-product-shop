import type { Product } from '../../../shared/types'

export type { Product }

export interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-md hover:shadow-lg transition-shadow">
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover rounded-md"
      />
      <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
      <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
      <p className="text-gray-600 mt-2">${product.price.toFixed(2)}</p>
      <button
        onClick={() => onAddToCart(product)}
        className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  )
}
