
class ValueSlider extends HTMLElement {
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
                width: 100%;

                display: flex;
                align-items: center;

                margin-top: 20px;
            }

            .margin{
                margin-left: 10px;
                margin-right: 10px;
            }

            #textbox {
                width: 60px;
                background-color: #ffffff;
                color: #1b2440;

                text-align: center;

                border: 1px solid #d7d9e1;
                border-radius: 4px;

                padding-left: 10px;
                padding-right: 10px;

                padding-top: 10px;
                padding-bottom: 10px;

            }

            img {
                min-width: 30px;
                height: 30px;
            }

            .slider {
                -webkit-appearance: none;
                appearance: none;

                width: 100%;
                height: 5px;
                background: #d3d3d3;
                border-radius: 20px;
                outline: none;
            }

            input[type="range"]::-moz-range-progress {
                background-color: #516fec;
            }

            .slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;

                width: 10px;
                height: 10px;
                background: #4caf50;
            }

            .slider::-moz-range-thumb {
                width: 15px;
                height: 15px;
                outline: none;
                border-radius: 50%;
                background: #ffffff;
            }

            </style>
  
            
            
            <img class="margin" src="res/cornerRadius.png" />
            <input type="range" min="0" max="100" value="5" class="slider margin" id="slider">
            <input id="textbox" type="text" class="text margin" />
            
            

          `;


        this.shadowRoot.addEventListener('input', (event) => {
            this._emitEvent(event.target.value);
        })


        this._emitEvent = (value) => {
            let myEvent = new CustomEvent('corner_radius_changed', { detail: value });
            this.dispatchEvent(myEvent);
        }
    }


    setValue(value) {
        this.shadowRoot.getElementById('textbox').value = value
        this.shadowRoot.getElementById('slider').value = value
    }
}

window.customElements.define('value-slider', ValueSlider);