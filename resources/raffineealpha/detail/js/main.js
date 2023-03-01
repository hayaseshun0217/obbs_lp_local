/*　floatバナーだし分け */
//jqery使用

$(window).on("load", function () {
  /*　floatバナーだし分け */
  $(window).scroll(function () {
    let flagArea = false;
    const jsOpenCta = $(".js-float__open");
    const jsCloseCta = $(".js-float__close");

    let scroll = $(window).scrollTop();
    const ctaBtn = $(".fixed-cta");
    const windowsHeight = $(window).height();
    
    for (i = 0; jsOpenCta.length > i; i++) {
      let openContents = jsOpenCta.eq(i).offset().top;
      if (openContents <= scroll) {
        flagArea = true;
      }
    }
    for (i = 0; jsCloseCta.length > i; i++) {
      let closeContents = jsCloseCta.eq(i).offset().top;
      if (
        closeContents - windowsHeight <= scroll &&
        closeContents + jsCloseCta.eq(i).innerHeight() >= scroll
      ) {
        flagArea = false;
      }
    }

    ctaBtn.removeClass("is-show");
    ctaBtn.addClass("js-float__none");
    if (flagArea) {
      ctaBtn.addClass("is-show");
      ctaBtn.removeClass("js-float__none");
    }
  });

  jQuery(function () {
    // #で始まるアンカーをクリックした場合に処理
    jQuery('a[href^="#"]').click(function () {
      // スクロールの速度
      var speed = 350; // ミリ秒
      // アンカーの値取得
      var href = jQuery(this).attr("href");
      // 移動先を取得
      var target = jQuery(href == "#" || href == "" ? "html" : href);
      // 移動先を数値で取得
      var position = target.offset().top;
      // スムーズスクロール
      jQuery("body,html").animate({ scrollTop: position }, speed, "swing");
      return false;
    });
  });
});
