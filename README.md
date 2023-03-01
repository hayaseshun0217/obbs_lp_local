# ディレクトリについて

- /lp以降のディレクトリ構造が、そのまま公開時のURLの表記と同じになる。
- /lp以下には、原則として公開用のソースやアセットのみを置く。コンパイル元となる開発用のejsや画像は、全て/resources内に置く。
- 下記のような構造。resources内で編集したものが/lpに反映される。
```
├── README.md -- 本ファイル
├── lp -- ここから下の階層がURLと同じになる。基本いじらない！
│  ├── allerknight
│  ├── epagold
│  ├── kencos
│  ├── nst
│  └── raffineealpha
└── resources -- 作業用フォルダ。ディレクトリを変更したい場合は要相談。
    ├── allerknight
    ├── common
    ├── epagold
    ├── kencos
    ├── nst
    └── raffineealpha
```

## 商品ごとの編集ファイル
- 全商品共通ファイル
```
└── common
    ├── css
    ├── components
    │   └── _example.ejs
    ├── img
    └── js
```
- 商品ごとファイル
```
├── epagold
│   ├── detail -- LPカテゴリ
│   │   ├── css -- minifyされる。
│   │   ├── golp -- HTMLにコンパイルされる。
│   │   │   ├── basic
│   │   │   │   └── index.ejs
│   │   │   ├── basic_c
│   │   │   ├── basic_f2
│   │   │   ├── basic_long
│   │   │   └── basic_ta
│   │   ├── yhlp
│   │   │   ├── basic
│   │   │   └── basic_long
│   │   ├── js
│   │   └── img -- minifyされる。
│   ├── tokucho
│   │   ├── css
│   │   ├── golp
│   │   ├── js
│   │   └── img
│   └── components -- 共通化パーツ。各index.ejs内で読み込む。
│       ├── detail -- LPカテゴリごとの共通化パーツ
│       ├── tokucho
│       └── common -- カテゴリ共通のパーツ
│           └── _header.ejs
├── raffineealpha -- alphaはLPカテゴリがない
│   ├── css
│   ├── vol6_2
│   ├── vol6_3
│   ├── vol6_4
│   ├── vol6_5
│   └── img
...
```

## ディレクトリ注意点
- 商品内で、全LPカテゴリで共通のアセットを使いたい場合、 img, js, css などのディレクトリを切る。commonなどは用意しない。
  - 例) /epagold/detail/, /epgold/tokucho/ で共通の画像を使いたい場合、/epagold/img/ 内に用意する。
  - ケンコスなどのGoogle Shoppingで下記背景があるため。
   - GoogleShoppngバナー用だったので別ディレクトリにしていた（Gitデプロイへ変更前からの仕様）
   - URLを変えてしまうと再入稿になる

# 作業時の注意点
## 新しいファイルやディレクトリを追加したいとき
- 共通化パーツはすべてアンダースコアを接頭につけてパーシャルファイルにする。 -> 本番ソースに吐き出されないようになる。
```
// 例：resources/common/components 内に全商品共通の定期情報を追加する
NG: common12_teiki_info.ejs
OK: _common12_teiki_info.ejs

// 例：resources/allerknight/kaiteki/components 内にアレルLP共通のSNSコンテンツを追加する
NG: sns.ejs
OK: _sns.ejs
```

