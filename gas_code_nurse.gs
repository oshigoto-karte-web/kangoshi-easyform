/**
 * お仕事カルテ（看護）｜簡易アンケートフォーム
 * GASスクリプト
 *
 * ■ 概要
 *   看護師向け簡易アンケートフォームからの送信データを
 *   スプレッドシートの「簡易版」シートに書き込む。
 *
 * ■ スプレッドシート構成
 *   シート名: 簡易版
 *   A列: 送信日時
 *   B列: 記入者のお名前
 *   C列: 年齢
 *   D列: 電話番号
 *   E列: ご連絡希望日程
 *   F列: ご連絡希望時間
 *
 * ■ デプロイ手順
 *   1. Google スプレッドシートを開く
 *      → https://docs.google.com/spreadsheets/d/1GLMxePzqHGvtYhOJmM1Dv-cBXbIyzyEL_Ih1xT_Uf3s/edit
 *   2. 「拡張機能」→「Apps Script」を開く
 *   3. このコードを「コード.gs」に貼り付けて保存
 *   4. 「デプロイ」→「新しいデプロイ」をクリック
 *   5. 種類: 「ウェブアプリ」を選択
 *   6. 次のユーザーとして実行: 「自分」
 *   7. アクセスできるユーザー: 「全員」
 *   8. 「デプロイ」をクリック → URLをコピーして保存
 *
 * ■ 再デプロイ時の注意
 *   コードを変更した場合は「デプロイを管理」→鉛筆アイコン→
 *   バージョンを「新しいバージョン」に変更してデプロイしてください。
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // 「簡易版」シートへ書き込む
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("簡易版");

    if (!sheet) {
      return ContentService.createTextOutput(
        JSON.stringify({ status: "error", message: "シートが見つかりません: 簡易版" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const dateStr = Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyy/MM/dd HH:mm:ss");

    // A=送信日時, B=記入者のお名前, C=年齢, D=電話番号, E=ご連絡希望日程, F=ご連絡希望時間
    sheet.appendRow([
      dateStr,
      data.name  || "",
      data.age   || "",
      data.phone || "",
      data.date  || "",
      data.time  || "",
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", message: "簡易版シートに保存しました" })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// GETリクエストへの応答（ブラウザからの動作確認用）
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok", message: "看護師版フォーム GAS は正常に動作しています" })
  ).setMimeType(ContentService.MimeType.JSON);
}
