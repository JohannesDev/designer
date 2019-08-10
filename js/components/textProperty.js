
class TextProperty extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = /*html*/`
            <style>
            .container {
                position: relative;
                width: 100%;
            }

            .textbox {
                background-color: #ffffff;

                text-align: left;

                border: 1px solid #666666;
                border-radius: 4px;

                padding-left: 5px;
                padding-right: 5px;

                padding-top: 10px;
                padding-bottom: 10px;
            }

            .label {
                color: #666666;
                font-size: 80%;

                position: absolute;
                top: 50%;
                -webkit-transform: translateY(-50%);
                transform: translateY(-50%);
                right: 10px;
            }
            </style>
  
            
            <div class="container">
                <input id="tb_positionX" type="text" class="textbox text" />
                <div class="label text">X</div>
            </div>
  
          `;


        this._emitEvent = (target) => {
            let textEvent = new CustomEvent('text_porp', { detail: target });
            this.dispatchEvent(textEvent);
        }
    }
}

window.customElements.define('text-property', TextProperty);


/*<div class="container">
    <input id="tb_positionX" type="text" class="textbox text" />
    <div class="label text">X</div>
</div>*/
