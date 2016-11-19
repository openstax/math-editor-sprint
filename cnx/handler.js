;(function ($) {
  window.InitOmarHack = function () {
    console.log('I am here!', new Date());

    // TODO: Handle more than one equation.
    var $equation = $('.equation:eq(0)');

    var firstTime = false;
    $('.equation-contents').hide();

    var inputTeX = 'y = a + b * c^2';  // TODO: Get the latex

    if (!$equation.find('div.eq').length) {
      $equation.prepend($(
        '<div id="eq">' + inputTeX + '</div> '
        + '<button>save</button>'
      ));
      firstTime = true;
    }

    var $save = $equation.find('button');
    var eq = document.getElementById('eq');

    if (firstTime) {
      MathUI.init(eq);
      eq.onclick = function (e) {
        e.stopPropagation();
        MathUI.show();
      }

      $save.on('click', function (e) {
        e.stopPropagation();
      });
    }


    $equation.off('click');
    $equation.on('click', function(e) {
      e.stopPropagation();
    });
  };

  if (!window.OmarInitiHackIsActive) {
    window.OmarInitiHackIsActive = true;

    jQuery.getScript('http://localhost:8000/bower_components/jQuery/jquery.min.js', function () {
      jQuery.getScript('http://localhost:8000/ui/mathquill.min.js', function () {
        jQuery.getScript('http://localhost:8000/ui/render.js', function () {
          $('body').append(
            ' <div data-mesui-modal="m1" class="mes-ui off" data-tip="left"> '
              + ' <div class="mes-ui__tabs"> '
                + ' <button data-mesui-btn="easy" class="mes-ui__tab active">Easy</button> / <button data-mesui-btn="advance" class="mes-ui__tab">Advance</button> '
              + ' </div> '
              + ' <div class="mes-ui__simple"> '
                + ' <div class="mes-ui__math-quil"> '
                + ' </div> '
                + ' <div class="mes-ui__help"> '
                  + ' <button data-mesui-btn="help" class="mes-ui__tab">Help</button> '
                + ' </div> '
              + ' </div> '
              + ' <div class="mes-ui__advance off"> '
                + ' <span class="mes-ui__latex" contenteditable="true"></span> '
              + ' </div> '
            + ' </div> '
          );

          jQuery.getScript('http://localhost:8000/ui/mes-ui.js', function () {
            window.OmarRendererReady = true;
            InitOmarHack();
          });
        });
      });
    });
  }

  ;;

  if (window.OmarRendererReady) {
    InitOmarHack();
  }

}(jQuery));
