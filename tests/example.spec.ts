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


