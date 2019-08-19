
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
                width: 100%;
                height: 100%px;
                background-color: #ffffff;


                display: flex;
                flex-direction: column;
            }

            .layer-item {
                font-size: 100%;
                border-bottom: 2px solid #edeff3;
                background-color: #ffffff;

                padding: 10px;
            }

            .active {
                background-color: #dddddd;
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
