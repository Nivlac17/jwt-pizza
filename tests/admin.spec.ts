import { test, expect } from 'playwright-test-coverage';


// // test('login with franchise', async ({ page }) => {
// // await page.goto('http://localhost:5173/');
// // await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
// // await page.getByRole('link', { name: 'Register' }).click();
// // await page.getByRole('contentinfo').getByRole('link', { name: 'Franchise' }).click();
// // await page.getByRole('link', { name: 'login', exact: true }).click();
// // await page.getByRole('textbox', { name: 'Email address' }).click();
// // await page.getByRole('textbox', { name: 'Email address' }).fill('f@jwt.com');
// // await page.getByRole('textbox', { name: 'Password' }).click();
// // await page.getByRole('textbox', { name: 'Password' }).fill('franchisee');
// // await page.getByRole('button', { name: 'Login' }).click();
// // await page.getByRole('button', { name: 'Create store' }).click();
// // await page.getByRole('textbox', { name: 'store name' }).click();
// // await page.getByRole('textbox', { name: 'store name' }).fill('awesome');
// // await page.getByRole('button', { name: 'Create' }).click();
// // await page.getByRole('row', { name: 'awesome 0 ₿ Close' }).getByRole('button').click();
// // await page.getByRole('button', { name: 'Close' }).click();

// // await page.getByRole('link', { name: 'Logout' }).click();
// // });




// // test('login  to  admin and about', async ({ page }) => {
// //     await page.goto('http://localhost:5173/');

// // await page.getByRole('link', { name: 'Login' }).click();
// // await page.getByRole('textbox', { name: 'Email address' }).fill('calvinm7@byu.edu');
// // await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
// // await page.getByRole('textbox', { name: 'Password' }).fill('BeastMan77');
// // await page.getByRole('button', { name: 'Login' }).click();
// // await page.getByRole('link', { name: 'k' }).click();
// // await expect(page.locator('div').filter({ hasText: 'name: kingCalvinemail:' }).nth(4)).toBeVisible();
// // await page.getByText('Your pizza kitchen').click();
// // await page.getByRole('link', { name: 'Order' }).click();
// // await expect(page.getByText('VeggieA garden of delightPepperoniSpicy treatMargaritaEssential classicCrustyA')).toBeVisible();
// // await page.getByRole('link', { name: 'Admin' }).click();
// //     await page.getByRole('textbox', { name: 'Filter franchises' }).click();
// //     await page.getByRole('textbox', { name: 'Filter franchises' }).fill('new-franchise');
// //     await page.getByRole('button', { name: 'Submit' }).click();
// //     await page.getByRole('button', { name: 'Add Franchise' }).click();
// //     await page.getByRole('textbox', { name: 'franchise name' }).click();
// //     await page.getByRole('textbox', { name: 'franchise name' }).fill('calvins');
// //     await page.getByRole('textbox', { name: 'franchisee admin email' }).click();
// //     await page.getByRole('textbox', { name: 'franchisee admin email' }).fill('calvinm7@byu.edu');
// //     await page.getByRole('textbox', { name: 'franchisee admin email' }).press('Enter');
// //     await page.getByRole('button', { name: 'Create' }).click();
// //     await page.getByRole('link', { name: 'Logout' }).click();
// // });



// import { test, expect } from 'playwright-test-coverage';
// import type { Page } from '@playwright/test';
// import { Role, User, Franchise } from '../src/service/pizzaService';

// // Sets up minimal mocked endpoints needed for a "franchise login" test
// async function basicFranchiseInit(page: Page) {
//   let loggedInUser: User | undefined;

//   // A single valid franchise user
//   const validUsers: Record<string, User> = {
//     'f@jwt.com': {
//       id: '10',
//       name: 'Franny Owner',
//       email: 'f@jwt.com',
//       password: 'franchisee',
//       roles: [{ role: Role.Franchisee ?? Role.Diner }], // fallback if Role.Franchise not present
//     },
//   };

//   // Mock the auth endpoint used by the app to log in
//   await page.route('*/**/api/auth', async (route) => {
//     const body = route.request().postDataJSON();
//     const user = validUsers[body.email];
//     if (!user || user.password !== body.password) {
//       await route.fulfill({ status: 401, json: { error: 'Unauthorized' } });
//       return;
//     }
//     loggedInUser = user;
//     const loginRes = { user: loggedInUser, token: 'fake-jwt-token' };
//     expect(route.request().method()).toBe('PUT');
//     await route.fulfill({ json: loginRes });
//   });

//   // Mock the "get current user" endpoint the app may call after login
//   await page.route('*/**/api/user/me', async (route) => {
//     expect(route.request().method()).toBe('GET');
//     await route.fulfill({ json: loggedInUser });
//   });

//   // Mock a simple franchises list endpoint (if the app loads it before login)
//   await page.route('*/**/api/franchise', async (route) => {
//     const franchiseRes = {
//       franchises: [
//         { id: 2, name: 'LotaPizza', stores: [{ id: 4, name: 'Lehi' }] },
//         { id: 4, name: 'topSpot', stores: [] },
//       ],
//     };
//     expect(route.request().method()).toBe('GET');
//     await route.fulfill({ json: franchiseRes });
//   });

//   await page.goto('/');
// }

// test('franchise login only', async ({ page }) => {
//   await basicFranchiseInit(page);

//   // Navigate to the Franchise area (matches your app's links)
//   // Adjust these clicks if your app uses different link text or structure.
//   await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();

//   // Click the 'Login' link shown in the Franchise area
//   await page.getByRole('link', { name: 'login', exact: true }).click();

//   // Fill credentials for the franchise user
//   await page.getByRole('textbox', { name: 'Email address' }).fill('f@jwt.com');
//   await page.getByRole('textbox', { name: 'Password' }).fill('franchisee');
//   await page.getByRole('button', { name: 'Login' }).click();

//   // A simple assertion that the app shows the logged-in state.
//   // Change this expectation to whatever your app shows after login (initials, name, or a Logout link).
//   await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
// });
