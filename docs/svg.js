let canvas
let ctx
var objectList = []

class SVG {
  constructor() {
    canvas = document.getElementById("drawing")
    ctx = canvas.getContext("2d")
  }

  drawLine(x1, y1, x2, y2) {
    let startPoint = new Point(x1, y1)
    let stopPoint = new Point(x2, y2)

    let line = new Line(startPoint, stopPoint)

    objectList.push(line)



  }

  stressTest() {
    for (let i = 0; i < 1000000; i++) {
      let rx = (Math.random() * 900) + 0
      let ry = (Math.random() * 400) + 0
      let startPoint = new Point(rx, ry)
      let stopPoint = new Point(rx + 100, ry + 100)
      let line = new Line(startPoint, stopPoint)
      objectList.push(line)
    }
    this.redraw()

    alert("donw")
  }

  add(object) {

  }

  removeLine(object) {
    //let index = objectList.indexOf(object)
    let index = 0;
    objectList.splice(index, 1);

    this.redraw()

  }

  checkIfObjectClicked(point) {
    console.log(objectList[0]);

    let state = ctx.isPointInStroke(point.x, point.y);
    console.log(state);

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

        //ctx.lineCap = 'round'
        //ctx.lineWidth = 2
        //ctx.fillStyle = "red";
        //ctx.fill();
        //ctx.stroke();
      })

    }

    function stroke(path) {
      ctx.lineCap = 'round'
      ctx.lineWidth = 2
      ctx.stroke(path)
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
    this.path = new Path2D()

    //ctx.beginPath()
    this.path.moveTo(startPoint.x, startPoint.y)
    this.path.lineTo(endPoint.x, endPoint.y)
    this.path.moveTo(endPoint.x, endPoint.y)

    ctx.lineCap = 'round'
    ctx.lineWidth = 7
    ctx.stroke(this.path)
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

    let radiusx = Math.abs((endPoint.x - startPoint.x) / 2)
    let radiusy = Math.abs((endPoint.y - startPoint.y) / 2)

    ctx.beginPath()
    ctx.arcTo(startPoint.x, startPoint.y, radiusx, radiusy, 5);

  }
}


