
class LayerList extends HTMLElement {
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
                position: absolute;
                top: 25%;
                width: 12%;
                height: 500px;
                background-color: #ffffff;
                border-top-right-radius: 10px;
                border-bottom-right-radius: 10px;

                //filter: drop-shadow(0px 0px 5px #0000004d);

                display: flex;
                flex-direction: column;
            }

            .layer-item {
                font-size: 140%;
                border-bottom: 2px solid #edeff3;
                background-color: #ffffff;
                border-top-right-radius: 10px;

                padding: 10px;
            }

            .active {
                background-color: #b8b7b7;
            }

            </style>
  
            
            
            <div class="layer-item active">Rect 1</div>
            <div class="layer-item">Rect 2</div>
            

          `;

    }

    addItem(id, name) {

    }


}

window.customElements.define('layer-list', LayerList);


/*<div class="container">
    <input id="tb_positionX" type="text" class="textbox text" />
    <div class="label text">X</div>
</div>*/
