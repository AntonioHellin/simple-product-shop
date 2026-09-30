import type { Product } from '@/shared/types'
import { formatPrice } from '@/shared/utils'

export type { Product }

export interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="group rounded-2xl border border-sky-100/80 bg-white p-5 shadow-sm hover:shadow-xl hover:shadow-cyan-900/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="relative overflow-hidden rounded-xl bg-sky-50/50 aspect-4/3">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sky-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <h3 className="mt-4 text-base font-semibold text-slate-800 tracking-tight">
          {product.name}
        </h3>
        <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
      </div>

      <div className="mt-5 pt-3.5 border-t border-sky-50 flex items-center justify-between gap-3">
        <span className="text-lg font-bold text-cyan-950 tracking-tight">
          {formatPrice(product.price)}
        </span>
        <button
          onClick={() => onAddToCart(product)}
          className="rounded-xl bg-cyan-700 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-cyan-800 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
