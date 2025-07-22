// pages/SearchResultsPage.ts

import { Page, Locator, expect } from '@playwright/test';

export class SearchResultsPage {
  readonly page: Page;
  readonly results: Locator;
  readonly searchTermElement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.results = page.locator('span.a-size-medium');
    this.searchTermElement = page.locator('span.a-color-state.a-text-bold');
  }

  // New method: validate that the search term is displayed on the results page
  async verifySearchTermDisplayed(searchTerm: string) {
    await expect(this.searchTermElement).toBeVisible({ timeout: 5000 });
    await expect(this.searchTermElement).toContainText(searchTerm, { ignoreCase: true });
  }
}
