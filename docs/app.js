let svg;
let down = false;

let selectedObject;

let downX
let downY
let currentDrawingObject

var app = new Vue({
  el: '#app',
  data: {
    mode: 'line'
  },
  mounted() {
    svg = new SVG()
  },
  methods: {
    canvasMouseDown: function (event) {
      down = true;
      let x = event.x - event.target.offsetLeft;
      let y = event.y - event.target.offsetTop;

      //svg.stressTest()

      if (this.mode === "line") {
        downX = x
        downY = y

        currentDrawingObject = svg.drawLine(x, y, x, y)
        console.log(currentDrawingObject);

      }

      if (this.mode === "selectLine") {
        selectedObject = svg.selectLine(x, y)


      }

      if (this.mode === "removeLine") {
        svg.removeLine(selectedObject)


      }


    },



    canvasMouseMove: function (event) {
      if (down) {
        let currentX = event.x - event.target.offsetLeft;
        let currentY = event.y - event.target.offsetTop;
        //svg.redrawLine(downX, downY, currentX, currentY, false)
      }


    },




    canvasMouseUp: function (event) {
      down = false;
      let x = event.x - event.target.offsetLeft;
      let y = event.y - event.target.offsetTop;


    },

  }
})



