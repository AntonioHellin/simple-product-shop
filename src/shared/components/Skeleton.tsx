import type { CSSProperties } from 'react'

export type SkeletonVariant = 'text' | 'rectangular' | 'circular'

export interface SkeletonProps {
  variant?: SkeletonVariant
  width?: string | number
  height?: string | number
  className?: string
}

const VARIANT_CLASSES: Record<SkeletonVariant, string> = {
  text: 'rounded',
  rectangular: 'rounded-md',
  circular: 'rounded-full',
}

export function Skeleton({
  variant = 'text',
  width,
  height,
  className = '',
}: SkeletonProps) {
  const style: CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  }

  const variantClass = VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.text

  return (
    <div
      role="status"
      style={style}
      className={`animate-pulse bg-slate-200 dark:bg-slate-700 ${variantClass} ${className}`.trim()}
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}
