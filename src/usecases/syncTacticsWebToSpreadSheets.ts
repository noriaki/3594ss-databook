import { build as buildCrawler } from '~/drivers/crawlers/factory';
import { getDetail, getList } from '~/drivers/crawlers/tactics/performar';

(async () => {
  const { browser, page } = await buildCrawler();
  const tactics = await getList(page);

  const sampleTactics = tactics.filter(
    (t) =>
      t.gwId === '269053' || // 1 specifiedCommander
      t.gwId === '268909' || // 2 specifiedCommander
      t.gwId === '269012' || // 1 inheritableCommander
      t.gwId === '289334' || // 2 inheritableCommander
      t.gwId === '269027' || // same commander specified and inheritable
      t.gwId === '289325' // conditions of exchange (JIKEN S2)
  );
  for (const t of sampleTactics) {
    const tac = await getDetail(page, t);
    console.log(tac);
  }
  await browser.close();
})();
