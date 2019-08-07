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


        //demo setup
        let rect = new Rect(10, 20, 100, 200, 1, 'blue')
        let rect2 = new Rect(100, 200, 200, 200, 20, 'red')
        this._objectList.push(rect)
        this._objectList.push(rect2)
        this.redraw()



        

        //set listener on color items
        let colorItems = $('.color__item')
        for (let element of colorItems) {
            element.addEventListener('click', (event) => {
                let color = window.getComputedStyle(element, null).getPropertyValue("background-color");
                this._activeObject.fillStyle = color
                this.redraw()
            })
        }


        document.addEventListener('mousedown', (event) => {

            //no click event => canvas clicked
            if (currentPanelElement === $('#btn_rect')) {

                let rect = new Rect(event.layerX, event.layerY, 1, 1, 20 ,"green");
                this._objectList.push(rect);
                this._mode = MODES.DRAWING;
            }

            //canvas Clicked
            else if (event.target === $('#drawing')) {
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

                this.redraw()
            }




        })

        document.addEventListener('mousemove', (event) => {
            let mouseX = event.clientX - $('#window').offsetLeft
            let mouseY = event.clientY - $('#window').offsetTop


            //Draw new object
            if (currentPanelElement === $('#btn_rect') && this._mode === MODES.DRAWING) {
                let rect = this._objectList[this._objectList.length - 1]

                rect.width = mouseX - rect.x;
                rect.height = mouseY - rect.y;

            }


            //Move whole object
            if (this._activeObject != null && this.down === true && this._mode === MODES.MOVE) {
                this.move(mouseX - this._clickOffsetX, mouseY - this._clickOffsetY);
            }

            //Scaling
            else if (this.down === true && Object.values(MODES.SCALE).includes(this._mode)) {
                this._activeObject.scale(this._mode, mouseX, mouseY)
            }



            this.redraw()
        })

        document.addEventListener('mouseup', (event) => {
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



    //Actions for the active object
    setColor(color){
        if(this._activeObject != null){
            console.log('setcolor ' + color);
        }
    }
    move(x, y){
        this._activeObject.x = x
        this._activeObject.y = y
    }
    scale(color){
    }

}


