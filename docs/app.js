let svg;
let down = false;

var startPoint
var stopPoint;
var cachedObject;

var app = new Vue({
  el: '#app',
  data: {
    mode: 'select'
  },
  mounted() {
    svg = new SVG()
  },
  methods: {
    canvasMouseDown: function (event) {
      down = true;
      let x = event.x - event.target.offsetLeft;
      let y = event.y - event.target.offsetTop;

      svg.stressTest()


    },



    canvasMouseMove: function (event) {
      /*
      let x
      let y

      if (down === true) {
        x = event.x - event.target.offsetLeft;
        y = event.y - event.target.offsetTop;        
      }

      if (down === true && this.mode === "select") {
        //
      } else if (
        down === true && (this.mode === "pen.line" || this.mode === "pen.rect" || this.mode === "pen.ellipse")
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

*/
    },




    canvasMouseUp: function (event) {
      down = false;
      let x = event.x - event.target.offsetLeft;
      let y = event.y - event.target.offsetTop;

      svg.removeLine()

    },

  }
})




function canvasDown(event) {




}


function canvasMouseMove(event) {

}






function canvasMouseUp(event) {

}


