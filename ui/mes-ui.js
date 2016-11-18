const MathUI = (function() {

  let mesui, advanceContent, easyContent, buttons;

  const buttonHandlers = {

      easy (button) {
        button.classList.toggle('active');
        easyContent.classList.toggle('off');
        advanceContent.classList.toggle('off');
      },

      advance (button) {
        button.classList.toggle('active');
        easyContent.classList.toggle('off');
        advanceContent.classList.toggle('off');
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
    mesui = document.querySelector('div[data-mesui-modal]');
    mesui.addEventListener('click', navigationHandler);
    easyContent = mesui.querySelector('.mes-ui__advance')
    advanceContent = mesui.querySelector('.mes-ui__simple')
    buttons = Array.from(mesui.querySelectorAll('button[data-mesui-btn]'));
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
