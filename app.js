var mode = MODES.SELECT
var down = false;
var svg

var canvas

var startPoint
var stopPoint

var cachedObject


function setup() {
  svg = new SVG()
  canvas = document.getElementById("drawing")
} setup()

document.addEventListener('mousedown', function (event) {
  switch (event.target.id) {
    case "btn_select":
      mode = MODES.SELECT
      break

    case "btn_pen_line":
      mode = MODES.PEN.LINE
      break

    case "btn_pen_rect":
      mode = MODES.PEN.RECT
      break

    case "btn_pen_ellipse":
      mode = MODES.PEN.ELLIPSE
      break

    case "btn_draw":
      mode = MODES.DRAW
      break
  }
});

canvas.addEventListener('mousedown', function (event) {
  down = true;
  let x = event.x - event.target.offsetLeft
  let y = event.y - event.target.offsetTop
  console.log(mode);
  if (mode === MODES.SELECT) {
    var clickedObject = svg.checkIfObjectClicked(new Point(x, y))
  }
  else if (mode === MODES.PEN.LINE || mode === MODES.PEN.RECT || mode === MODES.PEN.ELLIPSE) {
    startPoint = new Point(x, y)

    switch (mode) {
      case MODES.PEN.LINE:
        cachedObject = new Line(startPoint, startPoint)
        break

      case MODES.PEN.RECT:
          cachedObject = new Rect(startPoint, startPoint)
          
        break

      case MODES.PEN.ELLIPSE:
          cachedObject = new Ellipse(startPoint, startPoint)
        break
    }

    svg.add(cachedObject)
  }
  else if (mode === MODES.DRAW) {
  }
});


canvas.addEventListener('mousemove', function (event) {

  let x = event.x - event.target.offsetLeft
  let y = event.y - event.target.offsetTop

  if (down == true && mode == MODES.SELECT) {


  }

  else if (down == true && (mode === MODES.PEN.LINE || mode === MODES.PEN.RECT || mode === MODES.PEN.ELLIPSE)) {
    svg.remove(cachedObject)

    switch (mode) {
      case MODES.PEN.LINE:
          cachedObject = new Line(startPoint, new Point(x, y))
        break

      case MODES.PEN.RECT:
          cachedObject = new Rect(startPoint, new Point(x, y))
        break

      case MODES.PEN.ELLIPSE:
          cachedObject = new Ellipse(startPoint, new Point(x, y))
        break
    }

    svg.add(cachedObject)
    svg.redraw();
  }

})


canvas.addEventListener('mouseup', function (event) {
  down = false
  let x = event.x - event.target.offsetLeft
  let y = event.y - event.target.offsetTop

  if (mode === MODES.SELECT) {
  }
  else if (mode === MODES.PEN.LINE || mode === MODES.PEN.RECT || mode === MODES.PEN.ELLIPSE) {
    endPoint = new Point(x, y)
    svg.remove(cachedObject)

    switch (mode) {
      case MODES.PEN.LINE:
        svg.add(new Line(startPoint, endPoint))
        break

      case MODES.PEN.RECT:
        svg.add(new Rect(startPoint, endPoint))
        
        break

      case MODES.PEN.ELLIPSE:
          svg.add(new Ellipse(startPoint, endPoint))
        break
    }

    svg.redraw()
  }
  else if(mode === MODES.DRAW){

  }


});