## ファイル管理・コーディングルール
### LPカテゴリ
- allerknight/**kaiteki**や、kencos/**basic**の商品名の後ろの区分。
  - 基本的に、**カテゴリは大きく見た目が異なったり全く違うテーマのもので分ける。** それ以外はその下のverで分ける。
  - cssやimgのほとんどが同じで、更新のたびにすべて更新しなければならないのを防ぐため
- **他の商品や他のLPカテゴリ内のimgやjs,cssを読みに行かない。**
  - 更新時にどこまで影響を及ぼすかわからなくなるのを防ぐため。
  - 同じsrcを使いたい場合は、コピーして使用する商品やLPカテゴリ内に持ってくるか、commonフォルダに持っていく。

## 画像を追加・更新する
- /resources内の該当ディレクトリに追加・更新する。 -> /public/lp内に圧縮して書き出される。
  - 圧縮率はgulpfileで指定している。既に圧縮済みのものは、どんどん圧縮率は小さくなる。
- 圧縮のタイミング
  - 追加・名前更新で圧縮。置き換えに関しても圧縮かかる。

# 共通タグについて

## 共通タグの種類
- `commonRootPath`は全商品共通のパーツを読み込む用、`productRootPath`は商品ごとの共通パーツを読み込む用。
  - とはいえ「../」が１つ多いだけだが、どこの共通パーツをここで読み込んでいるかわかりやすくする意味でも使い分ける。
  - シングルクオートではなくバッククオートで囲うことに注意(shift + @ で出る)。
  ```
  // NG
    <%- include('${productRootPath}_header', {commonRootPath, productRootPath}) %>

  // OK
    <%- include(`${productRootPath}_header`, {commonRootPath, productRootPath}) %>
  ```

## 注意点
- **相対パス**で記載している点に注意
  - その読み込んでいるファイルの相対パスをファイルの最上部に定義しているので、異なるディレクトリで共通タグを読み込む場合は、その定義している階層を変更する必要がある。タグ自体は中身を変える必要はない。
  ```
    例)アルファとエパの階層の定義の違い -> アルファはLPカテゴリと媒体カテゴリがないので2階層上になる

    // エパ
    <% 
    const commonRootPath = '../../../../common/';
    const productRootPath = '../../';
    const commonComponentPath = `${commonRootPath}components/`;
    const productComponentPath = `${productRootPath}../components/`;
    %> 
    ~~~

    <%- include(`${productRootPath}_header`, {productRootPath, commonRootPath}) %>
    -> ファイルごとに階層を定義することで、この共通タグ自体はコピペで使える

    // アルファ
    <% 
    const commonRootPath = '../../common/';
    const productRootPath = '../';
    const commonComponentPath = `${commonRootPath}components/`;
    const productComponentPath = `${productRootPath}../components/`;
    %> 
    ~~~

    <%- include(`${productRootPath}_header`, {productRootPath, commonRootPath}) %>
  ```
- 共通タグの中身
  - 前半部分が読み込む共通パーツのあるパスを表す。
  ```
    <%- include(`${productRootPath}_header`, {productRootPath, commonRootPath}) %>
   
    -> `${productRootPath}_header` = '../header'
  ```
  - 後半の{}内がオプションとして、各共通化パーツに渡す引数を指定している。引数では、このタグの場合「今読み込んでるファイルの相対パスはこれだよー」という情報を渡している。
  ```
      
    <link rel="stylesheet" href="<%= productRootPath %>css/style.css" type="text/css" media="all">
    
    -> これが読み込む先で下記のように変換される。
    <link rel="stylesheet" href="../css/style.css" type="text/css" media="all">    
  ```
  - ちなみにオプションの引数は追加可能。動的に変更したい値がある場合は要相談。オプションの正式な書き方は下記。
  ```
  {productRootPath, commonRootPath}

   // 上記はこの表記の省略形。keyと値が同値だから省略できる。
    {
      productRootPath: productRootPath,
      commonRootPath: commonRootPath
    }
  ```

# ページの非表示対応について

## 「このページ非表示で！」と言われたら
下記の手順を踏む。
1. `/resources`内の該当verのディレクトリ名の頭にアンダースコアをつけパーシャルフォルダにする。
    ```
    例)https://www.orientalbio.co.jp/lp/epagold/tokucho/golp/ver2 を非表示にしたい場合
    
    resouces
      ├── tokucho
      │   ├── css
      │   ├── golp
      │   │   ├── ver1
      │   │   ├── _ver2 -> コンパイルの対象外になる
      │   │   ├── ver3
      ...
    ```
1. `/lp`内の該当ディレクトリをフォルダごと削除する。
    ```
    例)https://www.orientalbio.co.jp/lp/epagold/tokucho/golp/ver2 を非表示にしたい場合
    
    lp
      ├── tokucho
      │   ├── css
      │   ├── golp
      │   │   ├── ver1 -> ver2のフォルダごと削除
      │   │   ├── ver3
      ...
    ```
- 再表示の場合
上記の1.でパーシャルにしたフォルダ名をもとに戻し、通常通りコンパイルする。

# Gitデプロイの流れ

## ブランチ構成
- master -> wwww.orientalbio.co.jpと紐付いている本番用ブランチ。
- develop -> stg.orientalbio.co.jpと紐付いている検証用ブランチ。ここにpushすることを「テストアップ」と呼び、テストアップしたものを社内の確認用に共有する。
- 作業用ブランチ -> **編集時には、必ず作業用ブランチを切る。developまたはmasterを直接いじらない。**


# 開発環境について

## タスクランナー
- `gulp`を使用。利用するプラグインは主に下記。随時見直しや追加もアリ。
  - browser-sync
  - [gulp-ejs](https://github.com/mde/ejs)
  - [gulp-rename](https://www.npmjs.com/package/gulp-rename) -> .ejsを.htmlに変えている
  - [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css) -> cssファイルを圧縮、コメントを削除
  - [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) -> ベンダープレフィックスを付与。gulp-postcssの機能。
    - browserslistsを採用しているプラグイン。PostCSSのAutoprefixerとは別物。
    - `defaults: Browserslist’s default browsers (> 0.5%, last 2 versions, Firefox ESR, not dead).`
  - gulp-sourcemaps -> cssを圧縮した際検証時に何がなんだかわからなくなるため、sourcemapを表示
  - [gulp-changed](https://github.com/sindresorhus/gulp-changed#readme) -> img圧縮を、変更した差分があるファイルにのみ実行してくれる。

## 初回セットアップ
1. Node.jsのインストール
    - バージョンは14系統とする
    - 現在の有力な候補はv14.8.0
1. Node.jsがマシンにインストールされた状態で、ターミナル上で/obbs_lpへ移動し下記のコマンドでnpmを初期化、package.jsonが作られる
    ```
    npm init -y
    ```
1. 必要なプラグイン群をインストールする。
    ```
    npm install
    ```
1. gulpをグローバルインストールする(過去にPCで1度行っていれば不要)。
    ```
    npm i -G gulp gulp-cli
    ```
1. git pullしてgulpfileをルートディレクトリに置く。
1. package.jsonの`scripts` 欄にあるコマンドを、 `npm run` の後に続けて打つと実行できる。
    - 単純なコンパイルのみ -> npm run startで実行
    - リアルタイムモニター有り -> npm run serveで実行
    - 本番用ビルド(/resource 内にあるファイルのみで/lp 内を再構築する。不要なファイルが消える) -> npm run buildで実行
    ```
    "scripts": {
      "start": "gulp start",
      "serve": "gulp serve",
      "build": "gulp build"
    },
    ```

# Gitについて
- 作業時には**必ず**ブランチを切る。ブランチ名は`英字`のみで命名する。日本語使用不可。

## 基本ルール
` (feat/fix/hotfix)/#(issueNo)_作業内容` 
作業内容箇所は英語で
- feat
    - 新機能など新しく追加するissueを作業する場合
- fix
    - 現在の機能などを改修・修正するissueを作業する場合
- hotfix
    - 緊急で直接masterブランチへマージし、本番環境にアップする作業をする場合
    - 必ずmasterブランチから派生する
    - 完了後、必ずdevelopブランチにもマージする
### 例
新しくお知らせ機能を追加するという課題が来た場合（issueNo 13）
feat/#13_front_news
## コミット
コミットメッセージを書く際に `#issueNo` を入れる
### 例
#4000 ◯◯追加

## 作業の流れ
1. slackにて依頼の可否やスケジュール感等のすり合わせ
2. 依頼者よりGitHub上にてissueを起票
3. リモートとの差分をpull
4. 作業用ブランチを切る
5. 変更をpushし、プルリクを作成 -> developへmerge用
6. amplifyにて専用の環境が発行されるので、変更点を確認する
7. 変更点の確認後、merge(可能であればreviewerを設定)。検証用環境にアップされる。
8. リリース準備が完了したら、同じ流れでmasterにアップ。（なるべくまとめて更新することが望ましい）

# Stylelint について
- [Stylelint](https://stylelint.io/) とは、CSSの記述ルールに沿った記述になっているかのチェックを行ってくれるツール。ルールは自由にカスタマイズでき、カスタマイズ内容は `.stylelintrc.json` に書かれている。
- 極力ルール通りに記述することが望ましいが、例外があった場合は下記のようにコメントすることでチェックの対象外になる。
  ```
    #id { /* stylelint-disable-line */
      color: pink !important;
    }

    #hoge {
      color: pink !important; /* stylelint-disable-line declaration-no-important */
    }
  ```
## チェックの実行
- package.json に記載しているように、 `npm run lint:css` をターミナルで実行することでチェックが走る。
- **エディタの拡張機能に追加する。**
  - VSCodeなら [これ](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) など。
  - これによって自動でチェックしてくれる。
- `npm run fix:css` をターミナルで実行することで、かんたんな修正だけなら自動でFixしてくれる（1度やってみたらセミコロンの重複が消えたくらいだった）。
## チェック項目
- [これ](https://github.com/stylelint/stylelint-config-recommended/blob/main/index.js) の設定を元に、頻出のものには日本語訳をつけたりOFFでも構わないと判断したものはOFFにしている(2021/12/9現在)。
  - 上記の `rules` 内に設定されているものが基本的に入っている。
  - わからないルールやOFFにしたいなどカスタマイズしたいルールがあれば、上記の中からルール名をコピペして [こちら](https://stylelint.io/user-guide/rules/list) で検索する。
