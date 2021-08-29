## API

* /private 認証なし
* /login 認証なし。Token発行
* /private 認証ありのページ

## 説明

* node.jsで作られたAPI。
* 認証OKならTokenを発行し、レスポンスのCookieにHttpOnlyで保存。

## 利用方法

```bash
git clone

npm install
node index.js
```

## 参考

異なるオリジンでCookieやAuthorization Headerを含む情報を共有する場合は、

* サーバ側のAccess-Control-Allow-Originで*はNG
* サーバ側のAccess-Control-Allow-Credentialsをtrueに設定
* クライアン側でwithCredentialsの設定をいじる（fetchの場合はcredentials:"include"とする）