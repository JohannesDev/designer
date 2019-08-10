
class TextProperty extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = /*html*/`
            <style>
            * {
                    box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    -webkit-box-sizing: border-box;

            }
            :host{
                position: relative;
            }

            #textbox {
                width: 100%;
                background-color: #ffffff;
                color: #1b2440;

                text-align: left;

                border: 1px solid #d7d9e1;
                border-radius: 4px;

                padding-left: 15px;
                padding-right: 45px;

                padding-top: 10px;
                padding-bottom: 10px;
            }

            #label {
                color: #677787;
                font-size: 80%;

                position: absolute;
                top: 50%;
                -webkit-transform: translateY(-50%);
                transform: translateY(-50%);
                right: 10px;
            }

            </style>
  
            
            <input id="textbox" type="text" class="text" />
            <div id="label" class="text">X</div>
            

          `;





        this._emitEvent = (target) => {
            let textEvent = new CustomEvent('text_porp', { detail: target });
            this.dispatchEvent(textEvent);
        }
    }


    connectedCallback() {

        if (this.hasAttribute('text-label')) {
            let label = this.getAttribute('text-label');
            this.shadowRoot.getElementById('label').innerHTML = label;
        }

    }


    setValue(value) {
        this.shadowRoot.getElementById('textbox').value = value
    }
}

window.customElements.define('text-property', TextProperty);


/*<div class="container">
    <input id="tb_positionX" type="text" class="textbox text" />
    <div class="label text">X</div>
</div>*/
