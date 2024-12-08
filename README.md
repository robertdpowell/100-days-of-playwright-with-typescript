## Day 1 
### Setting up 
I will be using Github Codespaces for this 100 day learning challenge. 

I started by creating a devcontainer.json file to configure the codespace at startup

```
{
  "name": "My Codespace",
  "image": "mcr.microsoft.com/playwright:v1.49.0", // Use the Playwright image from Microsoft as the base image
  "customizations": {
    "vscode": {
      "extensions": [ // Include my favorite extensions
        "GitHub.copilot",
        "ms-playwright.playwright" 
      ]
    }
  },
  "forwardPorts": [9323], // Forward the Playwright server port 
  "postCreateCommand": "npm install && npx playwright install"
}
```

After restarting my codespace and checking my extensions had installed correctly, it was time to install Playwright.

```
npm init playwright@latest
```


At the installation prompts, I chose the following options

- Use Typescript
- Use the default **tests** folder to store my tests
- Include a Github Actions workflow
- Install Playwright browsers

### Running my first test

The Playwright installation provides an example test suite consistig of 2 tests, each of which is configured to run in 3 browsers (so 6 tests in total).

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
All tests passed 

```
Running 6 tests using 1 worker
  6 passed (11.9s)

```

To see the details of the test run, I ran:

```
npx playwright show-report
```

And I get this nice HTML overview of the 6 tests that ran.

![alt text](<Screenshot 2024-12-08 at 19.23.49.png>)