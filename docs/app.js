let svg;

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
      //svg.stressTest()

      if (this.mode === "line") {
        svg.drawLine(canvasX, canvasY, canvasX, canvasY)
      }

      if (this.mode === "selectLine") {
        svg.selectLine(canvasX, canvasY)
      }

      if (this.mode === "removeLine") {
        svg.removeLine(svg.activeObject)
      }
    },


    canvasMouseMove: function (event) {
      if (down === true && svg.activeObject != undefined && this.mode == "selectLine") {

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
      else if (down === true && this.mode == "line") {
        svg.transformLine(undefined, undefined, canvasX, canvasY, svg.activeObject)
      }
    },


    canvasMouseUp: function (event) {
      if (down === true && this.mode == "line") {
        svg.transformLine(undefined, undefined, canvasX, canvasY, svg.activeObject)
      }


    },

  }
})



