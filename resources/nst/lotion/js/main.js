'use strict';

// smooth scroll
$(window).on('load', function() {
  var ahash = location.hash;
  var gotoNum = $(ahash).offset().top;
  $('html,body').animate({ scrollTop: gotoNum }, 'slow');
  return false;
});

// Q&A アコーディオントグルボタン
$(function(){
  $('.faq_acc_btn').click(function() {
    $(this).parent().find('.inner').slideToggle();
    $(this).toggleClass('open');
  });
});
