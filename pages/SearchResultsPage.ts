// pages/SearchResultsPage.ts

import { Page, Locator, expect } from '@playwright/test';

export class SearchResultsPage {
  readonly page: Page;
  readonly results: Locator;

  constructor(page: Page) {
    this.page = page;
    this.results = page.locator('span.a-size-medium');
  }

  async verifyResultsContainKeyword(keyword: string) {
    await expect(this.results.first()).toBeVisible({ timeout: 5000 });

    const count = await this.results.count();
    let found = false;

    for (let i = 0; i < count; i++) {
      const text = await this.results.nth(i).textContent();
      if (text && text.toLowerCase().includes(keyword.toLowerCase())) {
        found = true;
        break;
      }
    }

    expect(found).toBeTruthy();
  }
}
