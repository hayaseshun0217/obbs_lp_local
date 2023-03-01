// トグルボタン開閉
$(function () {
  $(".toggle_btn").click(function () {
    $(this).toggleClass("selected");
    $($(this).parent().attr("data-content")).slideToggle();
  });
});


// smooth scroll
$("a[href^='#']").click(function () {
  var speed = 700;
  var href = $(this).attr("href");
  if (href == '#') {
    return false;
  }
  var target = $(href == "#" || href == "" ? 'html' : href);
  var position = target.offset().top;
  if (target != '#top') {
    position -= 60;
  }
  $('body,html').animate({
    scrollTop: position
  }, speed, 'swing');
  return false;
});

// 固定バナー表示切り替え
class FixedBannerObserver {
  constructor() {
    this.options = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    },
    this.observer = new IntersectionObserver(this.callback, this.options),
    this.targets = document.querySelectorAll('.js-hidden-banner')
  }

  callback(entries) {
    const banner = document.querySelector('.fixed-cta');
    for (const entry of entries) {
      // 読み込み時にもコールバックが呼ばれてしまうので動作しないようにする
      if (window.pageYOffset < 20) return;

      entry.isIntersecting
        ? banner.classList.remove('is-show')
        : banner.classList.add('is-show');
    }
  }

  observe() {
    for (const target of this.targets) {
      this.observer.observe(target);
    }
  }
}

const fixedBannerObserver = new FixedBannerObserver();
fixedBannerObserver.observe();
