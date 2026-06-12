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
    // Find the input by its placeholder and type
    await page.getByPlaceholder('Enter Task').fill(uniqueTaskName);
    await page.getByRole('button', { name: 'Add' }).click();

    // Isolate the specific row for our newly created task
    const taskRow = page.locator('.flex.items-center').filter({ hasText: uniqueTaskName });

    // Wait for the network request to finish and the task to appear
    await expect(taskRow).toBeVisible();


    // -----------------------------------------
    // TEST UPDATE (Complete)
    // -----------------------------------------
    // Find the "Complete" button specifically inside our unique task's row
    const completeBtn = taskRow.getByRole('button', { name: 'Complete' });
    await completeBtn.click();

    // Verify it worked: The Complete button should disappear from the DOM
    await expect(completeBtn).toBeHidden();


    // -----------------------------------------
    // TEST DELETE
    // -----------------------------------------
    const deleteBtn = taskRow.getByRole('button', { name: 'Delete' });
    await deleteBtn.click();

    // Verify it successfully deleted from the screen
    await expect(taskRow).toBeHidden();
  });
});