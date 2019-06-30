var mode = "move"
var down = false;
var svg

var canvas

var startPoint
var stopPoint

var cacheLine


function setup() {
  svg = new SVG()
  canvas = document.getElementById("drawing")
} setup()

document.addEventListener('mousedown', function (event) {
  switch (event.target.id) {
    case "btn_move":
      mode = "move"
      break

    case "btn_pen":
      mode = "pen"
      break

    case "btn_draw":
      mode = "draw"
      break
  }
});

canvas.addEventListener('mousedown', function (event) {
  down = true;
  let x = event.x - event.target.offsetLeft
  let y = event.y - event.target.offsetTop

  switch (mode) {
    case "move":
      break

    case "pen":
      startPoint = new Point(x,y)
      break

    case "draw":

      break
  }
});


canvas.addEventListener('mousemove', function (event) {
  let x = event.x - event.target.offsetLeft
  let y = event.y - event.target.offsetTop

  if (down == true && mode == "draw") {
    
    
  }
  else if (down == true && mode == "pen") {
    console.log("noew");
    
    
    cacheLine = new Line(startPoint, new Point(100,120))
    svg.add(cacheLine)
    svg.redraw();
  }

})


canvas.addEventListener('mouseup', function (event) {
  down = false
  let x = event.x - event.target.offsetLeft
  let y = event.y - event.target.offsetTop

  switch (mode) {
    case "move":
      break

    case "pen":
      endPoint = new Point(x,y)

      
      svg.redraw();
      
      break

    case "draw":

      break
  }
});


