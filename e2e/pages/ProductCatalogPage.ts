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
   * Navigates to the store's main catalog page
   */
  async goto(): Promise<void> {
    await this.page.goto('/')
  }

  /**
   * Retrieves the locator for a specific product card by name
   */
  getProduct(name: string): Locator {
    return this.productCards.filter({
      has: this.page.getByRole('heading', { name }),
    })
  }

  /**
   * Adds a product to the cart by clicking its "Add to Cart" button
   */
  async addToCart(name: string): Promise<void> {
    const productCard = this.getProduct(name)
    await productCard.getByRole('button', { name: /add to cart/i }).click()
  }
}
