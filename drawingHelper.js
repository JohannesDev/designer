//globals
let mouseX;
let mouseY;
let down = false;

let canvas
let ctx
let objectList = []
let activeObject = null

let drawingHelper

class DrawingHelper {

    constructor() {
        canvas = document.getElementById('drawing');
        ctx = canvas.getContext('2d');

        canvas.width = $('#window').clientWidth;
        canvas.height = $('#window').clientHeight - 4;

        let rect = new Rect(10, 20, 100, 200, 10, 'blue', 'blue')

        objectList.push(rect)
        this.redraw()

this._down = false
        this._clickOffsetX
        this._clickOffsetY


        canvas.addEventListener('mousedown', (event) => {
            this.down = true;

            objectList.forEach((element) => {
                if(element.isPointInPath(event.layerX)){
                    activeObject = element;
                }
                else{
                    //activeObject = null
                }
            })
            //console.log(activeObject);
            

            this._clickOffsetX = event.layerX - activeObject._x;
            this._clickOffsetY = event.layerY - activeObject._y;

        })

        canvas.addEventListener('mousemove', (event) => {
            if (this.down === true) {
                activeObject.x = event.layerX - this._clickOffsetX
                activeObject.y = event.layerY - this._clickOffsetY
                this.redraw()
            }
        })

        canvas.addEventListener('mouseup', (event) => {
            this.down = false;            
        })
    }


    redraw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        objectList.forEach((element) => {
            element.draw()
            //ctx.stroke(); // change order maybe
        })
    }

}

class Rect {
    constructor(x, y, width, height, lineWidth, lineStyle, fillStyle) {
        this._path
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._lineWidth = lineWidth;
        this._strokeStyle = lineStyle;
        this._fillStyle = fillStyle;

    }

    draw() {
        this._path = new Path2D()
        this._path.moveTo(this._x, this._y);
        this._path.lineTo(this._x + this._width, this._y);
        this._path.lineTo(this._x + this._width, this._y + this._height);
        this._path.lineTo(this._x, this._y + this._height);
        this._path.closePath();

        ctx.lineWidth = this._lineWidth;
        ctx.strokeStyle = this._lineStyle;
        ctx.fillStyle = this._fillStyle;

        ctx.fill(this._path);

    }

    isPointInPath(x, y){
        return ctx.isPointInPath(this._path, event.layerX, event.layerY)
    }

    set x (x) { this._x = x }
    set y (y){ this._y = y }
}

