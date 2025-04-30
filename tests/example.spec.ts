import { test, expect } from '@playwright/test';
import { promise } from 'zod';

test('Check page loads with patients', async ({ browser }) => {

  const context = await browser.newContext(); // Fresh browser instance
  const page = await context.newPage();       // New tab

  await page.goto('http://localhost:3000/donor/home'); // Go to URL

  const Home =page.locator(".text-3xl");
  console.log(await Home.textContent()); // Print the text content of the element with class "text-3xl"

  const PatientNames = page.locator(".text-xl");
  console.log(await PatientNames.count()); // Print the number of elements with class "text-xl"
  console.log(await PatientNames.first().textContent()); // Print the text content of the first element with class "text-xl"

  const AllPatientNames=await PatientNames.allTextContents(); // Get all text contents of elements with class "text-xl"
  console.log(AllPatientNames); // Print all patient names



});

test('Clicking Sponsor Now navigates to sponsor page', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://localhost:3000/donor/home');

  const SponsorBtn = page.locator('[data-testid="sponsor-button-3"]');

  // Just click — don't wait for navigation
  await SponsorBtn.click();

  //Wait for the sponsor form itself (reliable check)
  await page.waitForSelector('#amount', { state: 'visible' });
  await page.waitForSelector('#patientName', { state: 'visible' });
  await page.waitForSelector('#message', { state: 'visible' });

  // Now fill values
  await page.locator('#amount').fill('1000');
  await page.locator('#patientName').fill('Ushan');
  await page.locator('#message').fill('Get well soon');
  await page.locator('#public-radio').click(); // Check the radio button for public visibility
  await page.locator('button:text("Pay")').click(); // Submit the form


});

test('Clicking Sponsor Now navigates to sponsor page and click pay button without filling a field', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://localhost:3000/donor/home');

  const SponsorBtn = page.locator('[data-testid="sponsor-button-3"]');

  // Just click — don't wait for navigation
  await SponsorBtn.click();

  //Wait for the sponsor form itself (reliable check)
  await page.waitForSelector('#amount', { state: 'visible' });
  await page.waitForSelector('#patientName', { state: 'visible' });
  await page.waitForSelector('#message', { state: 'visible' });

  // Now fill values
  await page.locator('#amount').fill('1000');
  await page.locator('#message').fill('Get well soon');
  await page.locator('#public-radio').click(); // Check the radio button for public visibility
  await page.locator('button:text("Pay")').click(); // Submit the form
  console.log(await page.locator('#patientName-error').textContent()); // Print the error message
  expect(page.locator('#patientName-error')).toContainText('Patient'); // Assert error message

});

test('Click Sponsor Now to navigate to the sponsor page. Enter invalid data in the fields. Click the Pay button.', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://localhost:3000/donor/home');

  const SponsorBtn = page.locator('[data-testid="sponsor-button-3"]');

  // Just click — don't wait for navigation
  await SponsorBtn.click();

  //Wait for the sponsor form itself (reliable check)
  await page.waitForSelector('#amount', { state: 'visible' });
  await page.waitForSelector('#patientName', { state: 'visible' });
  await page.waitForSelector('#message', { state: 'visible' });

 
 

  await page.locator('#amount').fill('Yashodha');
  await page.locator('#patientName').fill('Ushan');
  await page.locator('#message').fill('Get well soon');
  await page.locator('#public-radio').click(); // Check the radio button for public visibility
  await page.locator('button:text("Pay")').click(); // Submit the form
  console.log(await page.locator('#amount-error').textContent()); // Print the error message
  await expect(page.locator('#amount-error')).toContainText('Amount must'); // Assert error message


});





test('View donations for patient', async ({ page }) => {
  //Navigate to donor homepage
  await page.goto('http://localhost:3000/donor/home');

  //Locate and verify view donations button
  const viewDonation = page.locator('[id="view-donations-3"]');
  await expect(viewDonation).toBeVisible();
  await expect(viewDonation).toHaveText('View Donations');

  //Click and wait for navigation
  await Promise.all([
    page.waitForURL('http://localhost:3000/donor/home/3'), // Full URL match
    viewDonation.click()
  ]);

  //Verify donation list page
  await expect(page).toHaveURL('http://localhost:3000/donor/home/3');
  await expect(page.locator('#donation-list-heading')).toBeVisible();
  await expect(page.locator('#donation-list-heading')).toContainText('Donation');
  
  // Debug output
  console.log('Current URL:', page.url());
  console.log('Header content:', await page.locator('#donation-list-heading').textContent());
});

test.only('Profile page load - Visible Test', async ({ page }) => { 
  //Navigate to donor homepage (visible)
  await page.goto('http://localhost:3000/donor/home');
  await page.waitForTimeout(1000); // Pause to see the page

  //Locate and highlight profile link
  const profileLink = page.locator('[href="/donor/profile"]');
  await expect(profileLink).toBeVisible();
  await profileLink.highlight(); // Visual indicator
  await page.waitForTimeout(1000); // Pause to see highlighted element

  //Click with visible navigation
  await Promise.all([
    page.waitForURL('http://localhost:3000/donor/profile'),
    profileLink.click()
  ]);
  await page.waitForTimeout(1000); // Pause to see navigation

  //Verify and highlight profile header
  const header = page.locator('h1:has-text("My Profile")');
  await expect(header).toBeVisible();
  await header.highlight();
  await page.waitForTimeout(2000); // Extended pause to see result
  console.log('Profile header content:', await header.textContent());
 
});