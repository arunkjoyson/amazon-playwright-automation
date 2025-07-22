import { test, expect } from '@playwright/test';

test('Amazon.ca homepage loads and searches', async ({ page }) => {
  await page.goto('https://www.amazon.com/');

  // Optional: Accept cookies if present
  try {
    await page.click('#sp-cc-accept', { timeout: 3000 });
  } catch (err) {
    // Ignore if not found
  }

  // Check if popup is visible and click
  const shopOnCaPopup = page.locator('span:has-text("Shop on Amazon.ca")');
  if (await shopOnCaPopup.isVisible({ timeout: 5000 })) {
    await shopOnCaPopup.click();

    // Explicit wait for redirect to Amazon.ca
    await page.waitForURL('https://www.amazon.ca/**');
  }

  // Ensure you are on Amazon.ca and search there
  await page.fill('#twotabsearchtextbox', 'laptop');
  await page.click('#nav-search-submit-button');

  const results = page.locator('span.a-size-medium');
  await expect(results.first()).toBeVisible();
});
