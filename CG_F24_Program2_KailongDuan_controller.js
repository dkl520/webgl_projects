class Controller {
    constructor(brush) {
        this.previousRx = 0;
        this.previousRy = 0;
        this.previousRz = 0;
        this.previousTx = 0;
        this.previousTy = 0;
        this.previousTz = 0;
        this.previousScaleNum = 0;
        this.timer = null;
        this.interval = null;
        this.brush = brush;
        this.loader = brush.loader;
        this.transformMatrix = brush.loader.transformMatrix;
    }
    rx = (e) => {
        let value = parseFloat(e.target.value); // 确保值是数字
        this.transformMatrix = mult(this.transformMatrix, rotate(value - this.previousRx, 1.0, 0.0, 0.0)); // 更新变换矩阵，绕X轴旋转
        this.previousRx = value; // 更新上一个值
        this.brush.loader.transformMatrix = this.transformMatrix;

    }
    ry = (e) => {
        let value = parseFloat(e.target.value); // 确保值是数字
        this.transformMatrix = mult(this.transformMatrix, rotate(value - this.previousRy, 0.0, 1.0, 0.0)); // 更新变换矩阵，绕Y轴旋转
        this.previousRy = value; // 更新上一个值
        this.brush.loader.transformMatrix = this.transformMatrix;

    }
    rz = (e) => {
        let value = parseFloat(e.target.value); // 确保值是数字
        this.transformMatrix = mult(this.transformMatrix, rotate(value - this.previousRz, 0.0, 0.0, 1.0)); // 更新变换矩阵，绕Z轴旋转
        this.previousRz = value; // 更新上一个值
        this.brush.loader.transformMatrix = this.transformMatrix;
    }
    tx = (e) => {
        let value = parseFloat(e.target.value); // 确保值是数字
        this.transformMatrix = mult(this.transformMatrix, translate(value - this.previousTx, 0.0, 0.0));
        this.previousTx = value;
        this.brush.loader.transformMatrix = this.transformMatrix;
    }
    ty = (e) => {
        let value = parseFloat(e.target.value); // Ensure the value is a number
        this.transformMatrix = mult(this.transformMatrix, translate(0.0, value - this.previousTy, 0.0)); // Update transformation matrix along Y-axis
        this.previousTy = value; // Update previous value
        this.brush.loader.transformMatrix = this.transformMatrix;
    }
    tz = (e) => {
        let value = parseFloat(e.target.value); // Ensure the value is a number
        this.transformMatrix = mult(this.transformMatrix, translate(0.0, 0.0, value - this.previousTz)); // Update transformation matrix along Z-axis
        this.previousTz = value; // Update previous value
        this.brush.loader.transformMatrix = this.transformMatrix;
    }
    scaleMatrix = (e) => {
        let value = parseFloat(e.target.value); 
        this.transformMatrix = mult(this.transformMatrix, scale(1 + value - this.previousScaleNum, 1 + value - this.previousScaleNum, 1 + value - this.previousScaleNum));
        this.previousScaleNum = value;
        this.brush.loader.transformMatrix = this.transformMatrix;
    };
    lightChange = (e) => {
        let lxValue = document.getElementById("lx").value;
        let lyValue = document.getElementById("ly").value;
        let lzValue = document.getElementById("lz").value;
        let lightSource = new Float32Array([lxValue, lyValue, lzValue, 1.0]);
        this.loader.lightVector = lightSource;
        gl.uniform4fv(this.loader.lightLocation, this.loader.lightVector);

    }
    colorChange = (e) => {
        const rgbValueDisplay = e.target.value;
        const r = parseInt(rgbValueDisplay.slice(1, 3), 16) / 255;
        const g = parseInt(rgbValueDisplay.slice(3, 5), 16) / 255;
        const b = parseInt(rgbValueDisplay.slice(5, 7), 16) / 255;
        this.loader.materialDiffuse = vec4(r, g, b, 0.8);
        console.log(r, g, b, 0.8, rgbValueDisplay);
        this.loader.colorCalc();
    }

    colorIntensityChange = (e) => {
        this.loader.materialShininess = e.target.value;
        gl.uniform1f(gl.getUniformLocation(gl.program, "uShininess"), e.target.value);
    }
    cameraChange = (e, type) => {
        switch (type) {
            case 'eye':
                let exValue = document.getElementById("ex").value;
                let eyValue = document.getElementById("ey").value;
                let ezValue = document.getElementById("ez").value;
                this.loader.cameraEyeVector = vec3(exValue, eyValue, ezValue);
                break;
            case 'at':
                let axValue = document.getElementById("ax").value;
                let ayValue = document.getElementById("ay").value;
                let azValue = document.getElementById("az").value;
                this.loader.cameraAtVector = vec3(axValue, ayValue, azValue);
                break;

            case 'up':
                let uxValue = document.getElementById("ux").value;
                let uyValue = document.getElementById("uy").value;
                let uzValue = document.getElementById("uz").value;
                this.loader.cameraUpVector = vec3(uxValue, uyValue, uzValue);
                break;
            default:
                break;
        }
        this.loader.cameraMatrix = lookAt(this.loader.cameraEyeVector, this.loader.cameraAtVector, this.loader.cameraUpVector);


    }
    projectionChange = (e) => {
        var left = -5;
        var right = 5;
        var bottom = -5;
        var top = 5;
        var near = 1;
        var far = 50;
        let value = e.target.value;
        if (value == "perspective") {
            this.loader.projectionMatrix = perspective(50.0, canvas.width / canvas.height, 1.0, 100.0);
        } else {
            this.loader.projectionMatrix = ortho(left, right, bottom, top, near, far);
        }
    }
    resetTransform() {
        document.getElementById("rx").value = 0
        document.getElementById("ry").value = 0
        document.getElementById("rz").value = 0
        document.getElementById("tx").value = 0
        document.getElementById("ty").value = 0
        document.getElementById("tz").value = 0
        document.getElementById("scale").value = 0
        document.getElementById("ex").value = -10
        document.getElementById("ey").value = 10
        document.getElementById("ez").value = 30
        document.getElementById("lx").value = 0.0
        document.getElementById("ly").value = 0.5
        document.getElementById("lz").value -= 0.7
        document.getElementById("ax").value = 0
        document.getElementById("ay").value = 0
        document.getElementById("az").value = 0
        document.getElementById("ux").value = 0
        document.getElementById("uy").value = 1
        document.getElementById("uz").value = 0
    }
    resetCtroller() {
        this.previousRx = 0;
        this.previousRy = 0;
        this.previousRz = 0;
        this.previousTx = 0;
        this.previousTy = 0;
        this.previousTz = 0;
        this.previousScaleNum = 0;
    }
    startHolding = (keyCode, e) => {
        e.preventDefault();
        keydown(keyCode);
        const _this = this;
        this.timer = setTimeout(() => {
            this.interval = setInterval(() => {
                _this.keydown(keyCode);
            }, 10);
        }, 200);

    }
    stopHolding = () => {
        if (this.timer) {
            clearTimeout(this.timer);
            timer = null;
        }
        if (this.interval) {
            clearInterval(this.interval);
            interval = null;
        }
    }

    modelChange = (e) => {
        this.resetTransform();
        this.loader.resetLoader();
        this.brush.resetBrush();
        this.resetCtroller();
        let objList = {
            airboat: "./model/airboat.obj",
            cow: './model/cow.obj',
            cube: './model/cube.obj',
            icosahedron: "./model/icosahedron.obj",
            octahedron: "./model/octahedron.obj",
            shuttle: "./model/shuttle.obj",
            teapot_0: './model/teapot_0.obj',
            teddybear: "/model/teddybear.obj",
            tetrahedron: "/model/tetrahedron.obj",
            violincase: "/model/violincase.obj",
            original: 'original',
        };
        let objName = e.target.value;
        let buffer = this.brush.buffer;
        if (objName == "original") {
            targetModel = "original";
            document.getElementById("buttons").style.display = "block";
        } else {
            let url = objList[objName];
            document.getElementById("buttons").style.display = "block";
            targetModel = objName;
            targetUrl = url;
            if (!(objName in buffer.OBJ)) {
                buffer.createBufferForObj(url, objName)
                    .then(obj => {
                        console.log('OBJ model loaded successfully:', obj);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            } else {
            }
        }
    }
    keydown = (ev) => {
        let brush = this.brush;
        debugger
        switch (ev.keyCode) {
            // 原有按键控制
            case 40: // 向上箭头键-> joint1 绕 z 轴正旋转
                if (brush.g_jointMiddleAngle < 135.0) brush.g_jointMiddleAngle += brush.ANGLE_STEP;
                break;
            case 38: // 向下箭头键-> joint1 绕 z 轴负旋转
                if (brush.g_jointMiddleAngle > -135.0) brush.g_jointMiddleAngle -= brush.ANGLE_STEP;
                break;
            case 37: // 右箭头键-> arm1 绕 y 轴正旋转
                brush.g_arm1Angle = (brush.g_arm1Angle + brush.ANGLE_STEP) % 360;
                break;
            case 39: // 左箭头键-> arm1 绕 y 轴负旋转
                brush.g_arm1Angle = (brush.g_arm1Angle - brush.ANGLE_STEP) % 360;
                break;
            case 89: // 'y'键->上臂和手掌之间关节正旋转
                if (brush.g_legAngle + brush.g_jointMiddleAngle < 135.0 && brush.g_legAngle < 135)
                    brush.g_legAngle += brush.ANGLE_STEP;
                break;
            case 72: // 'h'键->上臂和手掌之间关节负旋转
                if (brush.g_legAngle + brush.g_jointMiddleAngle > -135.0 && brush.g_legAngle > -135)
                    brush.g_legAngle -= brush.ANGLE_STEP;
                break;
            case 90: // 'z'键->关节 joint2 的正旋转
                brush.g_jointWristAngle = (brush.g_jointWristAngle + brush.ANGLE_STEP) % 360;
                break;
            case 88: // 'x'键->关节 joint2 的负旋转
                brush.g_jointWristAngle = (brush.g_jointWristAngle - brush.ANGLE_STEP) % 360;
                break;

            case 86: // 'v'键->关节 joint3 的正旋转
                if (brush.g_joint3Angle < 50.0) brush.g_joint3Angle = (brush.g_joint3Angle + brush.ANGLE_STEP) % 360;
                break;
            case 67: // 'c'键->关节 joint3 的负旋转
                if (brush.g_joint3Angle > -50.0) brush.g_joint3Angle = (brush.g_joint3Angle - brush.ANGLE_STEP) % 360;
                break;
            // 新增关节控制
            case 75: // 'k'键->手指上方关节正旋转
                brush.g_fingernail1 = (brush.g_fingernail1 + brush.ANGLE_STEP) % 360;
                break;
            case 74: // 'j'键->手指上方关节负旋转
                brush.g_fingernail2 = (brush.g_fingernail2 - brush.ANGLE_STEP) % 360;
                break;
            default:
                return;
        }

    }

}