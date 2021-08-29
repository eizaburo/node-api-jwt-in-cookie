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