import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchBox: Locator;
  readonly searchButton: Locator;
  readonly shopOnCaPopup: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBox = page.locator('#twotabsearchtextbox');
    this.searchButton = page.locator('#nav-search-submit-button');
    this.shopOnCaPopup = page.locator('span:has-text("Shop on Amazon.ca")');
  }

  async goto() {
    // Navigate to Amazon.com
    await this.page.goto('https://www.amazon.com/');
  }

  async acceptCookiesIfPresent() {
    try {
      await this.page.locator('#sp-cc-accept').click({ timeout: 3000 });
    } catch {
      // Cookie consent not present on all regions
    }
  }

  async handlePopupAndRedirect() {
    try {
      if (await this.shopOnCaPopup.isVisible({ timeout: 5000 })) {
        await Promise.all([
          this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
          this.shopOnCaPopup.click()
        ]);
      }
    } catch {
      // Redirect popup not shown
    }
  }

  async searchFor(product: string) {
    // Wait explicitly to avoid flaky fill failure
    await this.page.waitForSelector('#twotabsearchtextbox', { state: 'visible', timeout: 10000 });
    await this.searchBox.fill(product);
    await this.searchButton.click();
  }
}
