import type { GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import { GSSCommander, GSSCommanderType } from './datamodel';

export const syncHeader = async (sheet: GoogleSpreadsheetWorksheet) => {
  const headers = GSSCommander.getProperties();
  await sheet.resize({
    rowCount: sheet.rowCount,
    columnCount: headers.length,
  });
  await sheet.setHeaderRow(headers);
};

export const addCommander = async (
  sheet: GoogleSpreadsheetWorksheet,
  commander: GSSCommanderType
) => {
  await sheet.addRow(commander.asObject());
};
