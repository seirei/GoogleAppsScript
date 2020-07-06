/**
 * メールクラス
 */
class Mail {
  /**
   * コンストラクタ
   *
   * @param {string} to - 送信アドレス
   */
  constructor(to) {
    this.to = to;
  }
  
  /**
   * メール送信
   *
   * @param {string} [subject="件名"] - 件名
   * @param {string} [body="本文"] - 本文
   * @param {array} [options={name: "名前"}] - オプション
   */  
  send(subject = "件名", body = "本文", options = {name: "名前"}) {
    GmailApp.sendEmail(this.to, subject, body, options);
  }
}
