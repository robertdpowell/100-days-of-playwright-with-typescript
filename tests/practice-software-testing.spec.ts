import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright'; // Import the AxeBuilder
import exp from 'constants';

//find any item on front page that is out of stock and ensure that it cannot be added to the cart
test('item out of stock', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  const outOfStockElement = page.locator('[data-test="out-of-stock"]');
  await expect(outOfStockElement).toBeVisible();
  const productCard = outOfStockElement.locator('..'); // Select the parent element
  await expect(productCard).toBeVisible();
  await productCard.click();
    //check we land on the product page
    await expect(page).toHaveURL(/product/);
    await expect(page.locator('[data-test="add-to-cart"]')).toBeDisabled();
});

//check that filters correctly filter products
test('filter products', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  const pliersCheckbox = page.locator('[data-test="category-01JF5QMGBQ5BWFDBSZ8D2HS04X"]');
  await expect(pliersCheckbox).toBeVisible();
  await pliersCheckbox.click();
  await page.waitForLoadState();

});



