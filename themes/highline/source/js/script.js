(function(JC, $) {
  document.addEventListener('DOMContentLoaded', function(e) {
    setTimeout(function() {      
      // apply this css here so
      // the page has time to set
      // the layout before fixing
      // the header
      $('.header').addClass('is-ready');
      $('.header__space').addClass('is-ready');
    }, 100);

    if (JC.HomeAnimations) {
      var homeAnimations = new JC.HomeAnimations();
      homeAnimations.init();
    }

    $('.js-menu-trigger').on('click', function(e) {
      e.preventDefault();
      $(this).toggleClass('is-active');
      $('.js-main-nav').toggleClass('is-active');
    });
  });
})(JC, jQuery, undefined);
