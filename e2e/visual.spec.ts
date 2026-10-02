import { test, expect } from '@playwright/test'
import { ProductCatalogPage, ShoppingCartPage } from './pages'

test.describe('Visual Regression Tests', () => {
  let catalogPage: ProductCatalogPage
  let cartPage: ShoppingCartPage

  test.beforeEach(async ({ page }) => {
    catalogPage = new ProductCatalogPage(page)
    cartPage = new ShoppingCartPage(page)

    await catalogPage.goto()
    await page.evaluate(() => localStorage.clear())
    await page.reload()
    // Asegurar que el catálogo está cargado antes de tomar screenshots
    await expect(catalogPage.heading).toBeVisible()
  })

  test('Screenshot de la homepage con catálogo', async ({ page }) => {
    await expect(catalogPage.productCards.first()).toBeVisible()
    await expect(page).toHaveScreenshot('homepage-catalog.png', {
      maxDiffPixelRatio: 0.05,
      animations: 'disabled',
    })
  })

  test('Screenshot del carrito con items', async ({ page }) => {
    const product1 = 'Oceanic Diving Mask & Snorkel'
    const product2 = 'Marine Dry Bag 30L'

    await catalogPage.addToCart(product1)
    await catalogPage.addToCart(product2)

    await expect(cartPage.getItem(product1)).toBeVisible()
    await expect(cartPage.getItem(product2)).toBeVisible()

    await expect(page).toHaveScreenshot('cart-with-items.png', {
      maxDiffPixelRatio: 0.05,
      animations: 'disabled',
    })
  })
})
