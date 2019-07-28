//globals
let mouseX;
let mouseY;

let canvas


class DrawingHelper {

    constructor() {
        canvas = new fabric.Canvas('drawing', {
            width: $('window').clientWidth,
            height: $('window').clientHeight
        })

    }

}





class Rect {
    constructor(x, y, width, height) {
        var rect = new fabric.Rect({
            left: x,
            top: y,
            fill: 'red',
            width: width,
            height: height,
        });

        canvas.add(rect)
    }
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










