class CanvasToolbar extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = html`
          <style>
            
          </style>



          <a id="btn_save" class="btn br__r"><img src="res/save.png" /></a>
          <div id="btn_pointer" class="btn active"><img src="res/pointer.png" /></div>
          <div id="btn_rect" class="btn "><img src="res/rect.png" /></div>
      <div id="btn_circle" class="btn br__r"><img src="res/circle.png" /></div>
        `;
  }
}

window.customElements.define('canvas-toolbar', CanvasToolbar);