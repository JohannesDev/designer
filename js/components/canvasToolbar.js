
class CanvasToolbar extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = /*html*/`
          <style>
            img {
              width:25px;
              height: 25px;
            }
            .btn {
              width: 45px;
              height: 45px;

              margin-right: 10px;
              margin-left: 10px;

              display: flex;
              align-items: center;
              justify-content: center;
            }
            .active {
              background-color: #edf4f6;
              border-radius: 8px;
            }
            .br__r{
              border-right: 1px solid #EDEFF3;
            }
          </style>

          <a id="btn_save" class="btn br__r"><img src="res/save.png" /></a>
          <div id="btn_pointer" class="btn active"><img src="res/pointer.png" /></div>
          <div id="btn_rect" class="btn "><img src="res/rect.png" /></div>
          <div id="btn_circle" class="btn br__r"><img src="res/circle.png" /></div>
          

        `;

    this.$ = (selector) => {
      return this.shadowRoot.getElementById(selector.substring(1));
    };

    this._previousTarget = this.$('#btn_pointer')


    this.shadowRoot.addEventListener('click', (event) => {

      if (event.target === this.$('#btn_pointer') || event.target === this.$('#btn_rect') || event.target === this.$('#btn_circle')) {
        this._setActive(event.target)
        this._emitEvent(event.target)
      }

      else if (event.target.parentElement === this.$('#btn_pointer') || event.target.parentElement === this.$('#btn_rect') || event.target.parentElement === this.$('#btn_circle')) {
        this._setActive(event.target.parentElement)
        this._emitEvent(event.target.parentElement)
      }

    })

    this._setActive = (target) => {
      this._previousTarget.classList.remove('active')
      target.classList.add('active')
      this._previousTarget = target
    }

    this._emitEvent = (target) => {
      let buttonEvent = new CustomEvent('button_clicked', { detail: target });
      this.dispatchEvent(buttonEvent);
    }
  }


  getButtonById(id) {
    return this.shadowRoot.getElementById(id)
  }

  clickPointer() {
    this._setActive(this.$('#btn_pointer'))
    this._emitEvent(this.$('#btn_pointer'))
  }
}

window.customElements.define('canvas-toolbar', CanvasToolbar);



