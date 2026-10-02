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
   * Obtiene el Locator de un ítem específico del carrito por el nombre del producto
   */
  getItem(name: string): Locator {
    return this.cartItems.filter({
      has: this.page.getByRole('heading', { name }),
    })
  }

  /**
   * Incrementa la cantidad de un ítem pulsando el botón "+"
   */
  async increaseQuantity(name: string): Promise<void> {
    const item = this.getItem(name)
    await item.getByRole('button', { name: /increase quantity/i }).click()
  }

  /**
   * Decrementa la cantidad de un ítem pulsando el botón "-"
   */
  async decreaseQuantity(name: string): Promise<void> {
    const item = this.getItem(name)
    await item.getByRole('button', { name: /decrease quantity/i }).click()
  }

  /**
   * Elimina un ítem del carrito pulsando el botón de papelera
   */
  async removeItem(name: string): Promise<void> {
    const item = this.getItem(name)
    await item.getByRole('button', { name: /remove item/i }).click()
  }

  /**
   * Obtiene la cantidad actual numérica de un ítem en el carrito
   */
  async getQuantity(name: string): Promise<number> {
    const item = this.getItem(name)
    const quantityText = await item.getByTestId('cart-item-quantity').innerText()
    return Number(quantityText.trim())
  }
}
