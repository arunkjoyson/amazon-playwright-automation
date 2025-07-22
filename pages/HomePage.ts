import { Page, Locator, expect } from '@playwright/test';

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
    await this.page.goto('https://www.amazon.com/', { waitUntil: 'load' });
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
    // Retry logic to ensure the search box is visible
    const isVisible = await this.searchBox.isVisible({ timeout: 10000 });

    if (!isVisible) {
      throw new Error('Search box not visible after timeout');
    }

    await this.searchBox.fill(product);
    await this.searchButton.click();
  }
}
