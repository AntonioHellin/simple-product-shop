import type { Page, Locator } from '@playwright/test'

export class ProductCatalogPage {
  readonly page: Page
  readonly heading: Locator
  readonly productCards: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.getByRole('heading', { level: 2, name: /products/i })
    this.productCards = page.getByTestId('product-card')
  }

  /**
   * Navega a la página principal de la tienda
   */
  async goto(): Promise<void> {
    await this.page.goto('/')
  }

  /**
   * Obtiene el Locator de la card de un producto específico por su nombre
   */
  getProduct(name: string): Locator {
    return this.productCards.filter({
      has: this.page.getByRole('heading', { name }),
    })
  }

  /**
   * Agrega un producto al carrito pulsando el botón "Add to Cart" de su card
   */
  async addToCart(name: string): Promise<void> {
    const productCard = this.getProduct(name)
    await productCard.getByRole('button', { name: /add to cart/i }).click()
  }
}
