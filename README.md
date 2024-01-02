# アプリ概要
コレクション（単語帳）を作成し、単語とその意味を登録できる。
単語の登録は自分で定義するか、検索画面で検索した結果を登録できる。

活用例
- 読書時の分からない単語メモに。
 - 本ごとにコレクションを作成し、分からない単語を検索して登録していく。後で一覧で見直すことができる。

# 利用技術
- next.js(フロントエンドフレームワーク)
- recoil(状態管理ライブラリ)
- cheerio(スクレイピング)
- cors anywhere(cors対策)
- render.com(cors anywhereサーバのホスティング)
- github pages(本アプリのホスティング)

# 行き詰まったポイント
## recoilを永続化させる
recoil-persistというlocalstorageを使うためのライブラリがあるが、これを使うと以下のようなエラーが起きた。
```
Error: Hydration failed because the initial UI does not match what was rendered on the server
```
以下の記事を参考に解決した。(localstorageを使わず手動で実装した。hookを作成した。)
https://techblg.app/articles/how-to-persist-data-on-recoli/
> atomのuseRecoilStateを直接提供せずに、custom hooksを使ってdomがmountされた後に、recoilの値を参照するようにしないといけません。

## cors anywhere
cors対策としてcors anywhereを導入した。
開発中は https://cors-anywhere.herokuapp.com/ を使えば一時的にcorsをすり抜けられるが、デプロイ後に実際に利用するときは自前でcors anywhereをホスティングする必要があった。なので、renderを用いた。

renderは15分リクエストがないとサーバが停止してしまうため、 https://uptimerobot.com/ で定期的にリクエストを送ることでスリープを防止した。