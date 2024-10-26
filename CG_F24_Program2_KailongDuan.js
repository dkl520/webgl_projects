class WebGlModel {
    constructor() {
        this.buffer = null;
        this.loader = null;
        this.brush = null;
    }
    init() {
        var program = initShaders(gl, "vertex-shader", "fragment-shader");
        gl.useProgram(program);
        gl.program = program;
        this.buffer = new Buffers();
        this.loader = new Loader();
        this.brush = new Brush(this.buffer, this.loader);
        this.brush.render(targetModel);
        this.controller = new Controller(this.brush);
        this.onAmount();
    }
    onAmount() {
        document.onkeydown = function (ev) {
            keydown(ev);
        };
    }
}


var canvas
let gl
targetModel = "original";
targetUrl = "";
function main() {
    canvas = document.getElementById("gl-canvas");
    gl = canvas.getContext("webgl2");
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);
    let webglModel = new WebGlModel();
    webglModel.init();
    Object.assign(window, webglModel.controller);
}

window.onload = function () {
    main();
}