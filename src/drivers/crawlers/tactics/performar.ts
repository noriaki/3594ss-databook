import puppeteer from 'puppeteer';
import { defaultGotoOptions } from '../factory';
import { GWTacticsBase } from './datamodel';

export const getList = async (page: puppeteer.Page) => {
  const LIST_URL = 'https://gamewith.jp/sangokushi-shinsen/article/show/263311';
  await page.goto(LIST_URL, defaultGotoOptions);
  const tactics: GWTacticsBase[] = await page.evaluate(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>(
      '.s_shinsen_ichiran table tr.w-idb-element td:first-child a'
    );
    return Array.from(links).map((elm) => ({
      gwId: elm.href.split('/').reverse()[0],
      name: elm.innerText,
      url: elm.href,
    }));
  });
  return tactics;
};
