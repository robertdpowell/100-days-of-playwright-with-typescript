import { test, expect } from '@playwright/test';

const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
] as const;

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

// This test deletes a todo

test('delete a todo', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  await expect(page).toHaveTitle(/React • TodoMVC/);
  await page.fill('.new-todo', 'buy milk\n');
  await page.press('.new-todo', 'Enter');
  await page.hover('.todo-list li');
  await page.click('.todo-list li button.destroy');
  await expect(page.locator('.todo-list li')).toBeHidden();
});

// Add multiple todos
test('add multiple todos', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  await expect(page).toHaveTitle(/React • TodoMVC/);
  for (const todo of TODO_ITEMS) {
    await page.fill('.new-todo', todo + '\n');
    await page.press('.new-todo', 'Enter');
  }
  await expect(page.locator('.todo-list li')).toHaveCount(TODO_ITEMS.length);
});


