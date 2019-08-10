import { $ } from './domHelper.js';
import { DrawingHelper } from './canvas/drawingHelper.js';


let drawingHelper = new DrawingHelper();


$('#canvas-toolbar').addEventListener('button_clicked', (event) => {
    console.log(event.detail);

    if (event.detail === $('#btn_pointer')) {
        drawingHelper._mode = MODES.MOVE;
    }
    else if (event.detail === $('#btn_rect')) {
        drawingHelper._mode = MODES.DRAWING_READY;
    }
    else if (event.detail === $('#btn_circle')) {
    }
})

/*
// Simple example, see optional options for more configuration.
const pickr = Pickr.create({
    el: '#color-picker',
    theme: 'classic', // or 'monolith', or 'nano'

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

})*/



/*$('#btn_save').addEventListener('click', (event) => {
    drawingHelper.save()


})*/








