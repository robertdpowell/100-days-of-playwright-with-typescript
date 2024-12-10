import { test, expect } from '@playwright/test';

// This test opens a page, adds a todo, and verifies that the todo was added.
test('add a todo', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  await expect(page).toHaveTitle(/React • TodoMVC/);
  await page.fill('.new-todo', 'buy milk\n');
  await page.press('.new-todo', 'Enter');
  await expect(page.locator('.todo-list li')).toHaveText('buy milk');
});

// This test clears a todo
test('clear a todo', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  await expect(page).toHaveTitle(/React • TodoMVC/);
  await page.fill('.new-todo', 'buy milk\n');
  await page.press('.new-todo', 'Enter');
  await page.click('.todo-list li .toggle');
  await expect(page.locator('.todo-list li')).toHaveClass('completed');
});

