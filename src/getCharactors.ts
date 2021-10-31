import puppeteer from 'puppeteer';
import { writeFile } from 'fs/promises';
import { resolve } from 'path';
import csvStringifySync from 'csv-stringify/lib/sync';

const LIST_URL = 'https://gamewith.jp/sangokushi-shinsen/article/show/263306';
const DIST_FILEPATH = resolve('dist', 'charactorURLs.csv');

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
  const charactorNames = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll!<HTMLAnchorElement>(
        '.s_shinsen_ichiran table tr.w-idb-element td:first-child a'
      )
    ).map((elm) => ({
      gwId: elm.href.split('/').reverse()[0],
      name: elm.innerText,
      url: elm.href,
    }));
  });
  // console.log(charactorNames);

  const csvData = csvStringifySync(charactorNames, {
    header: true,
    quoted_string: true,
  });
  await writeFile(DIST_FILEPATH, csvData);
  await browser.close();
})();
