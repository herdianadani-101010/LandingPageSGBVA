// =====================================================
// Google Apps Script untuk SGBVA Landing Page
// Deploy ini sebagai Web App untuk menerima data form
// =====================================================

function doPost(e) {
  try {
    // Parse data dari request
    const data = JSON.parse(e.postData.contents);

    // Open Google Sheets (ganti dengan Spreadsheet ID Anda)
    const ss = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID');
    const sheet = ss.getActiveSheet();

    // Cek apakah header sudah ada
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    if (headers.length === 0 || headers[0] === '') {
      // Set header baru
      sheet.getRange(1, 1, 1, 7).setValues([[
        'Timestamp', 'Name', 'Email', 'Phone', 'Source', 'Event', 'Status'
      ]]);
    }

    // Tambah data baru
    const newRow = [
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.source || 'day1sgbvawebinar',
      data.event || 'Day 1 Webinar - Career Relevance',
      'Registered'
    ];

    sheet.appendRow(newRow);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Registration successful'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function
function testDoPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        phone: '+62812345678',
        timestamp: new Date().toISOString(),
        source: 'day1sgbvawebinar',
        event: 'Day 1 Webinar - Career Relevance'
      })
    }
  };

  const result = doPost(testData);
  Logger.log(result.getContent());
}
