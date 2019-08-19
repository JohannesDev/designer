import { $ } from '../domHelper.js';
import { MODES } from './constants.js';
import { Rect } from './rect.js';


export class DrawingHelper {

    constructor() {
        this._canvas = document.getElementById('drawing');
        this._ctx = this._canvas.getContext('2d');

        this._objectList = []
        this._activeElement = null

        this._down = false;
        this._mode = MODES.MOVE
        this._clickOffsetX = 0
        this._clickOffsetY = 0

        //set width and height of canvas
        this._canvas.width = $('#window').clientWidth;
        this._canvas.height = $('#window').clientHeight - 4;


        //demo setup
        let rect = new Rect(this._objectList.length, 10, 20, 100, 200, 1, '#FF0000')
        this._objectList.push(rect)
        let rect2 = new Rect(this._objectList.length, 100, 200, 200, 200, 20, '#0000FF')
        this._objectList.push(rect2)
        this.redraw()



        this._canvas.addEventListener('mousedown', (event) => {
            this._down = true;

            // Canvas Clicked
            if (event.target === $('#drawing')) {

                // Drawing new object on canvas
                if (this._mode === MODES.DRAWING_READY) {
                    let rect = new Rect(this._objectList.length, event.layerX, event.layerY, 1, 1, 20, "#00AA00");
                    this._objectList.push(rect);
                    this._mode = MODES.DRAWING_STARTED
                    this.updateProps()
                }
                else {
                    this._activeElement = null;

                    this._objectList.forEach((element) => {
                        //check if object is clicked and set it active
                        //check if any control points are clicked and set the acording mode

                        if (element.isPointInControlPoint()) {
                            this._mode = element.isPointInControlPoint()
                            this._activeElement = element;
                        }
                        else if (element.isPointInRect(event.layerX, event.layerY)) {
                            this._activeElement = element;
                            this._clickOffsetX = event.layerX - this._activeElement.x
                            this._clickOffsetY = event.layerY - this._activeElement.y
                        }

                    })

                    if (this._activeElement != null) {
                        this._activeElement.active = true
                        this._activeElement.mode = MODES.MOVE;
                        this._activeElement.clickOffsetX = event.layerX - this._activeElement.x;
                        this._activeElement.clickOffsetY = event.layerY - this._activeElement.y;
                    }

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
            //Move whole object
            if (this._activeElement != null && this._down === true && this._mode === MODES.MOVE) {

                let x = mouseX - this._clickOffsetX
                let y = mouseY - this._clickOffsetY
                this._activeElement.move(x, y)
            }
            //Scale object 
            else if (this._activeElement != null && this._down === true && Object.values(MODES.SCALE).includes(this._mode)) {
                this._activeElement.scale(this._mode, mouseX, mouseY)
            }


            this.redraw()
        })

        document.addEventListener('mouseup', (event) => {
            this._down = false;

            if (this._mode === MODES.DRAWING_STARTED) {

                this._activeElement = this._objectList[this._objectList.length - 1]

                this.emitEvent('drawing_finished');

            }
            if (Object.values(MODES.SCALE).includes(this._mode)) {

                this._mode = MODES.MOVE

            }
            this.redraw()
        })


        document.addEventListener('key', (event) => {
            console.log(event);

        });



    }



    redraw() {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

        this._objectList.forEach((element) => {
            element.draw()
            if (element === this._activeElement) {
                element.drawActive()
            };
            //ctx.stroke(); // change order maybe
        })
    }

    //other functions
    save() {
        $('#btn_save').href = this._canvas.toDataURL();
        $('#btn_save').download = "mypainting.png";
    }


    //COMMUNICATION

    //these functions should later be moved to other files
    emitEvent(eventName, object) {
        this._canvas.dispatchEvent(new CustomEvent(eventName, { detail: object }));
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

    /////////////////////////////////////////////////////////////////////////////////////
    //these functions should later be moved to other files
    emitEvent(eventName, object) {
        this._canvas.dispatchEvent(new CustomEvent(eventName, { detail: object }));
    }
    updateProps() {
        this.emitEvent('property_changed', { "x": this._x })
        this.emitEvent('property_changed', { "y": this._y })
        this.emitEvent('property_changed', { "width": this._width })
        this.emitEvent('property_changed', { "height": this._height })
        this.emitEvent('property_changed', { "cornerRadius": this._cornerRadius })
        this.emitEvent('property_changed', { "fillStyle": this._fillStyle })
        this.emitEvent('property_changed', { "objectList": this._objectList })

    }




    //SETTERS AND GETTERS

    get canvas() { return this._canvas }

    set mode(mode) { this._mode = mode }

}


