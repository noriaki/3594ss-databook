import puppetter from 'puppeteer';

export const defaultGotoOptions = { waitUntil: 'domcontentloaded' } as const;

export const build = async () => {
  const browser = await puppetter.launch();
  const page = await browser.newPage();
  await page.setJavaScriptEnabled(false);
  await page.emulate(puppetter.devices['Pixel 4']);
  return { browser, page };
};
