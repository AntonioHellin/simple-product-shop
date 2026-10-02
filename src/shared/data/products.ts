import type { Product } from '@/shared/types'

export const products: Product[] = [
  {
    id: 1,
    name: 'Oceanic Diving Mask & Snorkel',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=80',
    description: 'Panoramic hypoallergenic silicone mask with tempered glass lens and dry-top snorkel.',
  },
  {
    id: 2,
    name: 'Marine Dry Bag 30L',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1558507652-2d9626c4e67a?w=600&auto=format&fit=crop&q=80',
    description: '100% waterproof dry pack with hermetic roll-top closure for open water expeditions.',
  },
  {
    id: 3,
    name: 'Seafarer Solar Chronometer',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    description: '200m water-resistant nautical timepiece with solar charging, ceramic bezel, and marine compass.',
  },
  {
    id: 4,
    name: 'Carbon Hydrofoil Paddle',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    description: 'Aerodynamic pure carbon fiber paddle engineered for maximum propulsion in open ocean.',
  },
  {
    id: 5,
    name: 'Polarized Maritime Sunglasses',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80',
    description: 'Ultralight floating frame with UV400 polarized lenses for maritime anti-glare protection.',
  },
  {
    id: 6,
    name: 'AquaFlex Neoprene Wetsuit',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&auto=format&fit=crop&q=80',
    description: 'High-stretch 3/2mm neoprene wetsuit with sealed watertight seams and thermal lining.',
  },
]

export const mockProducts = products
