import type { Page, Locator } from '@playwright/test'

export class ShoppingCartPage {
  readonly page: Page
  readonly heading: Locator
  readonly emptyMessage: Locator
  readonly checkoutButton: Locator
  readonly subtotal: Locator
  readonly total: Locator
  readonly cartItems: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.getByRole('heading', { level: 2, name: /shopping cart/i })
    this.emptyMessage = page.getByTestId('empty-cart-message')
    this.checkoutButton = page.getByRole('button', { name: /checkout/i })
    this.subtotal = page.getByTestId('cart-subtotal')
    this.total = page.getByTestId('cart-total')
    this.cartItems = page.getByTestId('cart-item')
  }

  /**
   * Retrieves the locator for a specific cart item by product name
   */
  getItem(name: string): Locator {
    return this.cartItems.filter({
      has: this.page.getByRole('heading', { name }),
    })
  }

  /**
   * Increases the quantity of an item by clicking the "+" button
   */
  async increaseQuantity(name: string): Promise<void> {
    const item = this.getItem(name)
    await item.getByRole('button', { name: /increase quantity/i }).click()
  }

  /**
   * Decreases the quantity of an item by clicking the "-" button
   */
  async decreaseQuantity(name: string): Promise<void> {
    const item = this.getItem(name)
    await item.getByRole('button', { name: /decrease quantity/i }).click()
  }

  /**
   * Removes an item from the cart by clicking the trash button
   */
  async removeItem(name: string): Promise<void> {
    const item = this.getItem(name)
    await item.getByRole('button', { name: /remove/i }).click()
  }

  /**
   * Retrieves the current numeric quantity of an item in the cart
   */
  async getQuantity(name: string): Promise<number> {
    const item = this.getItem(name)
    const quantityText = await item.getByTestId('cart-item-quantity').innerText()
    return Number(quantityText.trim())
  }
}
