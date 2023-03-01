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
  $('.faq_acc1 .faq_acc_btn').click(function(){
    $('.faq_acc1 .inner').slideToggle();
    $('.faq_acc1 .faq_acc_btn').toggleClass('open');
  });
  $('.faq_acc2 .faq_acc_btn').click(function(){
    $('.faq_acc2 .inner').slideToggle();
    $('.faq_acc2 .faq_acc_btn').toggleClass('open');
  });
  $('.faq_acc3 .faq_acc_btn').click(function(){
    $('.faq_acc3 .inner').slideToggle();
    $('.faq_acc3 .faq_acc_btn').toggleClass('open');
  });
  $('.faq_acc4 .faq_acc_btn').click(function(){
    $('.faq_acc4 .inner').slideToggle();
    $('.faq_acc4 .faq_acc_btn').toggleClass('open');
  });
  $('.faq_acc5 .faq_acc_btn').click(function(){
    $('.faq_acc5 .inner').slideToggle();
    $('.faq_acc5 .faq_acc_btn').toggleClass('open');
  });
  $('.faq_acc6 .faq_acc_btn').click(function(){
    $('.faq_acc6 .inner').slideToggle();
    $('.faq_acc6 .faq_acc_btn').toggleClass('open');
  });
});
