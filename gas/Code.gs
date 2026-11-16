/**
 * 04-01 進銷存系統 2077 - GAS 後端核心 API 骨架 (步驟 2)
 * Master DB ID: 1hCS3jMWU0sPmXQ-AU-VUJ65syoKr5Q1BXvjZz-1r75g
 */

const SPREADSHEET_ID = '1hCS3jMWU0sPmXQ-AU-VUJ65syoKr5Q1BXvjZz-1r75g';

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function verifyToken(token) {
  const expected = PropertiesService.getScriptProperties().getProperty('API_TOKEN');
  if (!expected) return { ok: false, error: '伺服器尚未設定 API_TOKEN (ScriptProperties)' };
  if (!token || token !== expected) return { ok: false, error: 'API_TOKEN 驗證失敗' };
  return { ok: true };
}

function doGet(e) {
  const params = (e && e.parameter) || {};
  if (params.action === 'ping') {
    return jsonResponse({ ok: true, service: '04-01 進銷存系統 2077', time: new Date().toISOString() });
  }
  const auth = verifyToken(params.token);
  if (!auth.ok) return jsonResponse(auth);
  return jsonResponse({ ok: true, message: 'GAS API 連線正常（核心模組將於步驟 3 實作）' });
}

function doPost(e) {
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const auth = verifyToken(body.token);
    if (!auth.ok) return jsonResponse(auth);
    return jsonResponse({ ok: false, error: `未知的 action: ${body.action || ''}` });
  } catch (err) {
    return jsonResponse({ ok: false, error: err.message });
  }
}
