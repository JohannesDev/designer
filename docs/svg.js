let canvas
let ctx
var objectList = []

class SVG {
  constructor() {
    canvas = document.getElementById("drawing")
    ctx = canvas.getContext("2d")
  }


  drawLine(x1, y1, x2, y2) {
    let line = new Line(x1, y1, x2, y2)
    objectList.push(line)
    this.redraw()
    return (objectList.length - 1)
  }

  transformLine(x1, y1, x2, y2, index) {
    if (index != null) {
      let object = objectList[index]

      object.x1 = x1
      object.y1 = y1
      object.x2 = x2
      object.y2 = y2

      this.redraw()
    }
  }


  selectLine(x, y) {
    let objectIndex
    this.redraw()

    if (objectList.length > 0) {
      objectList.forEach(function (object, index) {
        let pointIsInObject = ctx.isPointInStroke(object.path, x, y);
        if (pointIsInObject) {
          objectIndex = index
          object.drawBoundingBox()
        }

      })
    }

    return objectIndex;
  }

  getClickedPath(x, y, index) {
    let object = objectList[index]


    let distancePoint1 = Math.abs(object.x1 - x) + Math.abs(object.y1 - y)
    let distancePoint2 = Math.abs(object.x2 - x) + Math.abs(object.y2 - y)


    if (distancePoint1 < 10) {
      return 1;
    }
    else if (distancePoint2 < 10) {
      return 2;
    }
    else {
      return 0;
    }
  }

  removeLine(index) {
    if (index != null) {
      objectList.splice(index, 1);

      this.redraw()
    }
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


  redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (objectList.length > 0) {
      objectList.forEach(function (object, index) {
        object.draw()

      })
    }
  }

}

class Line {

  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.path = new Path2D()
    this.boundingPath = new Path2D()
  }

  draw() {
    let path = this.path = new Path2D()

    path.moveTo(this.x1, this.y1)
    path.lineTo(this.x2, this.y2)
    path.moveTo(this.x2, this.y2)

    ctx.lineCap = 'round'
    ctx.lineWidth = 20
    ctx.strokeStyle = "#000000";
    ctx.stroke(path)
  }

  drawBoundingBox() {
    let path = this.boundingPath = new Path2D()
    let radius = 5

    path.moveTo(this.x1, this.y1)
    path.lineTo(this.x2, this.y2)
    path.moveTo(this.x2, this.y2)

    path.moveTo(this.x1 + radius, this.y1)
    path.arc(this.x1, this.y1, radius, 0, 2 * Math.PI);

    path.moveTo(this.x2 + radius, this.y2)
    path.arc(this.x2, this.y2, radius, 0, 2 * Math.PI);

    path.moveTo((this.x2 - this.x1) / 2 + this.x1, (this.y2 - this.y1) / 2 + this.y1)
    path.arc((this.x2 - this.x1) / 2 + this.x1, (this.y2 - this.y1) / 2 + this.y1, radius, 0, 2 * Math.PI);

    ctx.strokeStyle = "#436191";
    ctx.fillStyle = "#FFffff";
    ctx.lineWidth = 1

    ctx.stroke(path)
    ctx.fill(path)
  }

}

