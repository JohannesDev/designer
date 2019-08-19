import { toRad } from './constants.js'
import { $ } from '../domHelper.js';

//remove
let canvas = document.getElementById('drawing');
let ctx = canvas.getContext('2d');

export const MODES = {
    MOVE: 0,
    SCALE: {
        TL: 1,
        TR: 2,
        BR: 3,
        BL: 4,
    }
}



export class Rect {
    constructor(id, x, y, width, height, cornerRadius, fillStyle) {
        this._path
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._cornerRadius = cornerRadius;
        //this._lineWidth = lineWidth;
        //this._strokeStyle = lineStyle;
        this._fillStyle = fillStyle;

        this._pathBoundingRect
        this._pathCornerTL = new Path2D()
        this._pathCornerTR = new Path2D()
        this._pathCornerBR = new Path2D()
        this._pathCornerBL = new Path2D()


        //cometic values
        this._id = id
        this._name = "Rect " + (id + 1)
    }




    draw() {
        //temp vars
        let x = this._x
        let y = this._y
        let width = this._width
        let height = this._height

        //let cornerRadius = this._cornerRadius;

        //reorient rect if tansformation is negative
        if (height < 0) {
            y = y + height
            height = -height
        }
        if (width < 0) {
            x = x + width
            width = -width
        }

        let cornerRadius = (Math.min(width, height) / 2) * (this._cornerRadius / 100)

        //change corner Radius if too big for width/height
        if (2 * cornerRadius > width || 2 * cornerRadius > height) {
            cornerRadius = Math.min(width, height) / 2
        }

        this._path = new Path2D();
        this._path.moveTo(x, y + cornerRadius);

        this._path.arc(x + cornerRadius, y + cornerRadius, cornerRadius, toRad(180), toRad(270));
        this._path.lineTo(x + width - cornerRadius, y);

        this._path.arc(x + width - cornerRadius, y + cornerRadius, cornerRadius, toRad(270), toRad(0));
        this._path.lineTo(x + width, y + height - cornerRadius);

        this._path.arc(x + width - cornerRadius, y + height - cornerRadius, cornerRadius, toRad(0), toRad(90));
        this._path.lineTo(x + cornerRadius, y + height);

        this._path.arc(x + cornerRadius, y + height - cornerRadius, cornerRadius, toRad(90), toRad(180));
        this._path.closePath();

        ctx.fillStyle = this._fillStyle;
        ctx.fill(this._path);
    }

    drawActive() {
        this._pathBoundingRect = new Path2D()
        this._pathBoundingRect.moveTo(this._x, this._y);
        this._pathBoundingRect.lineTo(this._x + this._width, this._y);
        this._pathBoundingRect.lineTo(this._x + this._width, this._y + this._height);
        this._pathBoundingRect.lineTo(this._x, this._y + this._height);
        this._pathBoundingRect.closePath();

        this._pathCornerTL = new Path2D()
        this._pathCornerTL.arc(this._x, this._y, 5, 0, 2 * Math.PI, true)

        this._pathCornerTR = new Path2D()
        this._pathCornerTR.arc(this._x + this._width, this._y, 5, 0, 2 * Math.PI, true)

        this._pathCornerBR = new Path2D()
        this._pathCornerBR.arc(this._x + this._width, this._y + this._height, 5, 0, 2 * Math.PI, true)

        this._pathCornerBL = new Path2D()
        this._pathCornerBL.arc(this._x, this._y + this._height, 5, 0, 2 * Math.PI, true)

        ctx.strokeStyle = "#ee4bd8";
        ctx.lineWidth = 1;
        ctx.stroke(this._pathBoundingRect);

        ctx.strokeStyle = "#ee4bd8";
        ctx.lineWidth = 2;
        ctx.fillStyle = "#ee4bd8"

        ctx.stroke(this._pathCornerTL);
        ctx.stroke(this._pathCornerTR);
        ctx.stroke(this._pathCornerBR);
        ctx.stroke(this._pathCornerBL);
        ctx.fill(this._pathCornerTL);
        ctx.fill(this._pathCornerTR);
        ctx.fill(this._pathCornerBR);
        ctx.fill(this._pathCornerBL);

    }

    isPointInControlPoint() {
        if (ctx.isPointInPath(this._pathCornerTL, event.layerX, event.layerY)) {
            return MODES.SCALE.TL;
        }
        else if (ctx.isPointInPath(this._pathCornerTR, event.layerX, event.layerY)) {
            return MODES.SCALE.TR;
        }
        else if (ctx.isPointInPath(this._pathCornerBR, event.layerX, event.layerY)) {
            return MODES.SCALE.BR;
        }
        else if (ctx.isPointInPath(this._pathCornerBL, event.layerX, event.layerY)) {
            return MODES.SCALE.BL;
        }
        else {
            return false
        }
    }


    isPointInRect(x, y) {
        return ctx.isPointInPath(this._path, x, y)
    }


    move(x, y) {
        this._x = x
        this._y = y
    }

    scale(mode, x, y) {
        switch (mode) {
            case MODES.SCALE.TL:
                this._width += this._x - x
                this._height += this._y - y

                this._x = x
                this._y = y
                break;

            case MODES.SCALE.TR:
                this._width = x - this._x;

                this._height += this._y - y
                this._y = y
                break;

            case MODES.SCALE.BR:
                this._width = x - this._x;
                this._height = y - this._y;
                break;

            case MODES.SCALE.BL:
                this._width += this._x - x
                this._x = x

                this._height = y - this._y;
                break;
        }

    }







    get x() { return this._x }
    get y() { return this._y }
    get width() { return this._width }
    get height() { return this._height }
    get fillStyle() { return this._fillStyle }
    get cornerRadius() { return this._cornerRadius }

    get name() { return this._name }
    get id() { return this._id }

    set x(x) { this._x = x }
    set y(y) { this._y = y }
    set width(width) { this._width = width }
    set height(height) { this._height = height }
    set fillStyle(fillStyle) { this._fillStyle = fillStyle }
    set cornerRadius(cornerRadius) { this._cornerRadius = cornerRadius }
}