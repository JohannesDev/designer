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


export function toRad(degree) {
    return (degree * Math.PI) / 180
}






