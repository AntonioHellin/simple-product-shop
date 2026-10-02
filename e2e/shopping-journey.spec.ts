import { test, expect } from '@playwright/test'
import { ProductCatalogPage, ShoppingCartPage } from './pages'

test.describe('Shopping Journey E2E', () => {
  let catalogPage: ProductCatalogPage
  let cartPage: ShoppingCartPage

  test.beforeEach(async ({ page }) => {
    catalogPage = new ProductCatalogPage(page)
    cartPage = new ShoppingCartPage(page)

    // Navigate first then clear localStorage for test isolation
    await catalogPage.goto()
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('1. Cart is initially empty', async () => {
    await expect(cartPage.heading).toBeVisible()
    await expect(cartPage.emptyMessage).toBeVisible()
    await expect(cartPage.cartItems).toHaveCount(0)
    await expect(cartPage.checkoutButton).not.toBeVisible()
  })

  test('2. Adding a product displays it in the cart', async () => {
    const productName = 'Oceanic Diving Mask & Snorkel'

    await catalogPage.addToCart(productName)

    const cartItem = cartPage.getItem(productName)
    await expect(cartItem).toBeVisible()
    expect(await cartPage.getQuantity(productName)).toBe(1)
    await expect(cartPage.emptyMessage).not.toBeVisible()
    await expect(cartPage.subtotal).toHaveText('$49.99')
    await expect(cartPage.total).toHaveText('$49.99')
  })

  test('3. Adding the same product increments quantity', async () => {
    const productName = 'Oceanic Diving Mask & Snorkel'

    await catalogPage.addToCart(productName)
    await catalogPage.addToCart(productName)

    await expect(cartPage.cartItems).toHaveCount(1)
    expect(await cartPage.getQuantity(productName)).toBe(2)
    // 49.99 * 2 = 99.98
    await expect(cartPage.subtotal).toHaveText('$99.98')
  })

  test('4. +/- buttons modify quantity correctly', async () => {
    const productName = 'Marine Dry Bag 30L'

    await catalogPage.addToCart(productName)
    expect(await cartPage.getQuantity(productName)).toBe(1)
    await expect(cartPage.subtotal).toHaveText('$34.99')

    // Increment to 2
    await cartPage.increaseQuantity(productName)
    expect(await cartPage.getQuantity(productName)).toBe(2)
    await expect(cartPage.subtotal).toHaveText('$69.98')

    // Decrement back to 1
    await cartPage.decreaseQuantity(productName)
    expect(await cartPage.getQuantity(productName)).toBe(1)
    await expect(cartPage.subtotal).toHaveText('$34.99')
  })

  test('5. Remove button removes the item', async () => {
    const productName = 'Oceanic Diving Mask & Snorkel'

    await catalogPage.addToCart(productName)
    await expect(cartPage.getItem(productName)).toBeVisible()

    await cartPage.removeItem(productName)

    await expect(cartPage.getItem(productName)).not.toBeVisible()
    await expect(cartPage.emptyMessage).toBeVisible()
    await expect(cartPage.cartItems).toHaveCount(0)
  })

  test('6. Bulk discount appears when there are 5+ items', async ({ page }) => {
    const productName = 'Oceanic Diving Mask & Snorkel'

    await catalogPage.addToCart(productName)

    // Increment quantity up to 5 units
    for (let i = 1; i < 5; i++) {
      await cartPage.increaseQuantity(productName)
    }

    expect(await cartPage.getQuantity(productName)).toBe(5)

    // 5 * 49.99 = 249.95 subtotal
    await expect(cartPage.subtotal).toHaveText('$249.95')

    // Must show the "Bulk Discount" line
    await expect(page.getByText('Bulk Discount')).toBeVisible()
    await expect(cartPage.checkoutButton).toBeVisible()
  })

  test('7. Cart persists across page reloads (localStorage)', async ({ page }) => {
    const productName = 'Marine Dry Bag 30L'

    await catalogPage.addToCart(productName)
    await cartPage.increaseQuantity(productName)
    expect(await cartPage.getQuantity(productName)).toBe(2)

    // Reload page
    await page.reload()

    // Verify items and quantities persist
    const persistedItem = cartPage.getItem(productName)
    await expect(persistedItem).toBeVisible()
    expect(await cartPage.getQuantity(productName)).toBe(2)
    await expect(cartPage.subtotal).toHaveText('$69.98')
  })
})
