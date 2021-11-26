import { build } from '~/drivers/spreadsheets/factory';
import { syncHeader } from '~/drivers/spreadsheets/performer';

(async () => {
  const { doc, sheets } = await build();

  const { commander: sheet } = sheets;
  if (sheet !== undefined) {
    await syncHeader(sheet);
    const commanders = await sheet.getRows();
    console.log(headers, commanders);
  }
})();
