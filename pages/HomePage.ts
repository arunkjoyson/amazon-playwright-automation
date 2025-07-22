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
    await this.page.goto('https://www.amazon.com/', { waitUntil: 'load' });
  }

  async acceptCookiesIfPresent() {
    try {
      await this.page.locator('#sp-cc-accept').click({ timeout: 3000 });
    } catch {
      // Cookie consent not shown
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
    const maxAttempts = 3;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        await this.page.waitForSelector('#twotabsearchtextbox', { state: 'visible', timeout: 5000 });
        await this.searchBox.fill(product);
        await this.searchButton.click();
        return;
      } catch (err) {
        console.warn(`Attempt ${attempt}: Search box not visible.`);
        if (attempt === maxAttempts) {
          await this.page.screenshot({ path: `searchbox-failure-attempt${attempt}.png` });
          throw new Error('Search box not visible after multiple attempts');
        }
        await this.page.waitForTimeout(1000); // brief wait before retry
      }
    }
  }
}
