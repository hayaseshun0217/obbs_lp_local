// gulpプラグインの読み込み
const { src, dest, watch, series, parallel, lastRun } = require("gulp");
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require('gulp-uglify');
const browserSync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
const changed = require('gulp-changed');
const del = require('del');

// パスを定義
const paths = {
  src: "./resources/**/",
  dest: "./lp",
  ejs: "*.ejs",
  img: "img/*",
  css: "*.css",
  js: "*.js",
  video: "video/*",
};

// clean
const clean = () => {
  return del([`${paths.dest}/`]);
}

// ejs
const htmlCompile = () => {
  return src([`${paths.src}${paths.ejs}`, `!${paths.src}_${paths.ejs}`, `!${paths.src}_*/${paths.ejs}`],{
      since: lastRun(htmlCompile)
    })
    .pipe(ejs({
      // LP全体で使いたい共通変数をここで定義する
      corporateURL: "https://www.orientalbio.jp/",
      frontURL: "https://www.orientalbio.co.jp/",
    }))
    .pipe(
      rename(function (path) {
        path.extname = ".html";
      })
    )
    .pipe(dest(paths.dest));
}

// css圧縮
const cssMinify = () => {
  return src(`${paths.src}/${paths.css}`, {
      since: lastRun(cssMinify)
    })
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(dest(paths.dest));
}

// video
const duplicateVideo = () => {
  return src(`${paths.src}${paths.video}*`, {
      since: lastRun(duplicateVideo)
    })
    .pipe(dest(paths.dest));
}

// js圧縮
const jsMinify = () => {
  return src(`${paths.src}${paths.js}`, {
      since: lastRun(jsMinify)
    })
    .pipe(uglify())
    .pipe(dest(paths.dest));
}

// image-min
const imgMinify = () => {
  return src(`${paths.src}${paths.img}*`, {
      since: lastRun(imgMinify)
    })
    .pipe(changed(paths.dest))
    .pipe(
      imagemin([
        pngquant({
          quality: [0.65, 0.8],
          speed: 1,
        }),
        mozjpeg({
          quality: 80,
        }),
        imagemin.gifsicle({
          interlaced: false,
        }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest(paths.dest));
}

// browsersync
const startAppServer = () => {
  browserSync.init({
    server: {
        baseDir: "./lp/",
        directory: true,
    },
    port: 3033,
    // 検証ブラウザを指定する場合は下記のように追記
    // browser: ["google chrome", "firefox"]
  });

  watch(`${paths.src}${paths.ejs}`, htmlCompile);
  watch(`${paths.src}${paths.img}`, imgMinify);
  watch(`${paths.src}${paths.css}`, cssMinify);
  watch(`${paths.src}${paths.js}`, jsMinify);
  watch(`${paths.src}${paths.video}`, duplicateVideo);

  watch(`${paths.src}*`).on("change", browserSync.reload);
}

exports.start = () => {
  watch(`${paths.src}${paths.ejs}`, htmlCompile);
  watch(`${paths.src}${paths.img}`, imgMinify);
  watch(`${paths.src}${paths.css}`, cssMinify);
  watch(`${paths.src}${paths.js}`, jsMinify);
  watch(`${paths.src}${paths.video}`, duplicateVideo);
};

exports.serve = () => {
  startAppServer();
};

// /lp ディレクトリ内の既存ファイルを一度全て削除し、全ファイルコンパイルし直す。本番用ビルド
exports.build = series(
  clean,
  parallel(htmlCompile, imgMinify, cssMinify, jsMinify, duplicateVideo)
);
