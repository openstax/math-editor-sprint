;(function ($) {
  console.log('I am here!', new Date());

  window.JaxToML = {  // Make it global
      toMathML: function(jax, callback) {
          var mml;
          try {
              mml = jax.root.toMathML("");
          } catch (err) {
              if (!err.restart) {
                  throw err
              } // an actual error
              return MathJax.Callback.After([JaxToML.toMathML, jax, callback], err.restart);
          }
          MathJax.Callback(callback)(mml);
      },
      convert: function(AjaxText, callback) {
          var tempDiv = $('<div style="width:455px;height:450px:border-width:thick;border-style:double;"></div>').appendTo("body").html(AjaxText)[0];
          MathJax.Hub.Queue(["Typeset", MathJax.Hub, tempDiv]); //first place in Q
          MathJax.Hub.Queue(function() { //wait for a callback to be fired
              var jax = MathJax.Hub.getAllJax(tempDiv);
              for (var i = 0; i < jax.length; i++) {
                  JaxToML.toMathML(jax[i], function(mml) { //alert(jax[i].originalText + "\n\n=>\n\n"+ mml);
                      AjaxText = AjaxText.replace(jax[i].originalText, mml);
                  });
              }
              $(tempDiv).remove();
              AjaxText = AjaxText.replace(/\(/g, ""); //notice this escape character for ( - i.e it has to be \( , know why it is beacuse JS will treat ) or ( as end/begin of function as there are no quotes here.
              AjaxText = AjaxText.replace(/\)/g, ""); //notice this escape character for ) - i.e it has to be \)
              AjaxText = AjaxText.replace(/\\/g, "");
              callback(AjaxText);
          });
      }
  };

  JaxToML.convert('x=\\sqrt{y}', function (mml) {
    console.log(mml);
  });

  var $equations = $('.equation');
  $equations.off('click');

  $equations.on('click', function(e) {
    var $equation = $(this);
    var firstTime = false;

    if (!$equation.find('textarea').length) {
      $equation.prepend($(
        '<textarea /> <button>save</button> '
        + '<script type="math/tex"></script>'
      ));
      firstTime = true;
    }

    var $text = $equation.find('textarea');
    var $save = $equation.find('button');
    // var $mml = 

    if (firstTime) {
      $text.on('click', function (e) {
        e.stopPropagation();
      });

      $save.on('click', function (e) {
        e.stopPropagation();
      });
    }

    e.stopPropagation();
  });


}(jQuery));
