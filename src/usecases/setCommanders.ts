import { GSSCommander } from '~/drivers/spreadsheets/datamodel';
import { build } from '~/drivers/spreadsheets/factory';

(async () => {
  const { doc, sheets } = await build();

  const { commander: sheet } = sheets;
  if (sheet !== undefined) {
    const headers = GSSCommander.getProperties();
    await sheet.resize({
      rowCount: sheet.rowCount,
      columnCount: headers.length,
    });
    await sheet.setHeaderRow(headers);
    const commanders = await sheet.getRows();
    console.log(headers, commanders);
  }
})();
