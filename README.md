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
	1.	Add a Single Todo [x] 
	•	Write a test that:
	•	Navigates to the TodoMVC page.
	•	Adds a single todo item (e.g., “Buy milk”).
	•	Verifies that the new item appears in the list.


	2.	Mark a Todo as Completed [x] 
	•	Write a test that:
	•	Adds a todo item.
	•	Marks the todo as completed.
	•	Verifies that the item appears with a strikethrough.

  3.	Delete a Todo
	•	Write a test that:
	•	Adds a todo item.
	•	Deletes the item.
	•	Verifies that the item is no longer in the list.

```


Found some useful links to use later in my learning.

https://playwrightsolutions.com/playwright-login-test-with-2-factor-authentication-2fa-enabled/
https://practicesoftwaretesting.com/

## Day 4 

Today's task involved passing in a set of data to a test and looping through it to perform the same action.


```
**Add multiple todos**
	•	Write a test that:
  	•	Adds three todos (e.g., “Buy milk,” “Read book,” “Go for a run”).
	  •	Verifies that all three appear in the list.
```


```
const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
] as const;

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


```

## Day 5

Experimented with running the tests on different browsers, using the project flag.

```
npx playwright test --project webkit --project firefox
```

Used the axebuilder library to run some basic accessibility checks.

```
test.describe('homepage', () => { // 2
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc'); // 3
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // 4
    expect(accessibilityScanResults.violations).toEqual([]); // 5
  });
});
```

## Day 6

Wrote a test to locate an out of stock item, navigate to that item and check the 'add to cart' button is disabled.

https://practicesoftwaretesting.com/product/01JF1ZF95MTYF6DTXQE5V2G4DC



