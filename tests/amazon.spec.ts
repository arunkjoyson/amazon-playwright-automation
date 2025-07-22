import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';

test('Amazon.com search for laptop and validate search term displayed', async ({ page }) => {
  const homePage = new HomePage(page);
  const resultsPage = new SearchResultsPage(page);

  await homePage.goto(); // Navigates to https://www.amazon.com
  await homePage.acceptCookiesIfPresent();
  await homePage.handlePopupAndRedirect(); // Optional: mostly used if accidentally redirected to .ca

  await homePage.searchFor('laptop');

  // Validate that the search term "laptop" appears in the search result page
  await resultsPage.verifySearchTermDisplayed('laptop');
});
