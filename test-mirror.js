import { syncPlaywright } from 'playwright';

(async () => {
  const { chromium } = require('playwright');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => console.log(`BROWSER LOG: ${msg.type()} - ${msg.text()}`));
  page.on('pageerror', err => console.log(`BROWSER ERROR: ${err.message}`));

  await page.goto('http://localhost:5173/mirror');
  await page.waitForTimeout(5000); // wait for load

  await browser.close();
})();
