//global consts
const MODES = {
    MOVE: 0,
    SCALE: {
        TL: 1,
        TR: 2,
        BR: 3,
        BL: 4,
    },
    DRAWING: 5,
}



const UI = {
	button_pointer: $('#btn_pointer'),
	button_rect: $('#btn_rect'),
	button_circle: $('#btn_circle'),

	color_turquoise: $('#turquoise'),
	color_tangopink: $('#tangopink'),
	color_ube: $('#ube'),
	color_liberty: $('#liberty'),
	color_gargoyleglass: $('#gargoyleglass')
}

function toRad(degree){
    return (degree * Math.PI)/180
}



