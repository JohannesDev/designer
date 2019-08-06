
class Rect {
    constructor(x, y, width, height, fillStyle) {
        this._path
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        //this._lineWidth = lineWidth;
        //this._strokeStyle = lineStyle;
        this._fillStyle = fillStyle;

        this._pathBoundingRect
        this._pathCornerTL = new Path2D()
        this._pathCornerTR = new Path2D()
        this._pathCornerBR = new Path2D()
        this._pathCornerBL = new Path2D()

    }

    draw() {
        this._path = new Path2D()
        this._path.moveTo(this._x, this._y);
        this._path.lineTo(this._x + this._width, this._y);
        this._path.lineTo(this._x + this._width, this._y + this._height);
        this._path.lineTo(this._x, this._y + this._height);
        this._path.closePath();

        //ctx.lineWidth = this._lineWidth;
        //ctx.strokeStyle = this._lineStyle;
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

        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke(this._pathBoundingRect);

        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.fillStyle = "blue"

        ctx.stroke(this._pathCornerTL);
        ctx.stroke(this._pathCornerTR);
        ctx.stroke(this._pathCornerBR);
        ctx.stroke(this._pathCornerBL);
        ctx.fill(this._pathCornerTL);
        ctx.fill(this._pathCornerTR);
        ctx.fill(this._pathCornerBR);
        ctx.fill(this._pathCornerBL);

    }

    isPointInObject(x, y) {
        return ctx.isPointInPath(this._path, event.layerX, event.layerY)
    }

    isPointInControlls(x, y) {
        if (ctx.isPointInPath(this._pathCornerTL, event.layerX, event.layerY)) {
            return 0;
        }
        else if (ctx.isPointInPath(this._pathCornerTR, event.layerX, event.layerY)) {
            return 1;
        }
        else if (ctx.isPointInPath(this._pathCornerBR, event.layerX, event.layerY)) {
            return 2;
        }
        else if (ctx.isPointInPath(this._pathCornerBL, event.layerX, event.layerY)) {
            return 3;
        }
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
    get fillStyle() { return this._fillStyle}

    set x(x) { this._x = x }
    set y(y) { this._y = y }
    set width(width) { this._width = width }
    set height(height) { this._height = height }
    set fillStyle(fillStyle) { this._fillStyle = fillStyle }
}