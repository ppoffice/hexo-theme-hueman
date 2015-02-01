(function($){  
  //Highlight current nav item
  $('#main-nav > a').each(function(){
  	if($('.page-title-link').length > 0){
      if($(this).html() == $('.page-title-link').html()){
        $(this).addClass('current');
      } else if ($(this).attr('href') == $('.page-title-link').attr('data-url')){
        $(this).addClass('current');
      }
    }
  });
  $('.main-nav-list > li > a').each(function(){
    if($('.page-title-link').length > 0){
      if($(this).html() == $('.page-title-link').html()){
        $(this).addClass('current');
      } else if ($(this).attr('href') == $('.page-title-link').attr('data-url')){
        $(this).addClass('current');
      }
    }
  });
  //Fold second-level menu
  $('.main-nav-list-item').hover(
    function(){
      if($(window).width() < 480) return;
      $(this).children('.main-nav-list-child').slideDown('fast');
    },
    function(){
      if($(window).width() < 480) return;
      $(this).children('.main-nav-list-child').slideUp('fast');
    }
  );

  //Add second-level menu mark
  $('.main-nav-list-item').each(function(){
    if($(this).find('.main-nav-list-child').length > 0){
      $(this).addClass('top-level-menu');
    }
  });

  //Set thumbnail height
  function setThumbnailHeight(){
    var width = $('.article-summary .thumbnail').width();
    var height = 245 * width / 520;
    $('.article-summary .thumbnail').height(height);

  }
  setThumbnailHeight();
  $(window).resize(function() {
    setThumbnailHeight();
  });

  //Image scroll loading
  $('.main-body-content img').each(function() {
    $(this).attr('data-url', $(this).attr('src'));
    $(this).removeAttr('src');
    $(this).addClass('scrollLoading');
    $(this).wrap('<div class="img-wrap"></div>');
  });
  function setScrollLoading(){
    $('.scrollLoading').scrollLoading();
    $('.scrollLoading').each(function() {
        if($(this).complete) {
          $(this).unwrap();
        } else {
          $(this).on('load', function(){
            $(this).unwrap();
          });
        }
    });
  }
  setTimeout(setScrollLoading, 1000);
  //Article summary height fix
  for(var i = 0; i <= $('.article-summary').length / 2; i++){
    if($('.article-summary').eq(i*2).height() > $('.article-summary').eq(i*2+1).height()){
      $('.article-summary').eq(i*2+1).height($('.article-summary').eq(i*2).height());
    } else {
      $('.article-summary').eq(i*2).height($('.article-summary').eq(i*2+1).height());
    }
  }
})(jQuery);