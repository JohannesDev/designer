//globals
let canvas
let ctx

let drawingHelper

class DrawingHelper {

    constructor() {
        canvas = document.getElementById('drawing');
        ctx = canvas.getContext('2d');

        this._objectList = []
        this._activeObject = null

        this._down = false;
        this._clickOffsetX
        this._clickOffsetY

        this._mode

        canvas.width = $('#window').clientWidth;
        canvas.height = $('#window').clientHeight - 4;

        let rect = new Rect(10, 20, 100, 200, 'blue')
        let rect2 = new Rect(100, 200, 200, 200, 'red')

        this._objectList.push(rect)
        this._objectList.push(rect2)

        this.redraw()



        canvas.addEventListener('mousedown', (event) => {
            //basic
            this.down = true;
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

            //no click event => canvas clicked
            if (this._activeObject === null && currentPanelElement === $('#btn_rect')) {

                let rect = new Rect(event.layerX, event.layerY, 1, 1, "green");
                this._objectList.push(rect);
                this._mode = MODES.DRAWING;
            }

            this.redraw()
        })

        canvas.addEventListener('mousemove', (event) => {
            
            //Move whole object
            if (this._activeObject != null && this.down === true && this._mode === MODES.MOVE) {
                this._activeObject.x = event.layerX - this._clickOffsetX
                this._activeObject.y = event.layerY - this._clickOffsetY

            }

            //Scaling
            else if (this.down === true && Object.values(MODES.SCALE).includes(this._mode)) {
                this._activeObject.scale(this._mode, event.layerX, event.layerY)
            }

            //Draw new object
            if (this._activeObject === null && currentPanelElement === $('#btn_rect') && this._mode === MODES.DRAWING) {
                let rect = this._objectList[this._objectList.length - 1]

                rect.width = event.layerX - rect.x;
                rect.height = event.layerY - rect.y;

            }

            this.redraw()
        })

        canvas.addEventListener('mouseup', (event) => {
            this.down = false;

            if (currentPanelElement === $('#btn_rect') && this._mode === MODES.DRAWING) {
                this._activeObject = this._objectList[this._objectList.length - 1]
                this.redraw()
                $('#btn_pointer').click()
            }

        })
    }


    redraw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this._objectList.forEach((element) => {
            element.draw()
            if (element === this._activeObject) {
                element.drawActive()
            }
            //ctx.stroke(); // change order maybe
        })
    }

}


