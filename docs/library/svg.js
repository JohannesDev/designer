


class SVG {
  constructor() {
    canvas = document.getElementById("drawing");
    ctx = canvas.getContext("2d");

    let parent = canvas.parentNode.getBoundingClientRect();
    canvas.width = parent.width;
    canvas.height = parent.height;

    this.objectList = [];
    this.activeObject
    this.transformationOption
  }




  drawLine(x1, y1, x2, y2, lineWidth) {
    let line = new Line(x1, y1, x2, y2)
    line.lineWidth = lineWidth

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
          let point1 = ctx.isPointInPath(object.transformationPoint1, x, y);
          let point2 = ctx.isPointInPath(object.transformationPoint2, x, y);

          if (point1) {
            reference.transformationOption = 0
          }
          else if (point2) {
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
    this.transformationPoint1 = new Path2D()
    this.transformationPoint2 = new Path2D()

    this.lineWidth = 5
  }

  draw() {
    let path = this.path = new Path2D()

    path.moveTo(this.x1, this.y1)
    path.lineTo(this.x2, this.y2)
    path.moveTo(this.x2, this.y2)

    ctx.lineCap = 'round'
    ctx.lineWidth = this.lineWidth
    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke(path)
  }

  drawBoundingBox() {
    let path = this.boundingPath = new Path2D()
    let pathPoint1 = this.transformationPoint1 = new Path2D()
    let pathPoint2 = this.transformationPoint2 = new Path2D()
    let radius = 5

    path.moveTo(this.x1, this.y1)
    path.lineTo(this.x2, this.y2)
    path.moveTo(this.x2, this.y2)

    pathPoint1.moveTo(this.x1 + radius, this.y1)
    pathPoint1.arc(this.x1, this.y1, radius, 0, 2 * Math.PI);

    pathPoint2.moveTo(this.x2 + radius, this.y2)
    pathPoint2.arc(this.x2, this.y2, radius, 0, 2 * Math.PI);

    ctx.strokeStyle = "#436191";
    ctx.fillStyle = "#FFFFFF";
    ctx.lineWidth = 1

    ctx.stroke(path)
    ctx.fill(path)

    ctx.stroke(pathPoint1)
    ctx.fill(pathPoint1)

    ctx.stroke(pathPoint2)
    ctx.fill(pathPoint2)
  }

}


document.addEventListener('mousedown', function (event) {
  down = true
});

document.addEventListener('mousemove', function (event) {
  canvasX = event.x - event.target.offsetLeft;
  canvasY = event.y - event.target.offsetTop;
});

document.addEventListener('mouseup', function (event) {
  down = false
});


