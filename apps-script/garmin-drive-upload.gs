/*
  Garmin Entreno -> Google Drive uploader

  Setup:
  1. Create a new project at https://script.google.com/
  2. Paste this file in Code.gs.
  3. Deploy as Web App:
     - Execute as: Me
     - Who has access: Anyone
  4. Copy the Web App URL into Garmin Entreno -> Drive link.
*/

const DRIVE_FOLDER_ID = '1flQC1TuTgMoskS0gFUwr_bL1qQomirR3';

// Optional. If you write a value here, write the same value in Garmin Entreno -> Drive link.
// If you leave it empty, the Web App URL is the only protection.
const UPLOAD_SECRET = '';

function doPost(e) {
  var payload = {};
  try {
    payload = JSON.parse((e.parameter && e.parameter.payload) || '{}');

    if (UPLOAD_SECRET && payload.secret !== UPLOAD_SECRET) {
      throw new Error('Clave secreta incorrecta.');
    }

    if (!payload.data) throw new Error('No ha llegado la imagen.');

    var name = safeName_(payload.fileName || ('garmin_entreno_' + Date.now() + '.jpg'));
    var mimeType = payload.mimeType || 'image/jpeg';
    var bytes = Utilities.base64Decode(payload.data);
    var blob = Utilities.newBlob(bytes, mimeType, name);
    var folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
    var file = folder.createFile(blob);

    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    return htmlResponse_({
      source: 'garmin-drive-upload',
      ok: true,
      uploadId: payload.uploadId || '',
      fileId: file.getId(),
      name: file.getName(),
      url: 'https://drive.google.com/file/d/' + file.getId() + '/view?usp=sharing'
    });
  } catch (err) {
    return htmlResponse_({
      source: 'garmin-drive-upload',
      ok: false,
      uploadId: payload.uploadId || '',
      error: err && err.message ? err.message : String(err)
    });
  }
}

function doGet(e) {
  var action = e.parameter && e.parameter.action;
  if (action === 'delete') {
    return deleteFile_(e);
  }
  return htmlResponse_({
    source: 'garmin-drive-upload',
    ok: true,
    message: 'Garmin Drive uploader activo.'
  });
}

function deleteFile_(e) {
  try {
    if (!UPLOAD_SECRET || e.parameter.secret !== UPLOAD_SECRET) {
      throw new Error('Borrado no autorizado.');
    }
    var fileId = e.parameter.fileId;
    if (!fileId) throw new Error('Falta fileId.');
    DriveApp.getFileById(fileId).setTrashed(true);
    return htmlResponse_({
      source: 'garmin-drive-upload',
      ok: true,
      deleted: true,
      fileId: fileId
    });
  } catch (err) {
    return htmlResponse_({
      source: 'garmin-drive-upload',
      ok: false,
      error: err && err.message ? err.message : String(err)
    });
  }
}

function safeName_(name) {
  name = String(name || 'garmin_entreno.jpg')
    .replace(/[\\/:*?"<>|#%{}[\]^~`]/g, '_')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .slice(0, 140);
  if (!/\.jpe?g$/i.test(name)) name += '.jpg';
  return name;
}

function htmlResponse_(payload) {
  var json = JSON.stringify(payload).replace(/</g, '\\u003c');
  var isOk = !!payload.ok;
  var title = isOk ? 'Imagen subida' : 'Error al subir';
  var linkHtml = payload.url
    ? '<p><a href="' + escapeHtml_(payload.url) + '" target="_blank" rel="noopener">Abrir imagen</a></p><input value="' + escapeHtml_(payload.url) + '" onclick="this.select()" readonly>'
    : '<p>' + escapeHtml_(payload.message || payload.error || '') + '</p>';

  var html = '<!doctype html><html><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<style>body{margin:0;background:#0b0c0f;color:#eaeaea;font-family:Arial,sans-serif;display:flex;min-height:100vh;align-items:center;justify-content:center;padding:24px}' +
    '.box{max-width:680px;width:100%;background:#10151a;border:1px solid #20303a;border-radius:12px;padding:22px}' +
    'h1{font-size:20px;margin:0 0 12px}p{color:#9aa6b2;line-height:1.5}a{color:#5eead4;font-weight:700}input{width:100%;margin-top:10px;background:#07090c;border:1px solid #26323c;color:#eaeaea;border-radius:8px;padding:12px;font-size:14px}</style>' +
    '<script>var msg=' + json + ';try{if(window.parent)window.parent.postMessage(msg,"*");if(window.opener)window.opener.postMessage(msg,"*");}catch(e){}</script>' +
    '</head><body><div class="box"><h1>' + title + '</h1>' + linkHtml + '</div></body></html>';

  return HtmlService.createHtmlOutput(html).setTitle(title);
}

function escapeHtml_(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
