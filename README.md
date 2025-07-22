# Amazon Playwright Automation Framework

This repository contains an automation framework for testing the Amazon website using [Microsoft Playwright](https://playwright.dev/).  
It includes a basic test that opens the Amazon homepage, handles regional redirects, searches for a product, and validates search results.

##  Prerequisites

- Node.js >= 16.x
- npm >= 8.x
- Playwright browsers (installed automatically with Playwright)

---

##  Setup

Clone this repository:
```bash
git clone git@github.com:arunkjoyson/amazon-playwright-automation.git
cd amazon-playwright-automation

##@ install dependencies:

npm install

### Install Playwright browsers:

npx playwright install

### Running tests

npx playwright test

### Viewing reports

npx playwright show-report

## Author
Arun Kanjirathingal Joyson
