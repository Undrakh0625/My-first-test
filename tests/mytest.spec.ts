import { test, expect } from '@playwright/test';

test.describe('SauceDemo UI tests', () => {
  test('shows error on invalid login', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page.getByTestId('error')).toBeVisible();
  });

  test('adds product to cart and shows badge', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
  });

  test('logs in and logs out cleanly', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/inventory\.html/);
    await page.locator('#react-burger-menu-btn').click();
    const logoutLink = page.locator('#logout_sidebar_link');
    await expect(logoutLink).toBeVisible();
    await logoutLink.click();

    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });
});
