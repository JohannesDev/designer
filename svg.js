var canvas
var ctx
var objectList = []

class SVG {
  constructor() {
    canvas = document.getElementById("drawing")
    ctx = canvas.getContext("2d")
  }

  add(object) {
    objectList.push(object)
  }

  remove(object) {
    let index = objectList.indexOf(object)
    objectList.splice(index, 1);

  }



  redraw() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    if (objectList.length > 0) {      
      objectList.forEach(function (object, index) {
        switch (objectList[index].constructor.name) {
          case "Line":
            new Line(object.startPoint, object.endPoint)
        }

        ctx.stroke()
      })
      
    }
    
   
  

  }

}


class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Line {
  constructor(startPoint, endPoint) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;

    ctx.beginPath()
    ctx.moveTo(startPoint.x, startPoint.y)
    ctx.lineTo(endPoint.x, endPoint.y)
    ctx.moveTo(endPoint.x, endPoint.y)

    ctx.lineCap = 'round'
    ctx.lineWidth = 6


  }
}

