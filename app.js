
let drawingHelper = new DrawingHelper();
//drawingHelper.drawRect(10,10,50,50)

let rect

$('window').addEventListener('mousedown', (event) => {  

    if (drawingHelper.objectClicked() && currentPanelElement === $('btn_rect')) {
        rect = new Rect(mouseX, mouseY, 10, 10)
    }
})

$('window').addEventListener('mousemove', (event) => {    

    if (down === true && currentPanelElement === $('btn_rect')) {
    }
})

$('window').addEventListener('mouseup', (event) => {    

    if (currentPanelElement === $('btn_rect')) {
        $('btn_pointer').click();
    }
})







