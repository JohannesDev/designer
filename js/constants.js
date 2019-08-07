import {$} from './domHelper.js';


//global consts
export const MODES = {
    MOVE: 0,
    SCALE: {
        TL: 1,
        TR: 2,
        BR: 3,
        BL: 4,
    },
    DRAWING_READY: 5,
    DRAWING_STARTED: 6,
}



const UI = {
	button_pointer: $('#btn_pointer'),
	button_rect: $('#btn_rect'),
	button_circle: $('#btn_circle'),
}




export function toRad(degree){
    return (degree * Math.PI)/180
}

export function getClickedButton(event) {
    if(event.target === $('#btn_pointer') || event.target.parentElement === $('#btn_pointer')){
        return $('#btn_pointer')
    }
    else if(event.target === $('#btn_rect') || event.target.parentElement === $('#btn_rect')){
        return $('#btn_rect')
    }
    else if(event.target === $('#btn_circle') || event.target.parentElement === $('#btn_circle')){
        return $('#btn_circle')
    }
    else{
        return null;
    }
}




