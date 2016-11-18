alert('I am here!');

;(function ($) {
  var $equations = $('.equation');
  $equations.unbind('click');

  $equations.click(function(e) {
    e.stopPropagation();
  });
}(jQuery));
