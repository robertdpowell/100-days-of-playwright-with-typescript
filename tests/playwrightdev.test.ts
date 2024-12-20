import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright'; // Import the AxeBuilder
import { PlaywrightDevPage } from '../page-objects/playwrightdev'; // Import the PlaywrightDevPage

test.describe('Accessibility tests', () => {
  test('checks the accessibility of the Playwright Dev page', async ({ page }) => {
    const playWrightDevPage = new PlaywrightDevPage(page);
    await playWrightDevPage.goto();
    const results = await new AxeBuilder({ page }).analyze(); // Corrected instantiation
    await expect(results.violations.length).toBe(0);
  });
}); 

test('getting started should contain table of contents', async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.goto();
  await playwrightDev.getStarted();
  await expect(playwrightDev.tocList).toHaveText([
    `How to install Playwright`,
    `What's Installed`,
    `How to run the example test`,
    `How to open the HTML test report`,
    `Write tests using web first assertions, page fixtures and locators`,
    `Run single test, multiple tests, headed mode`,
    `Generate tests with Codegen`,
    `See a trace of your tests`
  ]);
});