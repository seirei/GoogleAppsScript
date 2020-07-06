function test1() {
  var mail = new Mail("メールアドレス");
  mail.send('ここに件名', 'ここには本文');
}

function test2() { 
  var ss = new SpreadSheet("ＩＤ");
  console.log(ss.getValueFromSheet("シート1", "A1"));
}

function test3() {
  var ss = new SpreadSheet("ＩＤ");
  var array1 = ss.getDataValueFromSheet("シート1");
  for (var i = 0; i < array1.length; i++) {
    for (var j = 0; j < array1[i].length; j++) {
      console.log(`i:${i} j:${j} = ` + array1[i][j]);
    }
  }
}

function test4() {
  var ss = new SpreadSheet("ＩＤ");
  var array2 = ss.getHashValueFromSheet("シート1");
  for (var i = 0; i < array2.length; i++) {
    console.log(array2[i]['日付']);
  }
}

function test5() {
  var ss = new SpreadSheet("ＩＤ");
  var array = ss.getDataValueFromSheet("シート1");
  ss.setDataValueToSheet("シート2", array);
}

function test6() {
  var ss1 = new SpreadSheet("ＩＤ");
  var ss2 = new SpreadSheet("ＩＤ", "テスト２");
  var array = ss1.getDataValueFromSheet("シート1");
  ss2.setDataValueToSheet("シート1", array);
}

function test7() {
  var driveExt = new DriveExt();
  var folder = DriveApp.getFolderById("ＩＤ");
  var files = folder.getFiles();
  while(files.hasNext()) {
    var next = files.next();
    var xlsx = driveExt.exportAsExcel("ＩＤ", next.getId());
    console.log(xlsx.getId());
  }
}

function test8() {
  var driveExt = new DriveExt();
  driveExt.deleteFilesInFolder("ＩＤ");
}