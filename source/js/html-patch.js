(function($){
  // Remove extra main nav wrap
  $('.main-nav-list > li').unwrap();

  // Highlight current nav item
  $('#main-nav > li > .main-nav-list-link').each(function(){
  	if($('.page-title-link').length > 0){
      if($(this).html().toUpperCase() == $('.page-title-link').html().toUpperCase()){
        $(this).addClass('current');
      } else if ($(this).attr('href') == $('.page-title-link').attr('data-url')){
        $(this).addClass('current');
      }
    }
  });

  // Sidebar expend
  $('#sidebar .sidebar-toggle').click(function(){
    if($('#sidebar').hasClass('expend'))
      $('#sidebar').removeClass('expend');
    else
      $('#sidebar').addClass('expend');
  });

  // Auto hide main nav menus
  function autoHideMenus(){
    var max_width = $('.nav-container-inner').width() - 10;
    var main_nav_width = $('#main-nav').width();
    var sub_nav_width = $('#sub-nav').width();
    if(main_nav_width + sub_nav_width > max_width){
      // If more link not exists
      if($('.main-nav-more').length == 0){
        $('<li class="main-nav-list-item top-level-menu main-nav-more">\
          <a class="main-nav-list-link" href="javascript:;">More</a>\
          <ul class="main-nav-list-child">\
          </ul></li>').appendTo($('#main-nav'));
        // Bind hover event
        $('.main-nav-more').hover(
          function(){
            if($(window).width() < 480) return;
            $(this).children('.main-nav-list-child').slideDown('fast');
          },
          function(){
            if($(window).width() < 480) return;
            $(this).children('.main-nav-list-child').slideUp('fast');
          }
        );
      }
      var child_count = $('#main-nav').children().length;
      for(var i = child_count - 2; i >= 0; i--){
        var element = $('#main-nav').children().eq(i);
        if(main_nav_width + sub_nav_width > max_width){
          element.prependTo($('.main-nav-more > ul'));
          main_nav_width = $('#main-nav').width();
        }else{
          return;
        }
      }
    }
    // Nav bar is wide enough
    if($('.main-nav-more').length > 0){
      $('.main-nav-more > ul').children().appendTo($('#main-nav'));
      $('.main-nav-more').remove();
    }
  }
  autoHideMenus();

  // Fold second-level menu
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

  // Add second-level menu mark
  $('.main-nav-list-item').each(function(){
    if($(this).find('.main-nav-list-child').length > 0){
      $(this).addClass('top-level-menu');
    }
  });

  $(window).resize(function() {
    autoHideMenus();
  });

})(jQuery);