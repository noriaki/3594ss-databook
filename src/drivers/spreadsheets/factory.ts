import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from 'google-spreadsheet';

// creds
const client_email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const private_key = process.env.GOOGLE_PRIVATE_KEY;

// spreadsheets
const docId = process.env.GOOGLE_SPREADSHEETS_DOC_ID;
const commanderSheetId = process.env.GOOGLE_SPREADSHEETS_COMMANDER_SHEET_ID;
const tacticsSheetId = process.env.GOOGLE_SPREADSHEETS_TACTICS_SHEET_ID;

if (client_email === undefined || private_key === undefined) {
  throw new Error('Google Service Account Auth Error: Cannot found Creds');
}

type Sheets = {
  commander?: GoogleSpreadsheetWorksheet;
  tactics?: GoogleSpreadsheetWorksheet;
};

export const build = async () => {
  if (docId === undefined) {
    throw new Error('Google SpreadSheets Driver Error: Not found `docId`');
  }

  const doc = new GoogleSpreadsheet(docId);
  await doc.useServiceAccountAuth({
    client_email,
    private_key: private_key.replace(/\\n/g, '\n'),
  });
  await doc.loadInfo();

  const sheets: Sheets = {};
  if (commanderSheetId !== undefined) {
    sheets.commander = doc.sheetsById[commanderSheetId];
  }
  if (tacticsSheetId !== undefined) {
    sheets.tactics = doc.sheetsById[tacticsSheetId];
  }
  return { doc, sheets };
};
