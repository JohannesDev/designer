let svg;
let down = false;

var startPoint
var stopPoint;
var cachedObject;

var app = new Vue({
  el: '#app',
  data: {
    mode: 'Hello Vue!'
  },
  mounted() {
    svg = new SVG()
  },
  methods: {
    canvasMouseDown: function (event) {

      down = true;
      let x = event.x - event.target.offsetLeft;
      let y = event.y - event.target.offsetTop;


      if (this.mode === "select") {
        let clickedObject = svg.checkIfObjectClicked(new Point(x, y));
      } else if (
        this.mode === "pen.line" ||
        this.mode === "pen.rect" ||
        this.mode === "pen.ellipse"
      ) {

        startPoint = new Point(x, y);

        switch (this.mode) {
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
      } else if (this.mode === "draw") {
      }
    },




    canvasMouseMove: function (event) {
      let x = event.x - event.target.offsetLeft;
      let y = event.y - event.target.offsetTop;
      console.log(startPoint);
    
      if (down == true && this.mode == "select") {
        //
      } else if (
        down == true && (this.mode === "pen.line" || this.mode === "pen.rect" || this.mode === "pen.ellipse")
      ) {
        svg.remove(cachedObject);
    
        switch (this.mode) {
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


    },





    canvasMouseUp: function (event) {

      down = false;
      let x = event.x - event.target.offsetLeft;
      let y = event.y - event.target.offsetTop;
    
      if (this.mode === "select") {
      } else if (
        this.mode === "pen.line" ||
        this.mode === "pen.rect" ||
        this.mode === "pen.ellipse"
      ) {
        stopPoint = new Point(x, y);
        svg.remove(cachedObject);
    
        switch (this.mode) {
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
      } else if (this.mode === "draw") {
      }
    }
  }
})




function canvasDown(event) {




}


function canvasMouseMove(event) {
  
}






function canvasMouseUp(event) {

}


