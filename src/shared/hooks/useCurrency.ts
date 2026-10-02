import { formatPrice } from '../utils'

export function useCurrency() {
  return {
    format: formatPrice,
    parse: (value: string) => parseFloat(value.replace(/[^0-9.-]+/g, '')),
  }
}
