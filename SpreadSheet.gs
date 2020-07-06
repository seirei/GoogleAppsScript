/**
 * スプレットシートクラス
 */
class SpreadSheet {
  /**
   * コンストラクタ
   *
   * 引数：１個
   * @param {string} id - スプレットシートＩＤ
   * 引数：２個
   * @param {string} id - フォルダＩＤ
   * @param {string} fileName - ファイル名（スプレットシート）
   */
  constructor(id, fileName) {
    switch (arguments.length) {
      case 1:
        this.id = id;
        this.spread = SpreadsheetApp.openById(id);
        break;
      case 2:
        this.id = this.findSpreadsheetByName(id, fileName);
        this.spread = SpreadsheetApp.openById(this.id);
        break;
      default:
        console.log('コンストラクタの引数エラー');
        break;
    }
  }
  
  /**
   * 指定フォルダＩＤ配下のスプレットシートファイル名を検索してファイルＩＤを取得
   * 
   * @param {string} id - フォルダＩＤ
   * @param {string} fileName - ファイル名
   * @return {string} id - ファイルＩＤ
   */
  findSpreadsheetByName(id, fileName) {
    var folder = DriveApp.getFolderById(id);
    var files = folder.getFilesByName(fileName);
    while (files.hasNext()) {
      var file = files.next();
      // スプレットシートの場合
      if ('application/vnd.google-apps.spreadsheet' == file.getMimeType()) {
        return file.getId();
      }
    }
    return null;
  }
  
  /**
   * 指定シート名称の指定セルの値を取得
   *
   * @param {string} sheetName - シート名称
   * @param {string} range - 範囲
   * @return {string} 文字列
   */  
  getValueFromSheet(sheetName, range) {
    this.sheet = this.spread.getSheetByName(sheetName);
    this.range = this.sheet.getRange(range);
	return this.range.getValue();
  }
  
  /**
   * 指定シート名称のデータが存在する範囲の値を２次元配列で取得
   *
   * @param {string} sheetName - シート名称
   * @return {array} ２次元配列
   */  
  getDataValueFromSheet(sheetName, convertDate = true) {
    this.sheet = this.spread.getSheetByName(sheetName);
    var values = this.sheet.getDataRange().getValues();
    if (convertDate) values = this.formatAllDate(values);
    return values;
  }
  
  /**
   * 指定シート名称のデータが存在する範囲の値を連想配列で取得
   *
   * @param {string} sheetName - シート名称
   * @return {array} 連想配列
   */  
  getHashValueFromSheet(sheetName, convertDate = true) {
    var values = this.getDataValueFromSheet(sheetName, convertDate);
    return this.convertRowToObject(values);
  }
  
  /**
   * 指定シート名称のA1セルに指定の２次元配列を設定
   * 
   * @param {string} sheetName - シート名称
   * @param {array} values - ２次元配列
   * @return Range - this range, for chaining
   */
  setDataValueToSheet(sheetName, values) {
    this.sheet = this.spread.getSheetByName(sheetName);
    var numRows = values.length;
    var numColumns = values[0].length;
    return this.sheet.getRange(1, 1, numRows, numColumns).setValues(values);
  }
  
  // end of Spread function.
  
  /**
   * 日付形式の変換
   * 
   * @param {array} values - ２次元配列
   * @param {string} timeZone - タイムゾーン（省略時：JST）
   * @param {string} format - 日付形式（省略時：yyyy/MM/dd）
   * @return Object[][] ２次元配列
   */
  formatAllDate(values, timeZone = 'JST', format = 'yyyy/MM/dd') {
    return values.map(function(row) {
      var array = [];
      row.map(function(column, index) {
        if (column instanceof Date) {
          column = Utilities.formatDate(column, timeZone, format);
        }
        array[index] = column;
      });
      return array;
    });
  }
  
  /**
   * ２次元配列を連想配列に変換
   *
   * ２次元配列
   *  [[ '項目１', '項目２', '項目３' ],
   *   [ '値１−１', '値２−１', '値３−１' ],
   *   [ '値１−２', '値２−２', '値３−２' ] ]
   * 連想配列
   *  [ { '項目１': '値１−１', '項目２': '値２−１', '項目３': '値３−１' },
   *    { '項目１': '値１−２', '項目２': '値２−２', '項目３': '値３−２' } ]
   * 
   * @param {array} values - ２次元配列
   * @return Object[] - 連想配列
   */
  convertRowToObject(values) {
    // １行目キー項目の取得
    var keys = values.splice(0, 1)[0];
    // 連想配列に変換
    return values.map(function(row) {
      var object = {};
      row.map(function(column, index) {
        object[keys[index]] = column;
      });
      return object;
    });
  }
}
