let canvas
let ctx


class SVG {
  constructor() {
    this.canvas = document.getElementById("drawing");
    this.ctx = this.canvas.getContext("2d");
    this.objectList = [];
  }


  drawLine(x1, y1, x2, y2) {
    let line = new Line(x1, y1, x2, y2)
    this.objectList.push(line)
    this.redraw()
    return line
  }

  transformLine(x1, y1, x2, y2, currentObject) {

    if (typeof currentObject !== 'undefined') {
      if (typeof x1 !== 'undefined') currentObject.x1 = x1
      if (typeof y1 !== 'undefined') currentObject.y1 = y1
      if (typeof x2 !== 'undefined') currentObject.x2 = x2
      if (typeof y2 !== 'undefined') currentObject.y2 = y2

      this.redraw()
    }
  }


  selectLine(x, y) {
    let selectedObject
    this.redraw()

    if (this.objectList.length > 0) {
      this.objectList.forEach(function (object, index) {
        let pointIsInObject = this.ctx.isPointInStroke(object.path, x, y);
        if (pointIsInObject) {
          selectedObject = object
          object.drawBoundingBox()
        }

      })
    }

    return selectedObject;
  }

  getClickedPath(x, y, clickedObject) {
    let object = clickedObject




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

  removeLine(object) {
    if (object != null) {
      this.objectList.indexOf(object)
      this.objectList.splice(index, 1);

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
      this.objectList.push(line)
    }
    this.redraw()

    alert("donw")
  }


  redraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let reference = this

    if (this.objectList.length > 0) {
      this.objectList.forEach(function (object, index) {
        object.draw(reference.ctx)

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

  draw(ctx) {
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

