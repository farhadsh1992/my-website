// Paste this into: your "ai-agents" Google Sheet > Extensions > Apps Script
// Then deploy it as a Web App (see README.md for exact steps) and put the
// resulting URL into SHEETS_WEBHOOK_URL in your .env file.

function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var data = JSON.parse(e.postData.contents);
  var type = data.type || "qa";

  var sheetName = type === "contact" ? "Contacts" : "QA";
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    if (type === "contact") {
      sheet.appendRow(["Timestamp", "Name", "Email", "Notes"]);
    } else {
      sheet.appendRow(["Timestamp", "Question", "Answer"]);
    }
  }

  if (type === "contact") {
    sheet.appendRow([new Date(), data.name || "", data.email || "", data.notes || ""]);
  } else {
    sheet.appendRow([new Date(), data.question || "", data.answer || ""]);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}
