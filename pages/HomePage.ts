// pages/HomePage.ts

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
    await this.page.goto('https://www.amazon.com/');
  }

  async acceptCookiesIfPresent() {
    try {
      await this.page.click('#sp-cc-accept', { timeout: 3000 });
    } catch (err) {
      // Ignore if not found
    }
  }

  async handlePopupAndRedirect() {
    if (await this.shopOnCaPopup.isVisible({ timeout: 5000 })) {
      await Promise.all([
        this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
        this.shopOnCaPopup.click()
      ]);
    }
  }

  async searchFor(product: string) {
    await this.searchBox.fill(product);
    await this.searchButton.click();
  }
}
