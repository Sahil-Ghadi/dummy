import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load the page and show the heading', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Firebase CRUD App');
  });

  test('should have the task input and add button', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const input = page.locator('.task-input');
    await expect(input).toBeVisible();

    const addBtn = page.locator('.task-add-btn');
    await expect(addBtn).toBeVisible();
    await expect(addBtn).toHaveText('Add');
  });

  test('should create a task', async ({ page }) => {
    // Capture browser console for debugging
    page.on('console', (msg) => {
      console.log(`[browser ${msg.type()}] ${msg.text()}`);
    });

    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    const uniqueTaskName = `CI Task ${Date.now()}`;

    // Fill and submit
    await page.locator('.task-input').fill(uniqueTaskName);
    await page.locator('.task-add-btn').click();

    // Wait for the task row to appear
    const taskRow = page.locator('.task-row', { hasText: uniqueTaskName });
    await expect(taskRow).toBeVisible({ timeout: 15000 });

    // Clean up: delete the task we just created
    await taskRow.locator('.task-delete-btn').click();
    await expect(taskRow).toBeHidden({ timeout: 10000 });
  });
});