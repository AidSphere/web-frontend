import { test, expect } from '@playwright/test';
import { add } from 'date-fns';
import { promise } from 'zod';

test('Display patient list on donor home page', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://localhost:3000/donor/home');

  const homeHeader = page.locator(".text-3xl");
  console.log(await homeHeader.textContent());

  const patientNames = page.locator(".text-xl");
  console.log(await patientNames.count());
  console.log(await patientNames.first().textContent());

  const allPatientNames = await patientNames.allTextContents();
  console.log(allPatientNames);
});

test('Navigate to sponsor page when Sponsor Now is clicked', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://localhost:3000/donor/home');

  const sponsorBtn = page.locator('[data-testid="sponsor-button-3"]');
  await sponsorBtn.click();

  await page.waitForSelector('#amount', { state: 'visible' });
  await page.waitForSelector('#patientName', { state: 'visible' });
  await page.waitForSelector('#message', { state: 'visible' });

  await page.locator('#amount').fill('1000');
  await page.locator('#patientName').fill('Ushan');
  await page.locator('#message').fill('Get well soon');
  await page.locator('#public-radio').click();
  await page.locator('button:text("Pay")').click();
});

test('Validate sponsor form with empty fields on Pay button click', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://localhost:3000/donor/home');

  const sponsorBtn = page.locator('[data-testid="sponsor-button-3"]');
  await sponsorBtn.click();

  await page.waitForSelector('#amount', { state: 'visible' });
  await page.waitForSelector('#patientName', { state: 'visible' });
  await page.waitForSelector('#message', { state: 'visible' });

  await page.locator('#amount').fill('1000');
  await page.locator('#message').fill('Get well soon');
  await page.locator('#public-radio').click();
  await page.locator('button:text("Pay")').click();

  console.log(await page.locator('#patientName-error').textContent());
  expect(page.locator('#patientName-error')).toContainText('Patient');
});

test('Display validation errors for invalid data in sponsor form', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://localhost:3000/donor/home');

  const sponsorBtn = page.locator('[data-testid="sponsor-button-3"]');
  await sponsorBtn.click();

  await page.waitForSelector('#amount', { state: 'visible' });
  await page.waitForSelector('#patientName', { state: 'visible' });
  await page.waitForSelector('#message', { state: 'visible' });

  await page.locator('#amount').fill('Yashodha'); // Invalid input
  await page.locator('#patientName').fill('Ushan');
  await page.locator('#message').fill('Get well soon');
  await page.locator('#public-radio').click();
  await page.locator('button:text("Pay")').click();

  console.log(await page.locator('#amount-error').textContent());
  await expect(page.locator('#amount-error')).toContainText('Amount must');
});

test('Display all donations made to selected patient', async ({ page }) => {
  await page.goto('http://localhost:3000/donor/home');

  const viewDonation = page.locator('[id="view-donations-3"]');
  await expect(viewDonation).toBeVisible();
  await expect(viewDonation).toHaveText('View Donations');

  await Promise.all([
    page.waitForURL('http://localhost:3000/donor/home/3'),
    viewDonation.click(),
  ]);

  await expect(page).toHaveURL('http://localhost:3000/donor/home/3');
  await expect(page.locator('#donation-list-heading')).toBeVisible();
  await expect(page.locator('#donation-list-heading')).toContainText('Donation');

  console.log('Current URL:', page.url());
  console.log('Header content:', await page.locator('#donation-list-heading').textContent());
});

test('Load donor profile page and verify visibility of content', async ({ page }) => {
  await page.goto('http://localhost:3000/donor/home');
  await page.waitForTimeout(1000);

  const profileLink = page.locator('[href="/donor/profile"]');
  await expect(profileLink).toBeVisible();
  await profileLink.highlight();
  await page.waitForTimeout(1000);

  await Promise.all([
    page.waitForURL('http://localhost:3000/donor/profile'),
    profileLink.click(),
  ]);

  await page.waitForTimeout(1000);

  const header = page.locator('h1:has-text("My Profile")');
  await expect(header).toBeVisible();
  await header.highlight();
  await page.waitForTimeout(2000);

  console.log('Profile header content:', await header.textContent());
});

test('Update profile information with valid input', async ({ page }) => {
  await page.goto('http://localhost:3000/donor/home');

  const profileLink = page.locator('[href="/donor/profile"]');
  await expect(profileLink).toBeVisible();

  await Promise.all([
    page.waitForURL('http://localhost:3000/donor/profile'),
    profileLink.click(),
  ]);

  page.locator('button:has-text("Edit Profile")').click();
  await page.waitForTimeout(2000);

  await page.locator('#first-name-field').fill('Ushan');
  await page.locator('#last-name-field').fill('Senevirathna');
  await page.locator('#nic-field').fill('123456789V');
  await page.locator('#email-field').fill('ushan@gmail.com');
  await page.locator('#phone-field').fill('0712345678');
  await page.locator('#add-field').fill('123 Main St');

  await page.locator('#update-button').click();
  await page.waitForTimeout(2000);

  console.log('Success message:', await page.locator('.success-alert').textContent());
  expect(page.locator('.success-alert')).toContainText('Profile updated successfully');
  await page.waitForTimeout(2000);
});

test('Cancel profile editing and revert to previous data', async ({ page }) => {
  await page.goto('http://localhost:3000/donor/home');

  const profileLink = page.locator('[href="/donor/profile"]');
  await expect(profileLink).toBeVisible();

  await Promise.all([
    page.waitForURL('http://localhost:3000/donor/profile'),
    profileLink.click(),
  ]);

  page.locator('button:has-text("Edit Profile")').click();
  await page.locator('#cancel-button').click();
  await page.waitForTimeout(2000);

  const email = await page.locator('#email-display').textContent() || '';
  await expect(page.locator('#email-display')).toContainText(email);

  const nic = await page.locator('#nic-display').textContent() || '';
  await expect(page.locator('#nic-display')).toContainText(nic);

  const phone = await page.locator('#phone-display').textContent() || '';
  await expect(page.locator('#phone-display')).toContainText(phone);

  const address = await page.locator('#add-display').textContent() || '';
  await expect(page.locator('#add-display')).toContainText(address);

  await page.waitForTimeout(2000);
});
