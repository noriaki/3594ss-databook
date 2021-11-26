import Commander from '~/models/Commander';
import { build as buildCrawler } from '~/drivers/crawlers/factory';
import {
  getCommanderDetail,
  getCommanderList,
} from '~/drivers/crawlers/performer';
import { build as buildSpreadSheets } from '~/drivers/spreadsheets/factory';
import { addCommander, syncHeader } from '~/drivers/spreadsheets/performer';
import { GSSCommander } from '~/drivers/spreadsheets/datamodel';

(async () => {
  const { browser, page } = await buildCrawler();
  const commanders = await getCommanderList(page);

  const sampleCommanders = commanders.filter(
    (c) =>
      c.gwId === '296471' ||
      c.gwId === '289306' ||
      c.gwId === '266994' ||
      c.gwId === '266931'
  );

  const { doc, sheets } = await buildSpreadSheets();
  const { commander: sheet } = sheets;
  if (sheet !== undefined) {
    await syncHeader(sheet);

    for (const commander of sampleCommanders) {
      const data = await getCommanderDetail(page, commander);
      const c = new Commander(data.asCommanderObject());
      const ssData = new GSSCommander(c);
      await addCommander(sheet, ssData);
    }
  }
  await browser.close();
})();
