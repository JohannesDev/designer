//events
//let event = new Event('CanvasToolbar_ButtonClicked');



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

    let $ = (selector) => {
      return this.shadowRoot.getElementById(selector.substring(1));
    };

    let previousTarget = $('#btn_pointer')


    this.shadowRoot.addEventListener('click', (event) => {

      if (event.target === $('#btn_pointer') || event.target === $('#btn_rect') || event.target === $('#btn_circle')) {
        setActive(event.target)
        emitEvent(event.target)
      }

      else if (event.target.parentElement === $('#btn_pointer') || event.target.parentElement === $('#btn_rect') || event.target.parentElement === $('#btn_circle')) {
        setActive(event.target.parentElement)
        emitEvent(event.target.parentElement)
      }

    })

    let setActive = (target) => {
      previousTarget.classList.remove('active')
      target.classList.add('active')
      previousTarget = target
    }

    let emitEvent = (target) => {
      let buttonEvent = new CustomEvent('button_clicked', { detail: target });
      this.dispatchEvent(buttonEvent);
    }


  }
}

window.customElements.define('canvas-toolbar', CanvasToolbar);



