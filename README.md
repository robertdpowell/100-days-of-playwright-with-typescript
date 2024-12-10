## Day 1 
### Setting up 
I will primarily be using Github Codespaces for this 100 day learning challenge. 

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

The Playwright installation provides an example test suite (*example.spec.ts*) consisting of 2 tests, each of which is configured to run in 3 browsers (so 6 tests in total).

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

To check my setup, I ran these example tests using the following command

```
npx playwright test
```
All tests ran in **headless mode** and passed. 

```
Running 6 tests using 1 worker
  6 passed (11.9s)

```

To see the results of the test run, I ran:

```
npx playwright show-report
```

Which took me to this HTML overview of the 6 tests that ran.

![alt text](<Screenshot 2024-12-08 at 19.23.49.png>)

Finally, I ran the same tests with UI mode to get a first glimpse of the UI testing interface.

After reading the docs, it seems that in a GitHub Codespace, the default network configuration doesn’t bind the Playwright Test Runner UI to an external interface, so you need to explicitly bind it to 0.0.0.0 to make it accessible.

```
npx playwright test --ui-host=0.0.0.0
```

![alt text](<Screenshot 2024-12-08 at 21.31.27.png>)

## Day 2

I modified the example tests to run against one of my own hobby websites (https://tweetsinwelsh.com), to further understand what each test was doing. 

- Navigate to a website
- Ensure we land at the correct website by checking the website's title
- Find a link on the page and click that link
- Ensure we land at the correct linked page by checking for a header element.

I learned how to change the timeout value to give the site enough time to load for test execution. The default timeout for Playwright is 30 seconds, and below I set it to 60 globally in the playwright.config.ts file. Setting it globally seems the better option, for maintainability and consistency reasons.

```
timeout: 60000,
navigationTimeout: 60000,
```
**timeout**: A general timeout that applies to most actions in Playwright, such as waiting for an element to appear or a selector to match.

**navigation timeout**: Specifically applies to navigation-related actions like page.goto() or page.waitForNavigation().


## Day 3

For Day 3, I asked ChatGPT to set me some challenges to automate. 

We will be using the demo app https://demo.playwright.dev/todomvc

My first challenge was

```
	1.	Add a Single Todo
	•	Write a test that:
	•	Navigates to the TodoMVC page.
	•	Adds a single todo item (e.g., “Buy milk”).
	•	Verifies that the new item appears in the list.


	2.	Mark a Todo as Completed
	•	Write a test that:
	•	Adds a todo item.
	•	Marks the todo as completed.
	•	Verifies that the item appears with a strikethrough.
```