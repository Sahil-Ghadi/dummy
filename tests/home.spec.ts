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
    // Capture ALL console messages
    page.on('console', (msg) => {
      console.log(`[browser ${msg.type()}] ${msg.text()}`);
    });

    // Capture uncaught exceptions in the browser
    page.on('pageerror', (error) => {
      console.log(`[browser UNCAUGHT ERROR] ${error.message}`);
    });

    // Capture failed network requests
    page.on('requestfailed', (request) => {
      console.log(`[browser REQUEST FAILED] ${request.url()} - ${request.failure()?.errorText}`);
    });

    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // DEBUG: Check if any tasks already exist (tests Firebase read)
    const existingRows = await page.locator('.task-row').count();
    console.log(`[DEBUG] Existing task rows on page load: ${existingRows}`);

    const uniqueTaskName = `CI Task ${Date.now()}`;

    // Fill and submit
    await page.locator('.task-input').fill(uniqueTaskName);
    await page.locator('.task-add-btn').click();

    // Wait a moment for any network activity
    await page.waitForTimeout(5000);

    // DEBUG: Dump task-list HTML after clicking Add
    const taskListHtml = await page.locator('.task-list').innerHTML();
    console.log(`[DEBUG] task-list HTML after add: ${taskListHtml}`);

    const allRows = await page.locator('.task-row').count();
    console.log(`[DEBUG] Total task rows after add: ${allRows}`);

    // Wait for the task row to appear
    const taskRow = page.locator('.task-row', { hasText: uniqueTaskName });
    await expect(taskRow).toBeVisible({ timeout: 15000 });

    // Clean up: delete the task we just created
    await taskRow.locator('.task-delete-btn').click();
    await expect(taskRow).toBeHidden({ timeout: 10000 });
  });
});