//globals
let canvas
let ctx

let drawingHelper

objectList = []
activeObject = null

const MODES = {
    MOVE: 0,
    SCALE_TL: 1,
    SCALE_TR: 2,
    SCALE_BR: 3,
    SCALE_BL: 4,
}

class DrawingHelper {

    constructor() {
        canvas = document.getElementById('drawing');
        ctx = canvas.getContext('2d');
        
        
        this._down = false;
        this._clickOffsetX
        this._clickOffsetY

        this._mode
        
        canvas.width = $('#window').clientWidth;
        canvas.height = $('#window').clientHeight - 4;



        let rect = new Rect(10, 20, 100, 200, 'blue')
        let rect2 = new Rect(100, 200, 200, 200, 'red')

        objectList.push(rect)
        objectList.push(rect2)

        //this.redraw()


        canvas.addEventListener('mousedown', (event) => {
            //basic
            this.down = true;
            //this._activeObject = null


            
            objectList.forEach((element) => {
                
                if (element.isPointInCornerTL(event.layerX, event.layerY)) {
                    console.log("TL");
                    this._mode = MODES.SCALE_TL;
                }
                else if(element.isPointInCornerTR(event.layerX, event.layerY)) {
                    console.log("TR");
                    this._mode = MODES.SCALE_TR;
                }
                else if(element.isPointInCornerBR(event.layerX, event.layerY)) {
                    console.log("BR");
                    this._mode = MODES.SCALE_BR;
                }
                else if (element.isPointInCornerBL(event.layerX, event.layerY)) {
                    console.log("BL");
                    this._mode = MODES.SCALE_BL
                }
                //check if object is clicked and set it active
                else if (element.isPointInObject(event.layerX, event.layerY)) {
                    console.log("ab");
                    
                    this._mode = MODES.MOVE 
                    activeObject = element;
                    this._clickOffsetX = event.layerX - activeObject._x;
                    this._clickOffsetY = event.layerY - activeObject._y;
                }
            })
            
            //this.redraw()
        })

        canvas.addEventListener('mousemove', (event) => {
            //Move whole object
            if (activeObject != null && this.down === true && this._mode === MODES.MOVE) {
                activeObject.x = event.layerX - this._clickOffsetX
                activeObject.y = event.layerY - this._clickOffsetY

                //this.redraw()
            }
            //Scaling with top right corner
            else if (this.down === true && this._mode === MODES.SCALE_TL) {
                activeObject.width += activeObject.x - event.layerX
                activeObject.height += activeObject.y - event.layerY

                activeObject.x = event.layerX
                activeObject.y = event.layerY
            }
            //Scaling with top left corner
            else if (this.down === true && this._mode === MODES.SCALE_TR) {
                activeObject.width = event.layerX - activeObject.x;

                activeObject.height += activeObject.y - event.layerY
                activeObject.y = event.layerY
            }
            //Scaling with bottom right corner
            else if (this.down === true && this._mode === MODES.SCALE_BR) {
                activeObject.width = event.layerX - activeObject.x;
                activeObject.height = event.layerY - activeObject.y;

            }
            //Scaling with bottom left corner
            else if (this.down === true && this._mode === MODES.SCALE_BL) {
                activeObject.width += activeObject.x - event.layerX
                activeObject.x = event.layerX

                activeObject.height = event.layerY - activeObject.y;
            }

            //this.redraw()
        })

        canvas.addEventListener('mouseup', (event) => {
            this.down = false;
        })
    }



    

}

function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    objectList.forEach((element) => {
        element.draw()
        if(element === activeObject){
            element.drawActive()
        }
        //ctx.stroke(); // change order maybe
    })

    requestAnimationFrame(redraw);
}
requestAnimationFrame(redraw);




