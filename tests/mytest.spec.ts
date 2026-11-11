import { test, expect, type Page } from '@playwright/test';

const username = 'standard_user';
const password = 'secret_sauce';

async function signIn(page: Page, user = username, pass = password) {
  await page.goto('/');
  await page.getByPlaceholder('Username').fill(user);
  await page.getByPlaceholder('Password').fill(pass);
  await page.getByRole('button', { name: 'Login' }).click();
}

async function signOut(page: Page) {
  // Close the session through the app menu so each test ends cleanly.
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
}

test('амжилттай нэвтрэх', async ({ page }) => {
  await signIn(page);
  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.getByText('Products', { exact: true })).toBeVisible();
  await signOut(page);
});

test('буруу нууц үгээр нэвтрэхэд алдаа харуулах', async ({ page }) => {
  await signIn(page, username, 'wrong_password');
  await expect(page.getByTestId('error')).toContainText('Username and password do not match');
  await expect(page).toHaveURL(/saucedemo\.com\/?$/);
});

test('барааг сагсанд нэмээд сагсны тоог шалгах', async ({ page }) => {
  await signIn(page);
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
  await signOut(page);
});
