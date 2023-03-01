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

//USER’S VOICE：アコーディオン
$(function () {
  $('.voice_box .users_voice_02').hide();
  $('.voice_box .more_btn').click(function () {
    $(this).parent().parent().toggleClass('is_show');
    $(this).prev('.users_voice_02').slideToggle('slow');
    $(this).prevAll('.users_voice_02').children('img').toggleClass('round_style');
    $(this).prevAll('.users_voice_01').children('img').toggleClass('round_style');
    $(this).prevAll('.users_voice_01').children('img').toggleClass('both_sides_style');

    /* 開く・閉じるボタン表示判定 */
    if ($(this).children('.close').css('display') == 'none') {
      //開くボタン表示、閉じるボタン非表示中の場合
      $(this).children('.close').show(); //閉じるボタン表示
      $(this).children('.more').hide(); //開くボタン非表示
    } else {
      //開くボタン非表示、閉じるボタン表示中の場合
      $(this).children('.close').hide(); //閉じるボタン非表示
      $(this).children('.more').show(); //開くボタン表示
    }
  });
});
