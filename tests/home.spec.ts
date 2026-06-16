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
});