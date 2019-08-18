import { $ } from '../domHelper.js';
import { MODES } from './constants.js';
import { Rect } from './rect.js';


export class DrawingHelper {

    constructor() {
        this._canvas = document.getElementById('drawing');
        this._ctx = this._canvas.getContext('2d');

        this._objectList = []

        this._down = false;

        this._mode

        this._canvas.width = $('#window').clientWidth;
        this._canvas.height = $('#window').clientHeight - 4;


        //demo setup
        let rect = new Rect(10, 20, 100, 200, 1, '#FF0000')
        let rect2 = new Rect(100, 200, 200, 200, 20, '#0000FF')
        this._objectList.push(rect)
        this._objectList.push(rect2)
        this.redraw()



        document.addEventListener('mousedown', (event) => {

            // Canvas Clicked
            if (event.target === $('#drawing')) {

                // Drawing new object on canvas
                if (this._mode === MODES.DRAWING_READY) {
                    let rect = new Rect(event.layerX, event.layerY, 1, 1, 20, "#00AA00");
                    this._objectList.push(rect);
                    this._mode = MODES.DRAWING_STARTED

                }

            }

            this.redraw()

        })

        document.addEventListener('mousemove', (event) => {
            let mouseX = event.clientX - $('#window').offsetLeft
            let mouseY = event.clientY - $('#window').offsetTop

            //Draw new object
            if (this._mode === MODES.DRAWING_STARTED) {
                let rect = this._objectList[this._objectList.length - 1]

                rect.width = mouseX - rect.x;
                rect.height = mouseY - rect.y;
            }


            this.redraw()
        })

        document.addEventListener('mouseup', (event) => {
            this._down = false;

            if (this._mode === MODES.DRAWING_STARTED) {
                console.log("now");

                this._activeObject = this._objectList[this._objectList.length - 1]


                this.emitEvent('drawing_finished');

            }
            this.redraw()
        })



    }



    redraw() {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

        this._objectList.forEach((element) => {
            element.draw()
            if (element.active) {
                element.drawActive()

            };
            //ctx.stroke(); // change order maybe
        })
    }


    //Actions for the active object
    setColor(color) {
        const activeObject = this._objectList.filter(object => object.active === true)[0]
        if (typeof activeObject != "undefined") {
            activeObject.fillStyle = color;
        }
    }
    setCornerRadius(value) {
        const activeObject = this._objectList.filter(object => object.active === true)[0]
        if (typeof activeObject != "undefined") {
            activeObject.cornerRadius = parseInt(value);
        }
    }


    //these functions should later be moved to other files
    emitEvent(eventName, object) {
        this._canvas.dispatchEvent(new CustomEvent(eventName, { detail: object }));
    }



    //other functions
    save() {
        $('#btn_save').href = this._canvas.toDataURL();
        $('#btn_save').download = "mypainting.png";
    }

    get canvas() { return this._canvas }

    set mode(mode) { this._mode = mode }

}


