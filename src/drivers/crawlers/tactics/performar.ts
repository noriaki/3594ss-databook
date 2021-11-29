import puppeteer from 'puppeteer';
import { defaultGotoOptions } from '../factory';
import { GWTactics, GWTacticsBase } from './datamodel';

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

export const getDetail = async (
  page: puppeteer.Page,
  { name, url, gwId }: GWTacticsBase
) => {
  await page.goto(url, defaultGotoOptions);
  const type = await getType(page);
  const quality = await getQuality(page);
  const rate = await getRate(page);
  const aptitude = await getAptitude(page);
  const description = await getDescription(page);
  const specifiedCommanders = await getSpecifiedCommanders(page);
  const inheritableCommanders = await getInheriableCommanders(page);

  const props = {
    name,
    type,
    quality,
    rate,
    aptitude,
    description,
    specifiedCommanders,
    inheritableCommanders,
    gwId,
  };
  GWTactics.assertProps(props);
  return new GWTactics(props);
};

const getType = (page: puppeteer.Page) =>
  getTextByQuerySelector<HTMLTableCellElement>(
    page,
    '#article-body > table:nth-of-type(2) tr:nth-of-type(2) td'
  );

const getQuality = (page: puppeteer.Page) =>
  getTextByQuerySelector<HTMLTableCellElement>(
    page,
    '#article-body > table:nth-of-type(2) tr:nth-of-type(4) td'
  );

const getRate = (page: puppeteer.Page) =>
  getTextByQuerySelector<HTMLTableCellElement>(
    page,
    '#article-body > table:nth-of-type(2) tr:nth-of-type(1) td'
  );

const getAptitude = (page: puppeteer.Page) =>
  getTextByQuerySelector<HTMLTableCellElement>(
    page,
    '#article-body > table:nth-of-type(2) tr:nth-of-type(3) td'
  );

const getDescription = async (page: puppeteer.Page) => ({
  max: await getTextByQuerySelector<HTMLTableCellElement>(
    page,
    '#article-body > table:nth-of-type(1) td:nth-of-type(1)'
  ),
  min: await getTextByQuerySelector<HTMLTableCellElement>(
    page,
    '#article-body div > table:nth-of-type(1) td:nth-of-type(1)'
  ),
});

const getSpecifiedCommanders = (page: puppeteer.Page) =>
  getTextsByQuerySelectorAll<HTMLAnchorElement>(
    page,
    '#article-body > .shinsen_half h3:nth-of-type(1) + table td a'
  );

const getInheriableCommanders = (page: puppeteer.Page) =>
  getTextsByQuerySelectorAll<HTMLAnchorElement>(
    page,
    '#article-body > .shinsen_half h3:nth-of-type(2) + table td a'
  );

const getTextByQuerySelector = <T extends HTMLElement>(
  page: puppeteer.Page,
  selector: string
) =>
  page.evaluate((sel) => document.querySelector<T>(sel)?.innerText, selector); // ><

const getTextsByQuerySelectorAll = <T extends HTMLElement>(
  page: puppeteer.Page,
  selector: string
) =>
  page.evaluate((sel) => {
    const elms = document.querySelectorAll<T>(sel); // ><
    return Array.from(elms).map<string | undefined>((elm) => elm?.innerText);
  }, selector);
