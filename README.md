# Amazon Playwright Automation Framework

![Playwright Tests](https://github.com/arunkjoyson/amazon-playwright-automation/actions/workflows/playwright.yml/badge.svg)

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

### install dependencies:

npm install

### Install Playwright browsers:

npx playwright install

### Running tests

npx playwright test

### Viewing reports

npx playwright show-report

## Author
Arun Kanjirathingal Joyson

## License

[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)

This project is licensed under the [Creative Commons Attribution-NonCommercial 4.0 International License](https://creativecommons.org/licenses/by-nc/4.0/).

You are free to use and modify this code for **non-commercial purposes only**, with proper attribution.  
**Commercial use is strictly prohibited** without prior written consent from the repository owner.
