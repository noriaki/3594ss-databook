import puppeteer from 'puppeteer';

const LIST_URL = 'https://gamewith.jp/sangokushi-shinsen/article/show/263306';

const device = puppeteer.devices['Pixel 4'];
const gotoOptions: puppeteer.WaitForOptions = {
  waitUntil: 'domcontentloaded',
};

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setJavaScriptEnabled(false);
  await page.emulate(device);

  await page.goto(LIST_URL, gotoOptions);
  const count = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll!<HTMLAnchorElement>(
        '.s_shinsen_ichiran table tr.w-idb-element td:first-child a'
      )
    ).map((elm) => ({ name: elm.innerText, url: elm.href }));
  });
  console.log(count);
  await browser.close();
})();
