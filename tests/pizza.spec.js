import { test, expect } from 'playwright-test-coverage';

test('home page', async ({ page }) => {
  await page.goto('/');

  expect(await page.title()).toBe('JWT Pizza');
});



test('purchase with login', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('navigation', { name: 'Global' }).click();
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('a@jwt.com');
    await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('password23423423erw');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.getByRole('button', { name: 'Order now' }).click();
    await page.getByRole('combobox').selectOption('5');
    await page.getByRole('link', { name: 'Image Description Pepperoni' }).click();
    await page.getByRole('link', { name: 'Image Description Margarita' }).click();
    await page.getByRole('link', { name: 'Image Description Crusty A' }).click();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByRole('button', { name: 'Pay now' }).click();
    await page.getByRole('button', { name: 'Verify' }).click();
    await page.getByRole('button', { name: 'Close' }).click();
    await page.getByText('₿').click();
    await page.getByText('3').nth(1).click();
    await page.getByText('3').first().click();
    await page.getByRole('link', { name: 'Logout' }).click();
});
