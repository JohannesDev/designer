
  let svg;
  let mode;
  let down = false;

  var startPoint
  var stopPoint;
  var cachedObject;

  onMount(() => {
    svg = new SVG();
  });

  function canvasDown(event) {    
    down = true;
    let x = event.x - event.target.offsetLeft;
    let y = event.y - event.target.offsetTop;

  
    if (mode === "select") {
      let clickedObject = svg.checkIfObjectClicked(new Point(x, y));
    } else if (
      mode === "pen.line" ||
      mode === "pen.rect" ||
      mode === "pen.ellipse"
    ) {
      
      startPoint = new Point(x, y);
      
      switch (mode) {
        case "pen.line":
          cachedObject = new Line(startPoint, startPoint);
          break;

        case "pen.rect":
          cachedObject = new Rect(startPoint, startPoint);

          break;

        case "pen.ellipse":
          cachedObject = new Ellipse(startPoint, startPoint);
          break;
      }

      svg.add(cachedObject);
    } else if (mode === "draw") {
    }
  }

  function canvasMouseMove(event) {
    let x = event.x - event.target.offsetLeft;
    let y = event.y - event.target.offsetTop;
    console.log(startPoint);

    if (down == true && mode == "select") {
      //
    } else if (
      down == true && (mode === "pen.line" || mode === "pen.rect" || mode === "pen.ellipse")
    ) {
      svg.remove(cachedObject);

      switch (mode) {
        case "pen.line":
          cachedObject = new Line(startPoint, new Point(x, y));
          break;

        case "pen.rect":
          cachedObject = new Rect(startPoint, new Point(x, y));
          break;

        case "pen.ellipse":
          cachedObject = new Ellipse(startPoint, new Point(x, y));
          break;
      }

      svg.add(cachedObject);
      svg.redraw();
    }
  }

  function canvasMouseUp(event) {
    
    
    
    
    down = false;
    let x = event.x - event.target.offsetLeft;
    let y = event.y - event.target.offsetTop;

    if (mode === "select") {
    } else if (
      mode === "pen.line" ||
      mode === "pen.rect" ||
      mode === "pen.ellipse"
    ) {
      stopPoint = new Point(x, y);
      svg.remove(cachedObject);

      switch (mode) {
        case "pen.line":          
          svg.add(new Line(startPoint, stopPoint));
          break;

        case "pen.rect":
          svg.add(new Rect(startPoint, stopPoint));

          break;

        case "pen.ellipse":
          svg.add(new Ellipse(startPoint, stopPoint));
          break;
      }

      svg.redraw();
    } else if (mode === "draw") {
    }
  }

