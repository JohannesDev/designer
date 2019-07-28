//globals
let mouseX;
let mouseY;
let down = false;

let canvas


class DrawingHelper {

    constructor() {
        canvas = new fabric.Canvas('drawing', {
            width: $('window').clientWidth,
            height: $('window').clientHeight
        })
    }

 



    objectClicked(){
        //returns true if object is active
        return canvas.getActiveObject() === null || typeof canvas.getActiveObject() === 'undefined';
    }

}





class Rect {
    constructor(x, y, width, height) {
        let rect = new fabric.Rect({
            left: x,
            top: y,
            fill: 'red',
            width: width,
            height: height,
            //cornerStyle: "circle"
        });

        canvas.add(rect)

        return rect;
    }
}












$('window').addEventListener('mousedown', (event) => { 
    mouseX = event.pageX - $('drawing').offsetLeft
    mouseY = event.pageY - $('drawing').offsetTop
    down = true;
});

$('drawing').addEventListener('mousemove', () => {
    mouseX = event.pageX - $('drawing').offsetLeft
    mouseY = event.pageY - $('drawing').offsetTop
});

$('drawing').addEventListener('mouseup', () => {
    mouseX = event.pageX - $('drawing').offsetLeft
    mouseY = event.pageY - $('drawing').offsetTop
    down = false;
});










