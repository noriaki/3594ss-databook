import type {
  GoogleSpreadsheetRow,
  GoogleSpreadsheetWorksheet,
} from 'google-spreadsheet';
import { GSSCommander, GSSCommanderKeys, GSSCommanderType } from './datamodel';

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

export const findCommanderById = async (
  sheet: GoogleSpreadsheetWorksheet,
  id: string
) => {
  const data = await sheet.getRows();
  return data.find((row) => row.id === id);
};

export const compareAndUpdateCommander = async (
  sheet: GoogleSpreadsheetWorksheet,
  row: GoogleSpreadsheetRow,
  commander: GSSCommanderType
) => {
  const diffKeys = differenceKeys(sheet, row, commander);
  if (diffKeys.length > 0) {
    for (const key of diffKeys) {
      row[key] = commander[key];
    }
    await row.save();
  }
};

const differenceKeys = (
  sheet: GoogleSpreadsheetWorksheet,
  row: GoogleSpreadsheetRow,
  commander: GSSCommanderType
) => {
  const diff: GSSCommanderKeys = [];
  const keys = sheet.headerValues as GSSCommanderKeys;
  for (const key of keys) {
    if (row[key] !== undefined && commander[key] !== undefined) {
      if (row[key] !== commander[key]) {
        diff.push(key);
      }
    }
  }
  return diff;
};
