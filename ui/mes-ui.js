const MathUI = (function() {

  function init() {}

  function show() {}

  function hide() {}

  function update() {}

  return { init, show, hide }
}());


const mesui = document.querySelector("div[data-mesui-modal]");
mesui.addEventListener('click', (event) => {
  mesui.classList.toggle('off')
});
