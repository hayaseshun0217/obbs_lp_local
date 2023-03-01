"use strict";
// smoothscroll
$(function () {
  const speed = 400;
  const timing = "ease";
  $('a[href^="#"]').click(function () {
    let target = $(this).attr("href");
    let targetArea = $(target).offset().top;
    $("html, body").animate(
      {
        scrollTop: targetArea,
      },
      speed
    );
    return false;
  });
});

// タップしてURLをコピー
new ClipboardJS(".js-copy");

// tooltip
{
  const copyItems = document.querySelectorAll(".js-copy");
  const tooltip = document.querySelectorAll(".tooltip");

  if (copyItems) {
    copyItems.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        tooltip[index].classList.add("clicked");
        setTimeout(() => {
          tooltip[index].classList.remove("clicked");
        }, 1000);
        e.preventDefault();
      });
    });
  }
}

// nav_sp
{
  const nav = document.getElementById("js-nav");
  const menu = document.getElementById("js-menu");

  if (nav) {
    nav.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }
}

// 1P目固定バナーfadeIn
$(function () {
  const $fixedBanner = $("#fixed_banner");
  const target = $("#js-fadeIn").offset().top;
  let scrollTop;

  $(window).scroll(function (e) {
    scrollTop = $(window).scrollTop();

    if (scrollTop >= target) {
      $fixedBanner.removeClass("is-hidden");
    }
  });
});
