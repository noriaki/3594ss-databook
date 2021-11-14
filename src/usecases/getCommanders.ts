import { build } from '~/drivers/crawlers/factory';
import {
  getCommanderDetail,
  getCommanderList,
} from '~/drivers/crawlers/performer';

(async () => {
  const { browser, page } = await build();
  const commanders = await getCommanderList(page);

  const sampleCommanders = commanders.filter(
    (c) => c.gwId === '296471' || c.gwId === '289306' || c.gwId === '266994'
  );

  for (const commander of sampleCommanders) {
    const data = await getCommanderDetail(page, commander);
    console.log(data);
  }

  await browser.close();
})();
