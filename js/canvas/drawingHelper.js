import { $ } from '../domHelper.js';
import { MODES } from './constants.js';
import { Rect } from './rect.js';

let currentSelectedButton = $('#btn_pointer')

export class DrawingHelper {

    constructor() {
        this._canvas = document.getElementById('drawing');
        this._ctx = this._canvas.getContext('2d');

        this._objectList = []
        this._activeObject = null

        this._down = false;
        this._clickOffsetX
        this._clickOffsetY

        this._mode = "rrr"

        this._canvas.width = $('#window').clientWidth;
        this._canvas.height = $('#window').clientHeight - 4;


        //demo setup
        let rect = new Rect(10, 20, 100, 200, 1, 'blue')
        let rect2 = new Rect(100, 200, 200, 200, 20, 'red')
        this._objectList.push(rect)
        this._objectList.push(rect2)
        this.redraw()


        let emitEvent = () => {
            let drawingEvent = new CustomEvent('drawing_finished');
            this._canvas.dispatchEvent(drawingEvent);
        }



        document.addEventListener('mousedown', (event) => {

            // Canvas Clicked
            if (event.target === $('#drawing')) {

                // Drawing new object on canvas
                if (this._mode === MODES.DRAWING_READY) {
                    let rect = new Rect(event.layerX, event.layerY, 1, 1, 20, "green");
                    this._objectList.push(rect);
                    this._mode = MODES.DRAWING_STARTED

                }

                // select object on canvas
                else {

                    this._down = true;
                    this._activeObject = null

                    //check for click event
                    this._objectList.forEach((element) => {

                        //check if object is clicked and set it active
                        if (element.isPointInObject(event.layerX, event.layerY)) {
                            this._mode = MODES.MOVE
                            this._activeObject = element;

                            this._clickOffsetX = event.layerX - this._activeObject._x;
                            this._clickOffsetY = event.layerY - this._activeObject._y;
                        }

                        //check if any control points are clicked and set the acording mode
                        switch (element.isPointInControlls(event.layerX, event.layerY)) {
                            case 0:
                                this._activeObject = element;
                                this._mode = MODES.SCALE.TL;
                                break;
                            case 1:
                                this._activeObject = element;
                                this._mode = MODES.SCALE.TR;
                                break;
                            case 2:
                                this._activeObject = element;
                                this._mode = MODES.SCALE.BR;
                                break;
                            case 3:
                                this._activeObject = element;
                                this._mode = MODES.SCALE.BL
                                break;

                        }
                    })
                }


                this.redraw()
            }

        })

        document.addEventListener('mousemove', (event) => {
            let mouseX = event.clientX - $('#window').offsetLeft
            let mouseY = event.clientY - $('#window').offsetTop

            //Draw new object
            if (currentSelectedButton === $('#btn_rect') && this._mode === MODES.DRAWING_STARTED) {
                let rect = this._objectList[this._objectList.length - 1]



                rect.width = mouseX - rect.x;
                rect.height = mouseY - rect.y;
            }

            //Move whole object
            if (this._activeObject != null && this._down === true && this._mode === MODES.MOVE) {


                this.move(mouseX - this._clickOffsetX, mouseY - this._clickOffsetY);
            }

            //Scaling
            else if (this._down === true && Object.values(MODES.SCALE).includes(this._mode)) {
                this.scale(mouseX, mouseY)
            }


            this.redraw()
        })

        document.addEventListener('mouseup', (event) => {
            this._down = false;

            if (currentSelectedButton === $('#btn_rect') && this._mode === MODES.DRAWING_STARTED) {
                this._activeObject = this._objectList[this._objectList.length - 1]
                this.redraw()


                currentSelectedButton = $('#btn_pointer')
                this._mode = MODES.MOVE;
                emitEvent()

            }

            if (currentSelectedButton === $('#btn_circle')) {
                //this._activeObject.x = Math.random()*100

            }

        })


        document.addEventListener('input', (event) => {
            if (this._activeObject != null) {
                switch (event.target) {
                    case $('#tb_positionX'):
                        console.log("changed");
                        this._activeObject.x = event.target.value


                        break;
                }

            }


        });
    }


    redraw() {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

        this._objectList.forEach((element) => {
            element.draw()
            if (element === this._activeObject) {
                element.drawActive()
            }
            //ctx.stroke(); // change order maybe
        })
    }


    //Actions for the active object
    setColor(color) {
        if (this._activeObject != null) {
            this._activeObject.fillStyle = color;
        }
    }
    move(x, y) {
        this._activeObject.x = x
        this._activeObject.y = y
    }
    scale(x, y) {
        this._activeObject.scale(this._mode, x, y)
    }


    //other functions
    save() {
        $('#btn_save').href = this._canvas.toDataURL();
        $('#btn_save').download = "mypainting.png";
    }

    get canvas() { return this._canvas }

    set mode(mode) { this._mode = mode }

}


