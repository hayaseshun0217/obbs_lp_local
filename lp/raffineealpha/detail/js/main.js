$(window).on("load",function(){$(window).scroll(function(){let o=!1;const e=$(".js-float__open"),t=$(".js-float__close");var n=$(window).scrollTop();const s=$(".fixed-cta");var l=$(window).height();for(i=0;e.length>i;i++)e.eq(i).offset().top<=n&&(o=!0);for(i=0;t.length>i;i++){var r=t.eq(i).offset().top;r-l<=n&&r+t.eq(i).innerHeight()>=n&&(o=!1)}s.removeClass("is-show"),s.addClass("js-float__none"),o&&(s.addClass("is-show"),s.removeClass("js-float__none"))}),jQuery(function(){jQuery('a[href^="#"]').click(function(){var o=jQuery(this).attr("href"),o=jQuery("#"==o||""==o?"html":o).offset().top;return jQuery("body,html").animate({scrollTop:o},350,"swing"),!1})})});