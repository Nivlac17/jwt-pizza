import { test, expect } from 'playwright-test-coverage';





test('login  to  admin and about', async ({ page }) => {
   await page.goto('http://localhost:5173/');
   await page.getByRole('link', { name: 'Login' }).click();
   await page.getByRole('textbox', { name: 'Email address' }).fill('calvinm7@byu.edu');
   await page.getByRole('textbox', { name: 'Password' }).click();
   await page.getByRole('textbox', { name: 'Password' }).fill('BeastMan77');
   await page.getByRole('button', { name: 'Login' }).click();
   await page.getByRole('link', { name: 'Admin' }).click();
   await page.getByRole('link', { name: 'k' }).click();
   await page.getByText('kingCalvin').click();
   await page.getByRole('link', { name: 'Logout' }).click();
});


test('create franchise, delete franchise', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByText('Pizza is an absolute delight').click();
    await page.getByRole('link', { name: 'About' }).click();
    await page.getByText('The secret sauce').click();
    await page.getByRole('link', { name: 'home' }).click();
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('calvinm7@byu.edu');
    await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('BeastMan77');
    await page.getByRole('textbox', { name: 'Password' }).press('Enter');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'Admin' }).click();
    await page.getByRole('button', { name: 'Add Franchise' }).click();
    await page.getByRole('textbox', { name: 'franchise name' }).click();
    await page.getByRole('textbox', { name: 'franchise name' }).fill('FreshFran');
    await page.getByRole('textbox', { name: 'franchisee admin email' }).click();
    await page.getByRole('textbox', { name: 'franchisee admin email' }).fill('calvinm7@byu.edu');
    await page.getByRole('button', { name: 'Create' }).click();
    

    await page.getByRole('link', { name: 'k' }).click();
    await page.getByRole('link', { name: 'History' }).click();
    await page.getByText('Mama Rucci, my my').click();
    await page.getByRole('link', { name: 'Franchise' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();
});

test('page not found', async ({ page }) => {
    await page.goto('http://localhost:5173/hi');
    await page.goto('http://localhost:5173/hi');
    await page.getByRole('heading', { name: 'Oops' }).click();
});


test('delet franchise', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('calvinm7@byu.edu');
    await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('BeastMan77');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'Admin' }).click();
    await page.getByRole('link', { name: 'Admin', exact: true }).click();
    await page.getByRole('link', { name: 'admin-dashboard' }).click();
    await page.getByRole('button', { name: 'Add Franchise' }).click();
    await page.getByRole('textbox', { name: 'franchise name' }).click();
    await page.getByRole('textbox', { name: 'franchise name' }).fill('cal');
    await page.getByRole('textbox', { name: 'franchisee admin email' }).click();
    await page.getByRole('textbox', { name: 'franchisee admin email' }).fill('calvinm7@byu.edu');
    await page.getByRole('button', { name: 'Create' }).click();
    await page.getByRole('link', { name: 'Order' }).click();
    await page.getByRole('link', { name: 'Admin' }).click();
    await page.getByRole('button', { name: 'Close' }).click();
    await page.getByRole('link', { name: 'Admin', exact: true }).click();
    await page.getByRole('link', { name: 'k' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();
});