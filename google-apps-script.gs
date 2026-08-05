// =====================================================
// Google Apps Script untuk SGBVA Landing Page
// Deploy ini sebagai Web App untuk menerima data form
// =====================================================

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'ok',
      message: 'SGBVA API is running'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.openById('1ZidoqHnd15DSr3iqNVQ8P668PZ1ObPZBAZNhg479YJE');
    var sheet;
    var now = new Date();
    var timestamp = Utilities.formatDate(now, 'Asia/Jakarta', 'dd/MM/yyyy HH:mm:ss');

    switch (data.action) {
      case 'register':
        sheet = getOrCreateSheet(ss, 'Pendaftaran', ['No', 'Tanggal', 'Nama', 'Email', 'No Hp', 'Alasan', 'Sumber']);
        var rowNum = sheet.getLastRow();
        sheet.appendRow([rowNum, timestamp, data.name || '', data.email || '', data.phone || '', data.goals || '', data.source || '']);

        if (data.email) {
          var siteUrl = 'https://herdianadani-101010.github.io/SGBVALandingPage';
          var calUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent('Webinar SGBVA Day 1') + '&dates=20260807T120000Z/20260807T140000Z&details=' + encodeURIComponent('Webinar Gratis 3 Hari SGBVA\nHari 1: Career Relevance\n19:00 - 21:00 WIB via Zoom') + '&location=' + encodeURIComponent('Online via Zoom');
          var subject = 'Pendaftaran Berhasil! Webinar SGBVA Day 1';
          var body = 'Halo ' + (data.name || 'Peserta') + '!\n\nSelamat! Pendaftaran Anda berhasil.\n\nTANGGAL: 7 Agustus 2026\nWAKTU: 19:00 - 21:00 WIB\nPLATFORM: Zoom\nLINK ZOOM: https://zoom.us/j/1234567890\n\n--- TAMBAHKAN KE KALENDER ---\n' + calUrl + '\n\n--- LINK PENTING ---\nFree Gift: ' + siteUrl + '/freegift-day1.html\nAssessment: ' + siteUrl + '/assessment.html\n\nSetelah webinar selesai (jam 21:00 WIB), free gift akan terbuka otomatis.\n\nSampai jumpa!\nTim SGBVA';
          try { GmailApp.sendEmail(data.email, subject, body); } catch (err) { Logger.log(err); }
        }
        break;

      case 'assessment':
        sheet = getOrCreateSheet(ss, 'Assessment', ['No', 'Tanggal', 'Email', 'Nama', 'Skor', 'Level', 'Hari']);
        sheet.appendRow([sheet.getLastRow(), timestamp, data.email || '', data.name || '', data.score || 0, data.level || '', data.day || 1]);
        break;

      case 'download':
        sheet = getOrCreateSheet(ss, 'Downloads', ['No', 'Tanggal', 'Email', 'Nama', 'Gift', 'Hari']);
        sheet.appendRow([sheet.getLastRow(), timestamp, data.email || '', data.name || '', data.gift || '', data.day || 1]);
        break;
    }
    return ContentService.createTextOutput(JSON.stringify({status: 'ok'}));
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({status: 'error', message: err.toString()}));
  }
}

function getOrCreateSheet(ss, name, headers) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    var r = sheet.getRange(1, 1, 1, headers.length);
    r.setFontWeight('bold');
    r.setBackground('#4F071E');
    r.setFontColor('#FFFFFF');
  }
  return sheet;
}

// Test function
function testDoPost() {
  var testData = {
    postData: {
      contents: JSON.stringify({
        action: 'register',
        name: 'Test User',
        email: 'test@example.com',
        phone: '+62812345678',
        source: 'day1sgbvawebinar'
      })
    }
  };

  var result = doPost(testData);
  Logger.log(result.getContent());
}
