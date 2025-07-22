import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';

test('Amazon.ca search for laptop and validate search term displayed', async ({ page }) => {
  const homePage = new HomePage(page);
  const resultsPage = new SearchResultsPage(page);

  
  await page.goto('https://www.amazon.ca/');

  await homePage.acceptCookiesIfPresent();

  await homePage.searchFor('laptop');

  // Validate that the search term "laptop" appears at the top of search results
  await resultsPage.verifySearchTermDisplayed('laptop');
});
