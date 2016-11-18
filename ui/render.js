const Render = {

  delay: undefined,   // delay after keystroke before updating.
  timeout: undefined, // store setTimout id.

  input: undefined,   // input sources.
  preview: undefined, // filled in by Init below.
  buffer: undefined,  // filled in by Init below.
  oldContent: undefined, // used to check if an update is needed.

  running: false,     // true when MathJax is processing.
  pending: false,     // true when a typeset has been queued.

  setup ({ input, preview, buffer, delay = 150 }) {
    this.delay = delay;
    this.input = input;
    this.buffer = buffer;
    this.preview = preview;
  },

  //
  //  Switch the buffer and preview, and display the right one.
  //  (We use visibility:hidden rather than display:none since
  //  the results of running MathJax are more accurate that way.)
  //
  swapBuffers () {
    let buffer = this.preview, preview = this.buffer;

    this.buffer = buffer;
    buffer.style.position = "absolute";
    buffer.style.visibility = "hidden";

    this.preview = preview;
    preview.style.position = "";
    preview.style.visibility = "";
  },

  update () {
    if (this.timeout) { clearTimeout(this.timeout) }
    this.timeout = setTimeout(this.callback, this.delay);
  },

  //
  //  Creates the preview and runs MathJax on it.
  //  If MathJax is already trying to render the code, return
  //  If the content hasn't changed, return
  //  Otherwise, indicate that MathJax is running, and start the
  //    typesetting.  After it is done, call RenderDone.
  //
  display () {
    this.timeout = null;
    if (this.pending) return;
    let content = this.input.textContent;
    if (content === this.oldContent) return;

    if (this.running) {
      this.pending = true;
      MathJax.Hub.Queue(["display", this]);
    } else {
      this.buffer.innerHTML = this.oldContent = (content.length > 0 ) ? '$' + content + '$' : '';
      this.running = true;
      MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.buffer ], ["finish", this] );
    }
  },

  //
  //  Indicate that MathJax is no longer running,
  //  and swap the buffers to show the results.
  //
  finish: function () {
    this.running = this.pending = false;
    this.swapBuffers();
  }
};
