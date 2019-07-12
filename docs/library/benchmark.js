let svg = new SVG()

document.addEventListener("mousedown", function (event) {
    stressTest()

});


function stressTest() {
    let startTime = performance.now();

    for (let i = 0; i < 1000; i++) {
        let rx = (Math.random() * 900) + 0
        let ry = (Math.random() * 400) + 0

        svg.drawLine(rx, ry, rx + 100, ry + 100)

    }

    let endTime = performance.now();

    alert("Performance: " + (endTime - startTime) + "ms")
}
