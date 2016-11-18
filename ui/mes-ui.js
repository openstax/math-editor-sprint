const MathUI = (function(Render, $) {

  let mesui, advanceContent, latexContent, latexSource, mathquilContent, easyContent, buttons, mathQuillField;

  const buttonHandlers = {

      easy (button) {
        button.classList.toggle('active');
        easyContent.classList.toggle('off');
        advanceContent.classList.toggle('off');
        mathQuillField.latex(latexContent.innerHTML);
      },

      advance (button) {
        button.classList.toggle('active');
        easyContent.classList.toggle('off');
        advanceContent.classList.toggle('off');
        latexContent.innerHTML = mathQuillField.latex();
        Render.update();
      },

      help (button) {
        console.log('help', button);
      }
  };

  function createElement (on) {
    let span = document.createElement('span');
    span.classList.add('mes-ui__output');
    span.style.visibility = on ? 'visiblle' : 'hidden';
    return span;
  }

  const navigationHandler = (event) => {
    event.stopPropagation();
    if (event.target.dataset && event.target.dataset.mesuiBtn && buttonHandlers[event.target.dataset.mesuiBtn]){
      buttons.forEach(button => button.classList.remove('active'));
      buttonHandlers[event.target.dataset.mesuiBtn](event.target);
    }
  }

  const updateLatexPreview = (event) => {
    Render.update();
  }

  const updateQuillPreview = (event) => {
    latexContent.innerHTML = mathQuillField.latex();
    Render.update();
  }

  function init(output) {
    const MQ = MathQuill.getInterface(2);
    mesui = document.querySelector('div[data-mesui-modal]');
    mesui.addEventListener('click', navigationHandler);
    buttons = Array.from(mesui.querySelectorAll('button[data-mesui-btn]'));

    easyContent = mesui.querySelector('.mes-ui__advance');
    advanceContent = mesui.querySelector('.mes-ui__simple');
    latexContent = mesui.querySelector('.mes-ui__latex');

    mathquilContent = mesui.querySelector('.mes-ui__math-quil');

    latexContent.addEventListener('keyup', updateLatexPreview);
    latexContent.innerHTML = output.textContent;
    output.innerHTML = '';

    // Setup Live preview.
    preview = createElement(true);
    buffer = createElement(false);
    output.appendChild(buffer);
    output.appendChild(preview);

    // Inistialize Render.
    Render.setup({ input: latexContent, preview, buffer });
    // Cache a callback to the CreateRender action.
    Render.callback = MathJax.Callback(["display", Render]);
    // Make sure it can run more than once.
    Render.callback.autoReset = true;
    // Add initaila content.
    Render.update();

    mathQuillField = MQ.MathField(mathquilContent, {
      handlers: {
        edit: updateQuillPreview,
        restrictMismatchedBrackets: true,
        spacesBehavesLikeTab: true
      }
    });

    // Set initial content.
    mathQuillField.latex(latexContent.innerHTML);
    output.textConten = '';


  }

  function show() {
    mesui.classList.remove('off');
    setTimeout(()=>{ document.body.addEventListener('click', hide); });
  }

  function hide() {
    mesui.classList.add('off');
    document.body.removeEventListener('click', hide);
  }


  return { init, show, hide }
}(Render, $));
