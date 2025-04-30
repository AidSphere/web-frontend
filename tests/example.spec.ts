import { test, expect } from '@playwright/test';

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


