//globals
let mouseX;
let mouseY;


let parent
let draw

class DrawingHelper {

    constructor() {
        parent = $('window')
        draw = SVG().addTo('#drawing').size(parent.clientWidth, parent.clientHeight)
    }


    drawRect(x, y, width, height) {
        let rect = new Rect(x, y, width, height)
    }


}



class Rect {
    constructor(x, y, width, height) {
        this._color = '#f06087'

        this._rect = draw.rect(width, height)
        this._rect.move(x, y)
        this._rect.fill(this._color)

        this._dragging = false
        this._offsetX = 0
        this._offsetY = 0

        this._boxRadius = 50;


        $('drawing').addEventListener('mousedown', (event => {this.mouseDown(event)}))
        $('drawing').addEventListener('mousemove', (event => {this.mouseMove(event)}))
        $('drawing').addEventListener('mouseup', (event => {this.mouseUp(event)}))
    }

    moveTo(x, y) {
        this._rect.move(x, y)
    }

    setActive() {
        this._rect.attr({ stroke: '#4287f5', 'stroke-width': 1 })  
           

        let r1 = draw.circle(this._boxRadius).move(66, 55).attr({
            fill: '#4287f5'
            , 'fill-opacity': 1
            , stroke: '#FFF'
            , 'stroke-width': 1
        });


          

    }

    setInactive() {
        this._rect.attr({ stroke: '#000', 'stroke-width': 1 })
    }


    mouseDown(event) {
        if (event.target.instance === this._rect) {
            
            this._dragging = true

            this._offsetX = mouseX - this._rect.node.attributes.x.value
            this._offsetY = mouseY - this._rect.node.attributes.y.value

            this.setActive()
        }
        else if (event.target.instance !== this._rect.instance) {
            this.setInactive()
        }
    };

    mouseMove(event) {
        if (this._dragging === true) {
            this._rect.move(mouseX - this._offsetX, mouseY - this._offsetY)
        }

    };

    mouseUp(event) {
        this._dragging = false
    }


    //Getters
    get instance() { return this._rect; }
    get offsetX() { return this._offsetX }
    get offsetY() { return this._offsetY }
    get dragging() { return this._dragging }

    //Setters
    set offsetX(offsetX) { this._offsetX = offsetX; }
    set offsetY(offsetY) { this._offsetY = offsetY }
    set dragging(dragging) { this._dragging = dragging }
}












$('drawing').addEventListener('mousedown', (event) => {
    down = true

    mouseX = event.pageX - $('drawing').offsetLeft
    mouseY = event.pageY - $('drawing').offsetTop
});

$('drawing').addEventListener('mousemove', () => {
    mouseX = event.pageX - $('drawing').offsetLeft
    mouseY = event.pageY - $('drawing').offsetTop
});

$('drawing').addEventListener('mouseup', () => {
    down = false

    mouseX = event.pageX - $('drawing').offsetLeft
    mouseY = event.pageY - $('drawing').offsetTop
});










