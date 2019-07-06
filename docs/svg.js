let ctx
let canvas
let canvasY
let canvasX
let down = false

class SVG {
  constructor() {
    canvas = document.getElementById("drawing");
    ctx = canvas.getContext("2d");

    this.objectList = [];
    this.activeObject
    this.transformationOption
  }




  drawLine(x1, y1, x2, y2) {
    let line = new Line(x1, y1, x2, y2)
    this.activeObject = line
    this.objectList.push(line)

    this.redraw()
  }

  transformLine(x1, y1, x2, y2, currentObject) {
    let index = this.objectList.indexOf(currentObject)


    if (typeof currentObject !== 'undefined') {
      if (typeof x1 !== 'undefined') this.objectList[index].x1 = x1;
      if (typeof y1 !== 'undefined') this.objectList[index].y1 = y1
      if (typeof x2 !== 'undefined') this.objectList[index].x2 = x2
      if (typeof y2 !== 'undefined') this.objectList[index].y2 = y2

      this.redraw()
    }
  }


  selectLine(x, y) {
    //selecting Line
    this.redraw()
    let reference = this
    this.activeObject = undefined

    if (this.objectList.length > 0) {
      this.objectList.forEach(function (object, index) {
        let pointIsInObject = ctx.isPointInStroke(object.path, x, y);
        if (pointIsInObject) {

          reference.activeObject = object
          object.drawBoundingBox()

          //determining which Point of the line was clicked
          let distancePoint1 = Math.abs(reference.activeObject.x1 - x) + Math.abs(reference.activeObject.y1 - y)
          let distancePoint2 = Math.abs(reference.activeObject.x2 - x) + Math.abs(reference.activeObject.y2 - y)

          if (distancePoint1 < 10) {
            reference.transformationOption = 0
          }
          else if (distancePoint2 < 10) {
            reference.transformationOption = 2
          }
          else {
            reference.transformationOption = 1
          }


        }

      })
    }

  }

  removeLine(object) {
    if (object != null) {
      let index = this.objectList.indexOf(object)
      this.objectList.splice(index, 1);
      this.activeObject = undefined

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
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (this.objectList.length > 0) {
      this.objectList.forEach(function (object, index) {
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


document.addEventListener('mousedown', function (addEventListener) {
  down = true
});

document.addEventListener('mousemove', function (addEventListener) {
  canvasX = event.x - event.target.offsetLeft;
  canvasY = event.y - event.target.offsetTop;
});

document.addEventListener('mouseup', function (addEventListener) {
  down = false
});


