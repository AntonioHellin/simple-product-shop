import { test, expect } from '@playwright/test'
import { ProductCatalogPage, ShoppingCartPage } from './pages'

test.describe('Shopping Journey E2E', () => {
  let catalogPage: ProductCatalogPage
  let cartPage: ShoppingCartPage

  test.beforeEach(async ({ page }) => {
    catalogPage = new ProductCatalogPage(page)
    cartPage = new ShoppingCartPage(page)

    // Navegar primero y luego limpiar localStorage para aislamiento de pruebas
    await catalogPage.goto()
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('1. El carrito está vacío inicialmente', async () => {
    await expect(cartPage.heading).toBeVisible()
    await expect(cartPage.emptyMessage).toBeVisible()
    await expect(cartPage.cartItems).toHaveCount(0)
    await expect(cartPage.checkoutButton).not.toBeVisible()
  })

  test('2. Agregar un producto lo muestra en el carrito', async () => {
    const productName = 'Oceanic Diving Mask & Snorkel'

    await catalogPage.addToCart(productName)

    const cartItem = cartPage.getItem(productName)
    await expect(cartItem).toBeVisible()
    expect(await cartPage.getQuantity(productName)).toBe(1)
    await expect(cartPage.emptyMessage).not.toBeVisible()
    await expect(cartPage.subtotal).toHaveText('$49.99')
    await expect(cartPage.total).toHaveText('$49.99')
  })

  test('3. Agregar el mismo producto incrementa la cantidad', async () => {
    const productName = 'Oceanic Diving Mask & Snorkel'

    await catalogPage.addToCart(productName)
    await catalogPage.addToCart(productName)

    await expect(cartPage.cartItems).toHaveCount(1)
    expect(await cartPage.getQuantity(productName)).toBe(2)
    // 49.99 * 2 = 99.98
    await expect(cartPage.subtotal).toHaveText('$99.98')
  })

  test('4. Los botones +/- modifican la cantidad correctamente', async () => {
    const productName = 'Marine Dry Bag 30L'

    await catalogPage.addToCart(productName)
    expect(await cartPage.getQuantity(productName)).toBe(1)
    await expect(cartPage.subtotal).toHaveText('$34.99')

    // Incrementar a 2
    await cartPage.increaseQuantity(productName)
    expect(await cartPage.getQuantity(productName)).toBe(2)
    await expect(cartPage.subtotal).toHaveText('$69.98')

    // Decrementar de vuelta a 1
    await cartPage.decreaseQuantity(productName)
    expect(await cartPage.getQuantity(productName)).toBe(1)
    await expect(cartPage.subtotal).toHaveText('$34.99')
  })

  test('5. El botón remove elimina el item', async () => {
    const productName = 'Oceanic Diving Mask & Snorkel'

    await catalogPage.addToCart(productName)
    await expect(cartPage.getItem(productName)).toBeVisible()

    await cartPage.removeItem(productName)

    await expect(cartPage.getItem(productName)).not.toBeVisible()
    await expect(cartPage.emptyMessage).toBeVisible()
    await expect(cartPage.cartItems).toHaveCount(0)
  })

  test('6. El descuento bulk aparece cuando hay 5+ items', async ({ page }) => {
    const productName = 'Oceanic Diving Mask & Snorkel'

    await catalogPage.addToCart(productName)

    // Incrementar cantidad hasta llegar a 5 unidades
    for (let i = 1; i < 5; i++) {
      await cartPage.increaseQuantity(productName)
    }

    expect(await cartPage.getQuantity(productName)).toBe(5)

    // 5 * 49.99 = 249.95 subtotal
    await expect(cartPage.subtotal).toHaveText('$249.95')

    // Debe mostrar la línea de descuento por volumen "Bulk Discount"
    await expect(page.getByText('Bulk Discount')).toBeVisible()
    await expect(cartPage.checkoutButton).toBeVisible()
  })

  test('7. El carrito persiste después de refresh (localStorage)', async ({ page }) => {
    const productName = 'Marine Dry Bag 30L'

    await catalogPage.addToCart(productName)
    await cartPage.increaseQuantity(productName)
    expect(await cartPage.getQuantity(productName)).toBe(2)

    // Recargar la página
    await page.reload()

    // Comprobar que los items y cantidades persisten
    const persistedItem = cartPage.getItem(productName)
    await expect(persistedItem).toBeVisible()
    expect(await cartPage.getQuantity(productName)).toBe(2)
    await expect(cartPage.subtotal).toHaveText('$69.98')
  })
})
