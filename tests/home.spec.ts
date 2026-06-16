import { test, expect } from '@playwright/test';

test.describe('Firebase Agent Task Manager', () => {
  // Generate a unique task name for this specific test run
  const uniqueTaskName = `AI Task ${Date.now()}`;

  test('should execute full CRUD cycle against Firebase', async ({ page }) => {
    // 1. Navigate to the app
    await page.goto('http://localhost:3000');

    // -----------------------------------------
    // TEST CREATE
    // -----------------------------------------
    await page.locator('.task-input').fill(uniqueTaskName);
    await page.locator('.task-add-btn').click();

    // Find the task row that contains our unique task name
    const taskRow = page.locator('.task-row', { hasText: uniqueTaskName });

    // Wait for the network request to finish and the task to appear
    await expect(taskRow).toBeVisible({ timeout: 10000 });


    // -----------------------------------------
    // TEST UPDATE (Complete)
    // -----------------------------------------
    const completeBtn = taskRow.locator('.task-complete-btn');
    await completeBtn.click();

    // Verify it worked: The Complete button should disappear from the DOM
    await expect(completeBtn).toBeHidden({ timeout: 10000 });


    // -----------------------------------------
    // TEST DELETE
    // -----------------------------------------
    const deleteBtn = taskRow.locator('.task-delete-btn');
    await deleteBtn.click();

    // Verify it successfully deleted from the screen
    await expect(taskRow).toBeHidden({ timeout: 10000 });
  });
});