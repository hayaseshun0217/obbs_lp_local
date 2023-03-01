$(window).load(function() {
    var ahash = location.hash;
    var gotoNum = $(ahash).offset().top;
    $('html,body').animate({ scrollTop: gotoNum }, 'slow');
    return false;
});
