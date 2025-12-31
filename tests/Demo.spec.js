
import { test, expect } from '@playwright/test';
import fs from 'fs';

test('DemoQA Books Store Automation', async ({ page }) => {


  await page.goto('https://demoqa.com/login');

  const username = 'Admin123';
  const password = 'Admin@123';

  
  await page.fill('#userName', username);
  await page.fill('#password', password);
  await page.click('#login');

  const actualUsername = await page.locator('#userName-value').textContent();
  expect(actualUsername?.toLowerCase()).toBe(username.toLowerCase());

  await expect(
    page.getByRole('button', { name: 'Log out' })
  ).toBeVisible();


  await page.goto('https://demoqa.com/books');


  await page.fill('#searchBox', 'Learning JavaScript Design Patterns');


  const row = page.locator('.rt-tbody .rt-tr-group').first();
  await expect(row).toContainText('Learning JavaScript Design Patterns');

  const title = await row.locator('.rt-td').nth(1).textContent();
  const author = await row.locator('.rt-td').nth(2).textContent();
  const publisher = await row.locator('.rt-td').nth(3).textContent();

 
  fs.writeFileSync(
    'book-details.txt',
    `Title: ${title}\nAuthor: ${author}\nPublisher: ${publisher}\n`
  );


  await page.getByRole('button', { name: 'Log out' }).click();
});
