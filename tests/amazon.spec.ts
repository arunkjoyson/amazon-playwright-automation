import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';

test('Amazon.ca search for laptop and validate Mac result', async ({ page }) => {
  const homePage = new HomePage(page);
  const resultsPage = new SearchResultsPage(page);

  await homePage.goto();
  await homePage.acceptCookiesIfPresent();
  await homePage.handlePopupAndRedirect();

  await expect(page).toHaveURL(/https:\/\/www\.amazon\.(ca|com)/);

  await homePage.searchFor('laptop');
  await resultsPage.verifyResultsContainKeyword('Mac');
});
