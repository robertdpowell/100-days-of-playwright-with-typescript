## Day 1 
### Setting up 
I will be using Github Codespaces for this 100 day learning challenge. 

So that each new codespace in my Github repository launches with the VSCode extensions that I will be working with, I created a devcontainer.json file. I expect this configuration file will expand over time, so this is just a start. 

```
{
  "name": "My Codespace",
  "extensions": [
    "GitHub.copilot",
    "ms-playwright.playwright"
  ]
}
```

After restarting my codespace and checking my extensions had installed correctly, it was time to install Playwright.

'''
npm init playwright@latest
'''

At the installation prompts, I chose the following options

- Use Typescript
- Use the default **tests** folder to store my tests
- Include a Github Actions workflow
- Install Playwright browsers

### Running my first test

The Playwright installation provides an example test suite of 6 tests.

```
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
```

To check my setup, I ran these tests using the following command

```
npx playwright test
```

The first 2 tests failed with the following error, while the final 4 passed. 

```
    ╔══════════════════════════════════════════════════════╗
    ║ Host system is missing dependencies to run browsers. ║
    ║ Missing libraries:                                   ║
    ║     libwoff2dec.so.1.0.2                             ║
    ║     libopus.so.0                                     ║
    ║     libwebpdemux.so.2                                ║
    ║     libharfbuzz-icu.so.0                             ║
    ║     libwebpmux.so.3                                  ║
    ║     libenchant-2.so.2                                ║
    ║     libhyphen.so.0                                   ║
    ║     libEGL.so.1                                      ║
    ║     libGLX.so.0                                      ║
    ║     libgudev-1.0.so.0                                ║
    ║     libevdev.so.2                                    ║
    ║     libGLESv2.so.2                                   ║
    ║     libx264.so                                       ║
    ╚══════════════════════════════════════════════════════╝
    ```


