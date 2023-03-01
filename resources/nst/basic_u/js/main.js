'use strict';
// button_link
$(window).on('load', function() {
    var ahash = location.hash;
    var gotoNum = $(ahash).offset().top;
    $('html,body').animate({ scrollTop: gotoNum }, 'slow');
    return false;
});

// more_accordion
$(function() {
  $('.more_button').click(function() {
    $(this).siblings('.more_content').slideToggle();
    $(this).parent('.more').toggleClass('open');
  });
});

// faq_accordion
$(function() {
  $('.faq_acc_btn').click(function(){
    $(this).parent().find('.inner').slideToggle();
    $(this).toggleClass('open');
  });
});
