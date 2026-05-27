const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream']
  });
  const page = await browser.newPage();

  page.on('console', msg => console.log(`BROWSER LOG: ${msg.type()} - ${msg.text()}`));
  page.on('pageerror', err => console.log(`BROWSER ERROR: ${err.message}`));

  await page.goto('http://localhost:5173/mirror');

  // Wait for 10 seconds to see if detection starts
  await page.waitForTimeout(10000);

  await page.screenshot({ path: '/home/jules/mirror-debug2.png' });
  await browser.close();
})();
