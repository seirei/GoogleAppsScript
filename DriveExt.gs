/**
 * ドライブクラス
 */
class DriveExt {

  /**
   * 指定ファイルＩＤ（スプレットシート）からExcel変換した結果をBlob形式で取得
   * 
   * @param {string} id - 指定ファイルＩＤ（スプレットシート）
   * @return {blob} blob - Excel変換した結果
   */
  getBlobAsExcel(id) {
    var file = Drive.Files.get(id);
    var url = file.exportLinks['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    var token = ScriptApp.getOAuthToken();
    var response = UrlFetchApp.fetch(url, {
      headers: {
        'Authorization': 'Bearer ' +  token
      }
    });
    return response.getBlob();
  }
  
  /**
   * 指定ファイルＩＤをExcel変換したファイルを指定フォルダＩＤに保存して、そのファイルＩＤを取得
   * 
   * @param {string} folderId - フォルダＩＤ
   * @param {string} fileId - ファイルＩＤ
   * @return {object} Excel変換したファイルオブジェクト
   */
  exportAsExcel(folderId, fileId) {
    var folder = DriveApp.getFolderById(folderId);
    var spread = SpreadsheetApp.openById(fileId);
    var blob = this.getBlobAsExcel(fileId);
    return folder.createFile(blob).setName(spread.getName() + ".xlsx");
  }

  /**
   * 指定フォルダＩＤ配下のすべてのファイルを完全に削除（復元不可）
   * 
   * @param {string} folderId - フォルダＩＤ
   */
  deleteFilesInFolder(folderId) {
    var folder = DriveApp.getFolderById(folderId);
    var files = folder.getFiles();
    while(files.hasNext()) {
      var next = files.next();
      var fileId = next.getId();
      Drive.Files.remove(fileId);
    }
  }
  
}