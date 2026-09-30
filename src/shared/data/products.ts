import type { Product } from '../types'

export const products: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    image: 'https://picsum.photos/seed/headphones/200',
    description: 'Auriculares inalámbricos con cancelación de ruido y sonido de alta fidelidad.',
  },
  {
    id: 2,
    name: 'Smartwatch Pro',
    price: 149.99,
    image: 'https://picsum.photos/seed/smartwatch/200',
    description: 'Reloj inteligente con monitor de ritmo cardíaco, GPS y resistencia al agua.',
  },
  {
    id: 3,
    name: 'Laptop Stand',
    price: 39.99,
    image: 'https://picsum.photos/seed/laptopstand/200',
    description: 'Soporte ergonómico de aluminio ajustable para portátiles de hasta 16 pulgadas.',
  },
  {
    id: 4,
    name: 'Mechanical Keyboard',
    price: 89.99,
    image: 'https://picsum.photos/seed/keyboard/200',
    description: 'Teclado mecánico retroiluminado RGB con interruptores táctiles para máxima precisión.',
  },
  {
    id: 5,
    name: 'USB-C Hub',
    price: 34.99,
    image: 'https://picsum.photos/seed/usbhub/200',
    description: 'Adaptador multipuerto 7 en 1 con puertos HDMI 4K, USB 3.0 y lector de tarjetas.',
  },
  {
    id: 6,
    name: 'HD Webcam',
    price: 69.99,
    image: 'https://picsum.photos/seed/webcam/200',
    description: 'Cámara web 1080p con micrófono estéreo integrado ideal para videoconferencias y streaming.',
  },
]

export const mockProducts = products
