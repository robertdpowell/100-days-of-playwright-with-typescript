import { test, expect, type Page } from '@playwright/test';

test.describe('Mocking an API call', () => {

  test('mocks a fruit and does not call api', async ({ page }) => {
    // Mock the api call before navigating by using page.route which intercepts the request
    await page.route('*/**/api/v1/fruits', async (route) => {
      const json = [{ name: 'blah', id: 21 }];
      await route.fulfill({ json });
    });
    // Go to the page
    await page.goto('https://demo.playwright.dev/api-mocking');
  
    // Assert that the blah fruit is visible
    await expect(page.getByText('blah')).toBeVisible();
  });
  
});
