import { $ } from './domHelper.js';
import { MODES } from './canvas/constants.js';
import { DrawingHelper } from './canvas/drawingHelper.js';


let drawingHelper = new DrawingHelper();

let canvasToolbar = $('#canvas-toolbar')

let propertyX = $('#property-x')
let propertyY = $('#property-y')
let propertyWidth = $('#property-width')
let propertyHeight = $('#property-height')

let propertyCornerRadius = $('#property-cornerRadius')


canvasToolbar.addEventListener('button_clicked', (event) => {

    if (event.detail === canvasToolbar.getButtonById('btn_pointer')) {
        drawingHelper.mode = MODES.MOVE;
    }
    else if (event.detail === canvasToolbar.getButtonById('btn_rect')) {
        drawingHelper.mode = MODES.DRAWING_READY;
    }
    else if (event.detail === $('#btn_circle')) {
    }
})


drawingHelper.canvas.addEventListener('drawing_finished', () => {
    canvasToolbar.clickPointer();
})

drawingHelper.canvas.addEventListener('property_changed', (event) => {
    if (event.detail.x) {
        propertyX.setValue(event.detail.x)
    }
    else if (event.detail.y) {
        propertyY.setValue(event.detail.y)
    }
    else if (event.detail.width) {
        propertyWidth.setValue(event.detail.width)
    }
    else if (event.detail.height) {
        propertyHeight.setValue(event.detail.height)
    }
    else if (event.detail.cornerRadius) {
        propertyCornerRadius.setValue(event.detail.cornerRadius)
    }
})

propertyCornerRadius.addEventListener('corner_radius_changed', (event) => {
    drawingHelper.setCornerRadius(event.detail)
})






// Simple example, see optional options for more configuration.
const pickr = Pickr.create({
    el: '#color-picker',
    theme: 'classic', // or 'monolith', or 'nano'
    comparison: false,

    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 1)',
        'rgba(156, 39, 176, 1)',
        'rgba(103, 58, 183, 1)',
        'rgba(63, 81, 181, 1)',
        'rgba(33, 150, 243, 1)',
        'rgba(3, 169, 244, 1)',
        'rgba(0, 188, 212, 1)',
        'rgba(0, 150, 136, 1)',
        'rgba(76, 175, 80, 1)',
        'rgba(139, 195, 74, 1)',
        'rgba(205, 220, 57, 1)',
        'rgba(255, 235, 59, 1)',
        'rgba(255, 193, 7, 1)'
    ],


    components: {

        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            cmyk: true,
            input: true,
        }
    }
});

pickr.on('change', (color, instance) => {
    let combinedColor = '#' + color.toHEXA()[0] + color.toHEXA()[1] + color.toHEXA()[2]
    if (typeof color.toHEXA()[3] != 'undefined') {
        combinedColor = combinedColor + color.toHEXA()[3]
    }

    drawingHelper.setColor(combinedColor)

})



/*$('#btn_save').addEventListener('click', (event) => {
    drawingHelper.save()


})*/








