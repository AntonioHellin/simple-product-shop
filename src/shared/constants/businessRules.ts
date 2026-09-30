// Shared business rules & constants

export const QUANTITY_LIMITS = {
  MIN: 1,
  MAX: 99,
} as const

export const BULK_DISCOUNT = {
  MIN_QUANTITY: 5,
  PERCENTAGE: 0.1, // 10%
  LABEL: '10% off (5+ units)',
} as const

export const ORDER_DISCOUNT = {
  MIN_SUBTOTAL: 100,
  PERCENTAGE: 0.15, // 15%
  LABEL: '15% off ($100+ orders)',
} as const

export const BUSINESS_RULES = {
  QUANTITY: QUANTITY_LIMITS,
  BULK_DISCOUNT,
  ORDER_DISCOUNT,
} as const

// Convenience aliases for direct imports
export const MIN_ITEM_QUANTITY = QUANTITY_LIMITS.MIN
export const MAX_ITEM_QUANTITY = QUANTITY_LIMITS.MAX

export const BULK_DISCOUNT_THRESHOLD = BULK_DISCOUNT.MIN_QUANTITY
export const BULK_DISCOUNT_RATE = BULK_DISCOUNT.PERCENTAGE

export const ORDER_DISCOUNT_THRESHOLD = ORDER_DISCOUNT.MIN_SUBTOTAL
export const ORDER_DISCOUNT_RATE = ORDER_DISCOUNT.PERCENTAGE
