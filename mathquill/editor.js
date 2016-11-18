$(function() {
  var MQ = MathQuill.getInterface(2);

  var editorSpan = document.getElementById('editor');

  var answerMathField = MQ.MathField(editorSpan, {
    handlers: {
      edit: function() {
        var enteredMath = answerMathField.latex(); // Get entered math in LaTeX format
        checkAnswer(enteredMath);
      },
      restrictMismatchedBrackets: true,
      spacesBehavesLikeTab: true
    }
  });

  $("#to_editor").click(function(e) {
    var source = $("#source").html();
    answerMathField.latex(source);
  });

  $("#to_source").click(function(e) {
    var sourceLatex = answerMathField.latex();
    $("#source").html(sourceLatex);
  });
});
