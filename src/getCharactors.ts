import puppeteer from 'puppeteer';
import { writeFile } from 'fs/promises';
import { resolve } from 'path';
import csvStringifySync from 'csv-stringify/lib/sync';

import {
  retrieveCost,
  retrieveRarity,
  retrieveTeam,
  retrieveTypes,
} from './retrieve';

const LIST_URL = 'https://gamewith.jp/sangokushi-shinsen/article/show/263306';
const DIST_FILEPATH = resolve('dist', 'charactors.csv');

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

  const csvData = [];
  const charactor = charactorNames[0];
  // for (const charactor of charactorNames) {
  await page.goto(charactor.url, gotoOptions);

  // Basic Data part
  const basicData = await page.evaluate(() => {
    const table = document.querySelector<HTMLTableElement>(
      '.s_shinsen_kihonhjouhou_table table'
    );

    if (table === null) {
      throw new Error(`Basic Info table not found in #{charactor.url}`);
    }

    const rarity =
      table.querySelector<HTMLTableCellElement>(
        'tr:nth-child(1) td'
      )!.innerText;

    const cost =
      table.querySelector<HTMLTableCellElement>(
        'tr:nth-child(2) td'
      )!.innerText;

    const team = table.querySelector<HTMLImageElement>(
      'tr:nth-child(3) td img'
    )!.alt;

    const types =
      table.querySelector<HTMLTableCellElement>(
        'tr:nth-child(4) td'
      )!.innerText;

    return {
      rarity,
      cost,
      team,
      types,
    };
  });

  const data = {
    ...charactor,
    rarity: retrieveRarity(basicData.rarity),
    cost: retrieveCost(basicData.cost),
    team: retrieveTeam(basicData.team),
    types: retrieveTypes(basicData.types),
  };
  // }

  console.log(data);

  // const csvData = csvStringifySync(charactorNames, {
  //   header: true,
  //   quoted_string: true,
  // });
  // await writeFile(DIST_FILEPATH, csvData);
  await browser.close();
})();
