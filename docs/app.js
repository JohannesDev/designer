
let svg = new SVG()

canvas.addEventListener('mousedown', function (event) {


  if (mode === "line") {
    svg.drawLine(canvasX, canvasY, canvasX, canvasY)
  }

  if (mode === "selectLine") {
    svg.selectLine(canvasX, canvasY)
  }

  if (mode === "removeLine") {
    svg.removeLine(svg.activeObject)
  }
});


canvas.addEventListener('mousemove', function (event) {
  if (down === true && svg.activeObject != undefined && mode == "selectLine") {

    switch (svg.transformationOption) {
      case 0: svg.transformLine(canvasX, canvasY, undefined, undefined, svg.activeObject); break
      case 1:
        let deltaX = canvasX - svg.activeObject.x1 - (svg.activeObject.x2 - svg.activeObject.x1) / 2
        let deltaY = canvasY - svg.activeObject.y1 - (svg.activeObject.y2 - svg.activeObject.y1) / 2
        svg.transformLine(svg.activeObject.x1 + deltaX, svg.activeObject.y1 + deltaY, svg.activeObject.x2 + deltaX, svg.activeObject.y2 + deltaY, svg.activeObject);
        break
      case 2: svg.transformLine(undefined, undefined, canvasX, canvasY, svg.activeObject); break
    }

  }
  else if (down === true && mode == "line") {
    svg.transformLine(undefined, undefined, canvasX, canvasY, svg.activeObject)
  }
});


document.addEventListener('mouseup', function (event) {

  if (down === true && mode == "line") {
    svg.transformLine(undefined, undefined, canvasX, canvasY, svg.activeObject)
  }


});



