import { Skeleton } from '@/shared/components'

export interface ProductCardSkeletonProps {
  className?: string
}

export function ProductCardSkeleton({ className = '' }: ProductCardSkeletonProps) {
  return (
    <div
      data-testid="product-card-skeleton"
      className={`rounded-2xl border border-sky-100/80 bg-white p-5 shadow-sm flex flex-col justify-between ${className}`.trim()}
    >
      <div>
        {/* Product Image Placeholder */}
        <div className="overflow-hidden rounded-xl aspect-4/3 w-full">
          <Skeleton variant="rectangular" className="w-full h-full" />
        </div>

        {/* Product Name Placeholder */}
        <div className="mt-4">
          <Skeleton variant="text" height="1.25rem" width="70%" />
        </div>

        {/* Product Description Placeholder */}
        <div className="mt-2.5 space-y-1.5">
          <Skeleton variant="text" height="0.75rem" width="100%" />
          <Skeleton variant="text" height="0.75rem" width="85%" />
        </div>
      </div>

      {/* Price & Add to Cart Button Placeholder */}
      <div className="mt-5 pt-3.5 border-t border-sky-50 flex items-center justify-between gap-3">
        <Skeleton variant="text" height="1.5rem" width="4.5rem" />
        <Skeleton
          variant="rectangular"
          height="2rem"
          width="5.5rem"
          className="rounded-xl"
        />
      </div>
    </div>
  )
}
