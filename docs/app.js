let svg;
let down = false;

let selectedObject;
let selectedPath

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
      }

      if (this.mode === "selectLine") {
        selectedObject = svg.selectLine(x, y)

        selectedPath = svg.getClickedPath(x, y, selectedObject)

      }

      if (this.mode === "removeLine") {
        svg.removeLine(selectedObject)

      }
    },



    canvasMouseMove: function (event) {
      if (down == true && selectedObject != undefined) {
        let currentX = event.x - event.target.offsetLeft;
        let currentY = event.y - event.target.offsetTop;



        switch (selectedPath) {
          case 0: break
          case 1: svg.transformLine(currentX, currentY, undefined, undefined, selectedObject); break
          case 2: svg.transformLine(undefined, undefined, currentX, currentY, selectedObject); break
        }

      }
      else if (down == true && this.mode == "line") {
        let currentX = event.x - event.target.offsetLeft;
        let currentY = event.y - event.target.offsetTop;

        svg.transformLine(downX, downY, currentX, currentY, currentDrawingObject)
      }



    },


    canvasMouseUp: function (event) {
      down = false;
      let upX = event.x - event.target.offsetLeft;
      let upY = event.y - event.target.offsetTop;

      svg.transformLine(downX, downY, upX, upY, currentDrawingObject)
      currentDrawingObject = undefined
    },

  }
})



