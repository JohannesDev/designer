var mode = MODES.SELECT
var down = false;
var svg

var canvas

var startPoint
var stopPoint

var cachedLine


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

    case "btn_pen_circle":
      mode = MODES.PEN.CIRCLE
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

  switch (mode) {
    case MODES.SELECT:
      var clickedObject = svg.checkIfObjectClicked(new Point(x,y))
      
      break

    case MODES.PEN:
      break

    case MODES.PEN.LINE:
      startPoint = new Point(x, y)
      cachedLine = new Line(startPoint, startPoint)
      svg.add(cachedLine)
      break

    case MODES.PEN.RECT:
      break

    case MODES.PEN.CIRCLE:
      break

    case MODES.DRAW:

      break
  }
});


canvas.addEventListener('mousemove', function (event) {

  let x = event.x - event.target.offsetLeft
  let y = event.y - event.target.offsetTop

  if (down == true && mode == MODES.SELECT) {
    
    
  }

  else if (down == true && mode == MODES.PEN.LINE) {
    svg.remove(cachedLine)
    cachedLine = new Line(startPoint, new Point(x, y))
    svg.add(cachedLine)
    svg.redraw();
  }

})


canvas.addEventListener('mouseup', function (event) {
  down = false
  let x = event.x - event.target.offsetLeft
  let y = event.y - event.target.offsetTop

  switch (mode) {
    case MODES.SELECT:
      break

    case MODES.PEN.LINE:
      endPoint = new Point(x, y)
      svg.remove(cachedLine)
      svg.add(new Line(startPoint, endPoint))
      svg.redraw()
      console.log(objectList);
      
      break

    case MODES.DRAW:

      break
  }
});


