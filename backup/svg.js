var canvas
var ctx
var objectList = []

const MODES = {
  SELECT: "select",
  PEN: {
    LINE: "pen.line",
    RECT: "pen.rect",
    ELLIPSE: "pen.ellipse"
  },
  DRAW: "draw"

};

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

  checkIfObjectClicked(point) {
    console.log("working");

    objectList.forEach(function (object, index) {
      var k = (object.endPoint.y - object.startPoint.y) / (object.endPoint.x - object.startPoint.x)
      var d = k * object.startPoint.x - object.startPoint.y


    })
  }


  redraw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (objectList.length > 0) {
      objectList.forEach(function (object, index) {
        switch (objectList[index].constructor.name) {
          case "Line":
            new Line(object.startPoint, object.endPoint)
            break
          case "Rect":
            new Rect(object.startPoint, object.endPoint)
            break
          case "Ellipse":
            new Ellipse(object.startPoint, object.endPoint)
            break
        }

        ctx.lineCap = 'round'
        ctx.lineWidth = 2
        //ctx.fillStyle = "red";
        //ctx.fill();
        ctx.stroke();
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
  }
}


class Rect {
  constructor(startPoint, endPoint) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;

    ctx.beginPath()
    ctx.moveTo(startPoint.x, startPoint.y)

    ctx.lineTo(endPoint.x, startPoint.y)
    ctx.lineTo(endPoint.x, endPoint.y)
    ctx.lineTo(startPoint.x, endPoint.y)
    ctx.lineTo(startPoint.x, startPoint.y)

    ctx.closePath()

  }
}

class Ellipse {
  constructor(startPoint, endPoint) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;

    let radiusx = Math.abs((endPoint.x - startPoint.x)/2)
    let radiusy = Math.abs((endPoint.y - startPoint.y)/2)

    ctx.beginPath()
    ctx.arcTo(startPoint.x, startPoint.y, radiusx, radiusy, 5);


  }
}


