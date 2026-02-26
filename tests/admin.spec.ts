import { test, expect } from 'playwright-test-coverage';
import type { Page } from '@playwright/test';
import { Role, User } from '../src/service/pizzaService';


async function basicInit(page: Page) {

    let loggedInUser: User | undefined;
    const validUsers: Record<string, User> = { 'calvinm7@byu.edu': {
    id: '1',
    name: 'kingCalvin',
    email: 'calvinm7@byu.edu',
    password: 'BeastMan77',
    roles: [{ role: Role.Admin }],
  },};


  await page.route('*/**/api/auth', async (route) => {
    const method = route.request().method();

    // LOGIN
    if (method === 'PUT') {
        const loginReq = route.request().postDataJSON();

        if (!loginReq) {
        await route.fulfill({
            status: 400,
            json: { error: 'Missing login payload' },
        });
        return;
        }

        const user = validUsers[loginReq.email];
        if (!user || user.password !== loginReq.password) {
        await route.fulfill({
            status: 401,
            json: { error: 'Unauthorized' },
        });
        return;
        }

        loggedInUser = user;

        await route.fulfill({
        json: {
            user: loggedInUser,
            token: 'abcdef',
        },
        });
        return;
    }

    // LOGOUT
    if (method === 'DELETE') {
        loggedInUser = undefined;
        await route.fulfill({ status: 204 });
        return;
    }

    });


    // Return the currently logged in user
    await page.route('*/**/api/user/me', async (route) => {
        expect(route.request().method()).toBe('GET');
        await route.fulfill({ json: loggedInUser });
    });

    // A standard menu
    await page.route('*/**/api/order/menu', async (route) => {
        const menuRes = [
        {
            id: 1,
            title: 'Veggie',
            image: 'pizza1.png',
            price: 0.0038,
            description: 'A garden of delight',
        },
        {
            id: 2,
            title: 'Pepperoni',
            image: 'pizza2.png',
            price: 0.0042,
            description: 'Spicy treat',
        },
        ];
        expect(route.request().method()).toBe('GET');
        await route.fulfill({ json: menuRes });
    });


    // Standard franchises and stores
    await page.route(/\/api\/franchise(\?.*)?$/, async (route) => {
        const franchiseRes = {
        franchises: [
            {
            id: 2,
            name: 'calvin got pizza',
            stores: [
                { id: 4, name: 'Lehi' },
                { id: 5, name: 'Springville' },
                { id: 6, name: 'American Fork' },
            ],
            },
            { id: 3, name: 'PizzaCorp', stores: [{ id: 7, name: 'Spanish Fork' }] },
            { id: 4, name: 'topSpot', stores: [] },
        ],
        };
        if ((route.request().method()) === 'GET') {
            await route.fulfill({ 
                status: 200,
                json: franchiseRes 
            });
        }
        if ((route.request().method()) === 'PUT') {
            const body = route.request().postDataJSON();

            const newFranchise = {
                id: Date.now(),
                name: body.name,
                stores: [],
            };

franchiseRes.franchises.push(newFranchise);


            await route.fulfill({
                status: 200,
                json: franchiseRes,
            });
            return;        
        }
        if ((route.request().method()) === 'DELETE') {
            await route.fulfill({ json: franchiseRes });
        }
    });



    await page.goto('/');

    



}





test('login  to  admin and about', async ({ page }) => {
//    await page.goto('http://localhost:5173/');
  await basicInit(page);

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
    // await page.goto('http://localhost:5173/');
      await basicInit(page);

    await page.getByText('Pizza is an absolute delight').click();
    await page.getByRole('link', { name: 'About' }).click();
    await page.getByText('The secret sauce').click();
    await page.getByRole('link', { name: 'home' }).click();
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('calvinm7@byu.edu');
    await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('BeastMan77');
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


// test('delete franchise', async ({ page }) => {
//     // await page.goto('http://localhost:5173/');
//         await basicInit(page);
//     await page.getByRole('link', { name: 'Login' }).click();
//     await page.getByRole('textbox', { name: 'Email address' }).fill('calvinm7@byu.edu');
//     await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
//     await page.getByRole('textbox', { name: 'Password' }).fill('BeastMan77');
//     await page.getByRole('button', { name: 'Login' }).click();
//     await page.getByRole('link', { name: 'Admin' }).click();
//     await page.getByRole('link', { name: 'Admin', exact: true }).click();
//     await page.getByRole('link', { name: 'admin-dashboard' }).click();
//     await page.getByRole('button', { name: 'Add Franchise' }).click();
//     await page.getByRole('textbox', { name: 'franchise name' }).click();
//     await page.getByRole('textbox', { name: 'franchise name' }).fill('cal');
//     await page.getByRole('textbox', { name: 'franchisee admin email' }).click();
//     await page.getByRole('textbox', { name: 'franchisee admin email' }).fill('calvinm7@byu.edu');
//     await page.getByRole('button', { name: 'Create' }).click();
//     await page.getByRole('link', { name: 'Order' }).click();
//     await page.getByRole('link', { name: 'Admin' }).click();
//     await page.getByRole('button', { name: 'Close' }).click();
//     await page.getByRole('link', { name: 'Admin', exact: true }).click();
//     await page.getByRole('link', { name: 'k' }).click();
//     await page.getByRole('link', { name: 'Logout' }).click();
// });