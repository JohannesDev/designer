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
    return objectList.length
  }

  redrawLine(x1, y1, x2, y2, index) {
  }


  selectLine(x, y) {
    let objectIndex

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



  loog(string) {
    console.log(string);

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

    //ctx.beginPath()
    this.path.moveTo(x1, y1)
    this.path.lineTo(x2, y2)
    this.path.moveTo(x2, y2)



  }
  draw() {
    let path = this.path

    ctx.lineCap = 'round'
    ctx.lineWidth = 20
    ctx.strokeStyle = "#000000";
    ctx.stroke(path)
  }

  drawBoundingBox() {
    let path = this.boundingPath
    let radius = 5

    path.moveTo(this.x1, this.y1)
    path.lineTo(this.x2, this.y2)
    path.moveTo(this.x2, this.y2)

    path.moveTo(this.x2 + radius, this.y2)
    path.arc(this.x2, this.y2, radius, 0, 2 * Math.PI);

    ctx.strokeStyle = "#436191";
    ctx.fillStyle = "#FFffff";
    ctx.lineWidth = 1
    ctx.stroke(path)
    ctx.fill(path)
  }

}

