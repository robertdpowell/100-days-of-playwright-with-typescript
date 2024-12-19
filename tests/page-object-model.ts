import { expect, type Locator, type Page } from '@playwright/test';

export class TweetsPage {
  readonly page: Page;
  readonly aboutLink: Locator;


  constructor(page: Page) {
    this.page = page;
    this.aboutLink = page.locator('li', { hasText: 'ABOUT' });
  }

  async goto() {
    await this.page.goto('https://tweetsinwels.com');
  }

// wip
