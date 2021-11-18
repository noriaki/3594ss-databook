import puppeteer from 'puppeteer';

import { GWCommanderBaseTypes, GWCommander } from './datamodel';
import { defaultGotoOptions } from './factory';

export const getCommanderList = async (page: puppeteer.Page) => {
  const LIST_URL = 'https://gamewith.jp/sangokushi-shinsen/article/show/263306';
  await page.goto(LIST_URL, defaultGotoOptions);
  const commanders: GWCommanderBaseTypes[] = await page.evaluate(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>( // <
      '.s_shinsen_ichiran table tr.w-idb-element td:first-child a'
    );
    return Array.from(links).map((elm) => ({
      gwId: elm.href.split('/').reverse()[0],
      name: elm.innerText,
      url: elm.href,
    }));
  });
  return commanders;
};

export const getCommanderDetail = async (
  page: puppeteer.Page,
  { name, url, gwId }: GWCommanderBaseTypes
) => {
  await page.goto(url, defaultGotoOptions);

  // Basic Data
  const rarity = await page.evaluate(
    () =>
      document.querySelector<HTMLTableCellElement>(
        '.s_shinsen_kihonhjouhou_table table tr:nth-child(1) td'
      )?.innerText
  );

  const cost = await page.evaluate(
    () =>
      document.querySelector<HTMLTableCellElement>(
        '.s_shinsen_kihonhjouhou_table table tr:nth-child(2) td'
      )?.innerText
  );

  const team = await page.evaluate(
    () =>
      document.querySelector<HTMLImageElement>(
        '.s_shinsen_kihonhjouhou_table table tr:nth-child(3) td img'
      )?.alt
  );

  const types = await page.evaluate(
    () =>
      document.querySelector<HTMLTableCellElement>(
        '.s_shinsen_kihonhjouhou_table table tr:nth-child(4) td'
      )?.innerText
  );

  const apt = await page.evaluate(() => {
    const cavalry = document.querySelector<HTMLTableCellElement>(
      '.s_shinsen_tekisei_table table tr:nth-child(1) td'
    )?.innerText;
    const shield = document.querySelector<HTMLTableCellElement>(
      '.s_shinsen_tekisei_table table tr:nth-child(2) td'
    )?.innerText;
    const bow = document.querySelector<HTMLTableCellElement>(
      '.s_shinsen_tekisei_table table tr:nth-child(3) td'
    )?.innerText;
    const spear = document.querySelector<HTMLTableCellElement>(
      '.s_shinsen_tekisei_table table tr:nth-child(4) td'
    )?.innerText;
    const siege = document.querySelector<HTMLTableCellElement>(
      '.s_shinsen_tekisei_table table tr:nth-child(5) td'
    )?.innerText;
    return {
      cavalry,
      shield,
      bow,
      spear,
      siege,
    };
  });

  const status = {
    max: await page.evaluate(() => {
      const attack = document.querySelector<HTMLTableCellElement>(
        '.status_meter table tr:nth-child(1) td'
      )?.innerText;
      const intelligence = document.querySelector<HTMLTableCellElement>(
        '.status_meter table tr:nth-child(2) td'
      )?.innerText;
      const defense = document.querySelector<HTMLTableCellElement>(
        '.status_meter table tr:nth-child(3) td'
      )?.innerText;
      const velocity = document.querySelector<HTMLTableCellElement>(
        '.status_meter table tr:nth-child(4) td'
      )?.innerText;
      const admin = document.querySelector<HTMLTableCellElement>(
        '.status_meter table tr:nth-child(5) td'
      )?.innerText;
      const charm = document.querySelector<HTMLTableCellElement>(
        '.status_meter table tr:nth-child(6) td'
      )?.innerText;
      return {
        attack,
        intelligence,
        defense,
        velocity,
        admin,
        charm,
      };
    }),
    min: await page.evaluate(() => {
      const attack = document.querySelector<HTMLTableCellElement>(
        '.s_shinsen_status_table table tr:nth-child(1) td:nth-of-type(1)'
      )?.innerText;
      const intelligence = document.querySelector<HTMLTableCellElement>(
        '.s_shinsen_status_table table tr:nth-child(1) td:nth-of-type(2)'
      )?.innerText;
      const defense = document.querySelector<HTMLTableCellElement>(
        '.s_shinsen_status_table table tr:nth-child(2) td:nth-of-type(1)'
      )?.innerText;
      const velocity = document.querySelector<HTMLTableCellElement>(
        '.s_shinsen_status_table table tr:nth-child(2) td:nth-of-type(2)'
      )?.innerText;
      const admin = document.querySelector<HTMLTableCellElement>(
        '.s_shinsen_status_table table tr:nth-child(3) td:nth-of-type(1)'
      )?.innerText;
      const charm = document.querySelector<HTMLTableCellElement>(
        '.s_shinsen_status_table table tr:nth-child(3) td:nth-of-type(2)'
      )?.innerText;
      return {
        attack,
        intelligence,
        defense,
        velocity,
        admin,
        charm,
      };
    }),
  };

  const description = await page.evaluate(
    () => document.querySelector<HTMLDivElement>('.s_shinsen_tips')?.innerText
  );

  const props = {
    name,
    rarity,
    cost,
    team,
    types,
    apt,
    status,
    description,
    gwId,
  };
  GWCommander.assertProps(props);
  return new GWCommander(props);
};

// export const getTacticsList = async () => {};

// export const getTacticsDetail = async () => {};
