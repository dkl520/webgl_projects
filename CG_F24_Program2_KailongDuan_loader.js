class Loader {
    constructor() {
        this.a_Position = null;
        this.cameraMatrixLocation = null;
        this.cameraMatrix = null;
        this.cameraEyeVector = null;
        this.cameraAtVector = null;
        this.cameraUpVector = null;
        this.projectionMatrixLocation = null;
        this.projectionMatrix = null;
        this.modelMatrixLocation = null;
        this.transformMatrixLocation = null;
        this.transformMatrix = null;
        this.lightLocation = null;
        this.lightVector = null;
        this.staticBolLocation = null;
        this.u_NormalMatrixLocation = null;
        this.a_Normal = null;
        this.lightAmbient = null;
        this.lightDiffuse = null;
        this.lightSpecular = null
        this.materialAmbient = null;
        this.materialDiffuse = null;
        this.materialSpecular = null;
        this.materialShininess = 0;
        this.initLocation();
        this.initLight();
        this.initProjection();
    }
    initLocation() {
        this.a_Position = gl.getAttribLocation(gl.program, "a_Position");
        this.cameraMatrixlocation = gl.getUniformLocation(gl.program, "cameraMatrix");
        this.projectionMatrixLocation = gl.getUniformLocation(gl.program, "projectionMatrix");
        this.modelMatrixLocation = gl.getUniformLocation(gl.program, "modelMatrix");
        this.transformMatrixLocation = gl.getUniformLocation(gl.program, "transformMatrix");
        this.staticBolLocation = gl.getAttribLocation(gl.program, "staticBol");
        this.u_NormalMatrixLocation = gl.getUniformLocation(gl.program, "u_NormalMatrix");
        this.a_Normal = gl.getAttribLocation(gl.program, "a_Normal");
        this.lightLocation = gl.getUniformLocation(gl.program, "lightLocation");
    }
    initLight() {
        this.lightVector = new Float32Array([1.0, 20.0, 10.0, 0.0]);
        this.lightAmbient = vec4(0.2, 0.2, 0.2, 1.0);
        this.lightDiffuse = vec4(1.0, 1.0, 1.0, 1.0);
        this.lightSpecular = vec4(1.0, 1.0, 1.0, 1.0);
        this.materialAmbient = vec4(1.0, 0.0, 1.0, 1.0);
        this.materialDiffuse = vec4(1, 0.9176470588235294, 0, 0.8);
        this.materialSpecular = vec4(1.0, 1.0, 1.0, 1.0);
        this.materialShininess = 20.0;
        this.colorCalc();
    }
    initProjection() {
        this.projectionMatrix = perspective(45, 1.0, 0.1, 1000.0);
        this.cameraEyeVector = vec3(0, 20.0, 50.0);
        this.cameraAtVector = vec3(0.0, 0.0, 0.0);
        this.cameraUpVector = vec3(0.0, 1.0, 0.0);
        this.cameraMatrix = lookAt(this.cameraEyeVector, this.cameraAtVector, this.cameraUpVector);
        this.transformMatrix = mat4();
    }
    colorCalc() {
        var ambientProduct = mult(this.lightAmbient, this.materialAmbient);
        var diffuseProduct = mult(this.lightDiffuse, this.materialDiffuse);
        var specularProduct = mult(this.lightSpecular, this.materialSpecular);
        gl.uniform4fv(this.lightLocation, this.lightVector);
        gl.uniform4fv(gl.getUniformLocation(gl.program, "uAmbientProduct"), flatten(ambientProduct));
        gl.uniform4fv(gl.getUniformLocation(gl.program, "uDiffuseProduct"), flatten(diffuseProduct));
        gl.uniform4fv(gl.getUniformLocation(gl.program, "uSpecularProduct"), flatten(specularProduct));
        gl.uniform1f(gl.getUniformLocation(gl.program, "uShininess"), this.materialShininess);
    }
    activeProection() {
        gl.uniformMatrix4fv(this.cameraMatrixlocation, false, flatten(this.cameraMatrix));
        gl.uniformMatrix4fv(this.projectionMatrixLocation, false, flatten(this.projectionMatrix));
    }
    resetLoader() {
        this.initLight();
        this.initProjection();
        // this.activeProection();
    }
}