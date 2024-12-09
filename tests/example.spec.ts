import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://tweetsinwelsh.com/');
  await expect(page).toHaveTitle(/Learning Welsh through Tweets/);
});

test('get about link', async ({ page }) => {
  await page.goto('https://tweetsinwelsh.com/');
  await page.getByRole('link', { name: 'About' }).click();
  await expect(page.getByRole('heading', { name: 'Learning Welsh through Tweets' })).toBeVisible();
});