const MathUI = (function() {

  let mesui, advanceContent, latexContent, latexSource, mathquilContent, easyContent, buttons, mathQuillField;

  const buttonHandlers = {

      easy (button) {
        button.classList.toggle('active');
        easyContent.classList.toggle('off');
        advanceContent.classList.toggle('off');
        latexSource = mathQuillField.latex();
        latexContent.innerHTML = latexSource;
      },

      advance (button) {
        button.classList.toggle('active');
        easyContent.classList.toggle('off');
        advanceContent.classList.toggle('off');
        mathQuillField.latex(latexContent.innerHTML);
      },

      help (button) {
        console.log('help', button);
      }
  };

  const navigationHandler = (event) => {
    event.stopPropagation();
    if (event.target.dataset && event.target.dataset.mesuiBtn && buttonHandlers[event.target.dataset.mesuiBtn]){
      buttons.forEach(button => button.classList.remove('active'));
      buttonHandlers[event.target.dataset.mesuiBtn](event.target);
    }
  }

  function init() {
    const MQ = MathQuill.getInterface(2);
    mesui = document.querySelector('div[data-mesui-modal]');
    mesui.addEventListener('click', navigationHandler);
    easyContent = mesui.querySelector('.mes-ui__advance')
    advanceContent = mesui.querySelector('.mes-ui__simple')
    latexContent = mesui.querySelector('.mes-ui__advance span')
    mathquilContent = mesui.querySelector('.mes-ui__math-quil')
    buttons = Array.from(mesui.querySelectorAll('button[data-mesui-btn]'));

    mathQuillField = MQ.MathField(mathquilContent, {
      handlers: {
        edit: function() {
          let enteredMath = mathQuillField.latex();
        },
        restrictMismatchedBrackets: true,
        spacesBehavesLikeTab: true
      }
    });
  }

  function show() {
    mesui.classList.remove('off');
    setTimeout(()=>{ document.body.addEventListener('click', hide); });
  }

  function hide() {
    mesui.classList.add('off');
    document.body.removeEventListener('click', hide);
  }

  function update() {}

  return { init, show, hide }
}());
