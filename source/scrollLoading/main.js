(function($){

  // Image scroll loading
  $('.main-body-content img').each(function() {
    $(this).attr('data-url', $(this).attr('src'));
    $(this).removeAttr('src');
    $(this).addClass('scrollLoading');
    $(this).wrap('<div class="scrollLoading-wrap"></div>');
  });

  var imgCount,
      timer = setInterval(function () {
        if(imgCount <= 0)
          clearInterval(timer);
        isLoaded();
      }, 500);

  var isLoaded = function () {
    $('.scrollLoading').each(function (i, img) {
      if($(this).height() > 0 && $(this).parents('.scrollLoading-wrap').length)
        $(this).unwrap();
    });
    imgCount = $('.scrollLoading-wrap').length;
  }

  $('.scrollLoading').scrollLoading();

})(jQuery);