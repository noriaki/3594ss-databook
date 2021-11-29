import { build as buildCrawler } from '~/drivers/crawlers/factory';
import { getList } from '~/drivers/crawlers/tactics/performar';

(async () => {
  const { browser, page } = await buildCrawler();
  const tactics = await getList(page);
  console.log(tactics.length, tactics);
  await browser.close();
})();
