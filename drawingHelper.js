//globals
let mouseX;
let mouseY;
let down = false;

let canvas


class DrawingHelper {

    constructor() {
        canvas = new fabric.Canvas('drawing', {
            width: $('#window').clientWidth,
            height: $('#window').clientHeight
        })

        let rect
        let down


        canvas.on('mouse:down', function (options) {
            down = true;

            if (options.target === null && currentPanelElement === $('#btn_rect')) {
                //console.log(options);

                let x = options.pointer.x
                let y = options.pointer.y

                rect = new Rect(x, y, 1, 1)

            }
        });

        canvas.on('mouse:move', function (options) {
            if (down === true && currentPanelElement === $('#btn_rect')) {


                if (typeof rect != 'undefined') {
                    let x = options.pointer.x - rect.get('left')
                    let y = options.pointer.y - rect.get('top')

                    rect.set({ width: x, height: y });
                    rect.setCoords()
                    canvas.renderAll();
                }
            }
        });

        canvas.on('mouse:up', function (options) {
            if (currentPanelElement === $('#btn_rect')) {
                down = false;
                rect = null;
                $('#btn_pointer').click();
            }
        });





    }

    /*objectClicked() {
        //returns true if object is active
        return canvas.getActiveObject() === null || typeof canvas.getActiveObject() === 'undefined';
    }*/

}



class Rect {
    constructor(x, y, width, height) {
        this._rect = new fabric.Rect({
            left: x,
            top: y,
            fill: 'blue',
            width: width,
            height: height
            //cornerStyle: "circle"
        });

        canvas.add(this._rect)



        this._rect.on('selected', options => {

        });



        return this._rect;
    }


}














