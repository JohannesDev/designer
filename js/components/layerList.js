
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
  
            
            <div id="layers">
            <div id="0" class="layer-item active">Rect 1</div>
            <div class="layer-item">Rect 2</div>
            
</div>
          `;

        this._previousSelection = null

    }

    updateObjectList(objectList) {
        const parent = this.shadowRoot.getElementById('layers');

        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }

        objectList.forEach(element => {
            let div = document.createElement('div')
            div.id = element.id
            div.innerHTML = element.name
            div.className = 'layer-item'

            div.addEventListener('click', (event) => {
                if (this._previousSelection != null) {
                    this._previousSelection.classList.remove('active')
                }
                event.target.classList.add('active')
                this._previousSelection = event.target
            })

            parent.appendChild(div)
        });



    }


}

window.customElements.define('layer-list', LayerList);


/*<div class="container">
    <input id="tb_positionX" type="text" class="textbox text" />
    <div class="label text">X</div>
</div>*/
