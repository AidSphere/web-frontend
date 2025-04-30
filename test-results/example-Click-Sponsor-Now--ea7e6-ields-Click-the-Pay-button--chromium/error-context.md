# Test info

- Name: Click Sponsor Now to navigate to the sponsor page. Enter invalid data in the fields. Click the Pay button.
- Location: C:\Users\Kaweesha_Mr\Documents\Dev\web-frontend\tests\example.spec.ts:78:6

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)

Locator: locator('#amount-error')
Expected string: "fsfdasmount must"
Received string: "Amount must be a number"
Call log:
  - expect.toContainText with timeout 5000ms
  - waiting for locator('#amount-error')
    9 × locator resolved to <p id="amount-error" class="mt-1 text-sm text-red-500">Amount must be a number</p>
      - unexpected value "Amount must be a number"

    at C:\Users\Kaweesha_Mr\Documents\Dev\web-frontend\tests\example.spec.ts:103:47
```

# Page snapshot

```yaml
- dialog "Sponsor a Patient":
  - button "Dismiss"
  - button "Close"
  - banner:
    - heading "Sponsor a Patient" [level=2]
  - textbox "Enter amount": Yashodha
  - paragraph: Amount must be a number
  - textbox "Enter patient name": Ushan
  - textbox "Write your message here": Get well soon
  - radiogroup "Select message visibility":
    - text: Select message visibility
    - radio "Public" [checked]
    - text: Public Other Donators Also able to see your message
    - radio "Private"
    - text: Private Only the Patient can see the message
  - checkbox "Donate Anonymously"
  - text: Donate Anonymously
  - button "Pay"
  - button "Cancel"
  - button "Dismiss"
```

# Test source

```ts
   3 | test('Check page loads with patients', async ({ browser }) => {
   4 |
   5 |   const context = await browser.newContext(); // Fresh browser instance
   6 |   const page = await context.newPage();       // New tab
   7 |
   8 |   await page.goto('http://localhost:3000/donor/home'); // Go to URL
   9 |
   10 |   const Home =page.locator(".text-3xl");
   11 |   console.log(await Home.textContent()); // Print the text content of the element with class "text-3xl"
   12 |
   13 |   const PatientNames = page.locator(".text-xl");
   14 |   console.log(await PatientNames.count()); // Print the number of elements with class "text-xl"
   15 |   console.log(await PatientNames.first().textContent()); // Print the text content of the first element with class "text-xl"
   16 |
   17 |   const AllPatientNames=await PatientNames.allTextContents(); // Get all text contents of elements with class "text-xl"
   18 |   console.log(AllPatientNames); // Print all patient names
   19 |
   20 |
   21 |
   22 | });
   23 |
   24 |
   25 | test('Clicking Sponsor Now navigates to sponsor page', async ({ browser }) => {
   26 |   const context = await browser.newContext();
   27 |   const page = await context.newPage();
   28 |
   29 |   await page.goto('http://localhost:3000/donor/home');
   30 |
   31 |   const SponsorBtn = page.locator('[data-testid="sponsor-button-3"]');
   32 |
   33 |   // Just click — don't wait for navigation
   34 |   await SponsorBtn.click();
   35 |
   36 |   //Wait for the sponsor form itself (reliable check)
   37 |   await page.waitForSelector('#amount', { state: 'visible' });
   38 |   await page.waitForSelector('#patientName', { state: 'visible' });
   39 |   await page.waitForSelector('#message', { state: 'visible' });
   40 |
   41 |   // Now fill values
   42 |   await page.locator('#amount').fill('1000');
   43 |   await page.locator('#patientName').fill('Ushan');
   44 |   await page.locator('#message').fill('Get well soon');
   45 |   await page.locator('#public-radio').click(); // Check the radio button for public visibility
   46 |   await page.locator('button:text("Pay")').click(); // Submit the form
   47 |
   48 |
   49 | });
   50 |
   51 | test('Clicking Sponsor Now navigates to sponsor page and click pay button without filling a field', async ({ browser }) => {
   52 |   const context = await browser.newContext();
   53 |   const page = await context.newPage();
   54 |
   55 |   await page.goto('http://localhost:3000/donor/home');
   56 |
   57 |   const SponsorBtn = page.locator('[data-testid="sponsor-button-3"]');
   58 |
   59 |   // Just click — don't wait for navigation
   60 |   await SponsorBtn.click();
   61 |
   62 |   //Wait for the sponsor form itself (reliable check)
   63 |   await page.waitForSelector('#amount', { state: 'visible' });
   64 |   await page.waitForSelector('#patientName', { state: 'visible' });
   65 |   await page.waitForSelector('#message', { state: 'visible' });
   66 |
   67 |   // Now fill values
   68 |   await page.locator('#amount').fill('1000');
   69 |   await page.locator('#message').fill('Get well soon');
   70 |   await page.locator('#public-radio').click(); // Check the radio button for public visibility
   71 |   await page.locator('button:text("Pay")').click(); // Submit the form
   72 |   const errMsg =await page.locator('#patientName-error').textContent(); // Check if the error message is displayed for the patient name field
   73 |   console.log(errMsg); // Print the error message
   74 |
   75 | });
   76 |
   77 |
   78 | test.only('Click Sponsor Now to navigate to the sponsor page. Enter invalid data in the fields. Click the Pay button.', async ({ browser }) => {
   79 |   const context = await browser.newContext();
   80 |   const page = await context.newPage();
   81 |
   82 |   await page.goto('http://localhost:3000/donor/home');
   83 |
   84 |   const SponsorBtn = page.locator('[data-testid="sponsor-button-3"]');
   85 |
   86 |   // Just click — don't wait for navigation
   87 |   await SponsorBtn.click();
   88 |
   89 |   //Wait for the sponsor form itself (reliable check)
   90 |   await page.waitForSelector('#amount', { state: 'visible' });
   91 |   await page.waitForSelector('#patientName', { state: 'visible' });
   92 |   await page.waitForSelector('#message', { state: 'visible' });
   93 |
   94 |  
   95 |  
   96 |
   97 |   await page.locator('#amount').fill('Yashodha');
   98 |   await page.locator('#patientName').fill('Ushan');
   99 |   await page.locator('#message').fill('Get well soon');
  100 |   await page.locator('#public-radio').click(); // Check the radio button for public visibility
  101 |   await page.locator('button:text("Pay")').click(); // Submit the form
  102 |   console.log(await page.locator('#amount-error').textContent()); // Print the error message
> 103 |   await expect(page.locator('#amount-error')).toContainText('fsfdasmount must'); // Assert error message
      |                                               ^ Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)
  104 |
  105 |
  106 | });
  107 |
  108 |
  109 |
  110 |
  111 |
  112 |
```