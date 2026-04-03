// ============================================================
//  Google Apps Script — CX Maturity Assessment Lead Capture
// ============================================================
//
//  SETUP INSTRUCTIONS:
//
//  1. Go to https://script.google.com and click "+ New project"
//  2. Delete any existing code and paste this entire file
//  3. Click the disk icon (Save) and name the project
//     e.g. "CX Maturity Leads"
//  4. Click "Deploy" > "New deployment"
//  5. Click the gear icon next to "Select type" > choose "Web app"
//  6. Set:
//       - Description: "CX Maturity Lead Capture"
//       - Execute as: "Me"
//       - Who has access: "Anyone"
//  7. Click "Deploy" and authorize when prompted
//  8. Copy the Web App URL (it looks like:
//     https://script.google.com/macros/s/AKfycb.../exec)
//  9. Paste that URL into index.html, replacing:
//     const WEBHOOK_URL = 'https://script.google.com/macros/s/YOUR_ID/exec';
//
//  The script will auto-create a Google Sheet named
//  "CX Maturity Assessment Leads" in your Google Drive
//  on the first submission.
//
// ============================================================

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var sheetName = 'CX Maturity Assessment Leads';
    var ss = null;

    // Find existing sheet or create new one
    var files = DriveApp.getFilesByName(sheetName);
    if (files.hasNext()) {
      ss = SpreadsheetApp.open(files.next());
    } else {
      ss = SpreadsheetApp.create(sheetName);
    }

    var sheet = ss.getSheets()[0];

    // Add headers if this is the first row
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Name',
        'Email',
        'Company',
        'Total Score',
        'Maturity Level',
        'Infrastructure %',
        'Automation %',
        'Coaching %',
        'WFM %',
        'AI & Insights %'
      ]);

      // Bold + freeze header row
      sheet.getRange(1, 1, 1, 11).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    // Append the lead data
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.company || '',
      data.totalScore || 0,
      data.maturityLevel || '',
      data.infrastructure || 0,
      data.automation || 0,
      data.coaching || 0,
      data.wfm || 0,
      data.aiInsights || 0
    ]);

    // Auto-resize columns for readability
    sheet.autoResizeColumns(1, 11);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Required for CORS preflight (though we use no-cors mode)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'CX Maturity Lead Capture is running.' }))
    .setMimeType(ContentService.MimeType.JSON);
}
