var canvas
var ctx

class SVG {
    constructor(){
        canvas = document.getElementById("drawing")
        ctx = canvas.getContext("2d")
 
    }


    redraw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.stroke()
    }

}


class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
}

class Line{
    constructor(startPoint, endPoint) {
      this.startPoint = startPoint;
      this.endPoint = endPoint;

      ctx.moveTo(startPoint.x, startPoint.y)
      ctx.lineTo(endPoint.x, endPoint.y)
      ctx.moveTo(endPoint.x, endPoint.y)
      
      ctx.lineCap = 'round'
      ctx.lineWidth = 6
      
      
    }
  }

