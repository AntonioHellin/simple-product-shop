import type { Product } from '@/shared/types'

export const products: Product[] = [
  {
    id: 1,
    name: 'Oceanic Diving Mask & Snorkel',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=80',
    description: 'Máscara panorámica de silicona hipoalergénica con lente de cristal templado y tubo seco.',
  },
  {
    id: 2,
    name: 'Marine Dry Bag 30L',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1558507652-2d9626c4e67a?w=600&auto=format&fit=crop&q=80',
    description: 'Mochila estanca 100% impermeable con cierre hermético roll-top para travesías náuticas.',
  },
  {
    id: 3,
    name: 'Seafarer Solar Chronometer',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    description: 'Reloj náutico sumergible 200m con carga solar, bisel cerámico y brújula marina integrada.',
  },
  {
    id: 4,
    name: 'Carbon Hydrofoil Paddle',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    description: 'Remo aerodinámico de fibra de carbono pura diseñado para máxima propulsión en aguas abiertas.',
  },
  {
    id: 5,
    name: 'Polarized Maritime Sunglasses',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80',
    description: 'Montura flotante ultraligera con lentes polarizadas de protección UV400 antirreflejo marino.',
  },
  {
    id: 6,
    name: 'AquaFlex Neoprene Wetsuit',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&auto=format&fit=crop&q=80',
    description: 'Traje de neopreno elástico de 3/2mm con costuras estancas selladas y forro térmico interior.',
  },
]

export const mockProducts = products
