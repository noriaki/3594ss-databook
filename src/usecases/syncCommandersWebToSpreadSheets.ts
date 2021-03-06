import Commander from '~/models/Commander';
import { build as buildCrawler } from '~/drivers/crawlers/factory';
import {
  getCommanderDetail,
  getCommanderList,
} from '~/drivers/crawlers/commander/performer';
import { build as buildSpreadSheets } from '~/drivers/spreadsheets/factory';
import {
  addCommander,
  compareAndUpdateCommander,
  findCommanderById,
  syncHeader,
} from '~/drivers/spreadsheets/performer';
import { GSSCommander } from '~/drivers/spreadsheets/datamodel';

(async () => {
  const { browser, page } = await buildCrawler();
  const commanders = await getCommanderList(page);

  // const sampleCommanders = commanders.filter(
  //   (c) =>
  //     c.gwId === '296471' ||
  //     c.gwId === '289306' ||
  //     c.gwId === '266994' ||
  //     c.gwId === '266931'
  // );

  const { doc, sheets } = await buildSpreadSheets();
  const { commander: sheet } = sheets;
  if (sheet !== undefined) {
    await syncHeader(sheet);

    // for (const commander of sampleCommanders) {
    for (const commander of commanders) {
      const data = await getCommanderDetail(page, commander);
      const ssData = new GSSCommander(new Commander(data.asCommanderObject()));
      const ssRow = await findCommanderById(sheet, ssData.id);
      if (ssRow !== undefined) {
        await compareAndUpdateCommander(sheet, ssRow, ssData);
      } else {
        await addCommander(sheet, ssData);
      }
    }
  }
  await browser.close();
})();
