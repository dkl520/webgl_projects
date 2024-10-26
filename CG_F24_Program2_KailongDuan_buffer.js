class Buffers {
    constructor() {
        this.g_baseBuffer = null;
        this.g_arm1Buffer = null;
        this.g_arm2Buffer = null;
        this.g_palmBuffer = null;
        this.g_fingerBuffer = null;
        this.g_legBuffer = null;
        this.originalIndcesBuffer = null;
        this.meshVerticesBuffer = null;
        this.meshIndicesBuffer = null;
        this.originalNormalBuffer = null;
        this.OBJ = {};
        this.vertices_base = new Float32Array([
            5.0, 2.0, 5.0, -5.0, 2.0, 5.0, -5.0, 0.0, 5.0, 5.0, 0.0, 5.0,
            5.0, 2.0, 5.0, 5.0, 0.0, 5.0, 5.0, 0.0, -5.0, 5.0, 2.0, -5.0,
            5.0, 2.0, 5.0, 5.0, 2.0, -5.0, -5.0, 2.0, -5.0, -5.0, 2.0, 5.0,
            -5.0, 2.0, 5.0, -5.0, 2.0, -5.0, -5.0, 0.0, -5.0, -5.0, 0.0, 5.0,
            -5.0, 0.0, -5.0, 5.0, 0.0, -5.0, 5.0, 0.0, 5.0, -5.0, 0.0, 5.0,
            5.0, 0.0, -5.0, -5.0, 0.0, -5.0, -5.0, 2.0, -5.0, 5.0, 2.0, -5.0
        ]);
        this.vertices_arm1 = new Float32Array([
            1.5, 10.0, 1.5, -1.5, 10.0, 1.5, -1.5, 0.0, 1.5, 1.5, 0.0, 1.5,
            1.5, 10.0, 1.5, 1.5, 0.0, 1.5, 1.5, 0.0, -1.5, 1.5, 10.0, -1.5,
            1.5, 10.0, 1.5, 1.5, 10.0, -1.5, -1.5, 10.0, -1.5, -1.5, 10.0, 1.5,
            -1.5, 10.0, 1.5, -1.5, 10.0, -1.5, -1.5, 0.0, -1.5, -1.5, 0.0, 1.5,
            -1.5, 0.0, -1.5, 1.5, 0.0, -1.5, 1.5, 0.0, 1.5, -1.5, 0.0, 1.5,
            1.5, 0.0, -1.5, -1.5, 0.0, -1.5, -1.5, 10.0, -1.5, 1.5, 10.0, -1.5
        ]);
        this.vertices_arm2 = new Float32Array([
            2.0, 10.0, 2.0, -2.0, 10.0, 2.0, -2.0, 0.0, 2.0, 2.0, 0.0, 2.0,
            2.0, 10.0, 2.0, 2.0, 0.0, 2.0, 2.0, 0.0, -2.0, 2.0, 10.0, -2.0,
            2.0, 10.0, 2.0, 2.0, 10.0, -2.0, -2.0, 10.0, -2.0, -2.0, 10.0, 2.0,
            -2.0, 10.0, 2.0, -2.0, 10.0, -2.0, -2.0, 0.0, -2.0, -2.0, 0.0, 2.0,
            -2.0, 0.0, -2.0, 2.0, 0.0, -2.0, 2.0, 0.0, 2.0, -2.0, 0.0, 2.0,
            2.0, 0.0, -2.0, -2.0, 0.0, -2.0, -2.0, 10.0, -2.0, 2.0, 10.0, -2.0
        ]);
        this.vertices_leg = new Float32Array([
            1.0, 6.0, 1.0, -1.0, 6.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
            1.0, 6.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, -1.0, 1.0, 6.0, -1.0,
            1.0, 6.0, 1.0, 1.0, 6.0, -1.0, -1.0, 6.0, -1.0, -1.0, 6.0, 1.0,
            -1.0, 6.0, 1.0, -1.0, 6.0, -1.0, -1.0, 0.0, -1.0, -1.0, 0.0, 1.0,
            -1.0, 0.0, -1.0, 1.0, 0.0, -1.0, 1.0, 0.0, 1.0, -1.0, 0.0, 1.0,
            1.0, 0.0, -1.0, -1.0, 0.0, -1.0, -1.0, 6.0, -1.0, 1.0, 6.0, -1.0
        ]);
        this.vertices_palm = new Float32Array([
            1.0, 2.0, 3.0, -1.0, 2.0, 3.0, -1.0, 0.0, 3.0, 1.0, 0.0, 3.0,
            1.0, 2.0, 3.0, 1.0, 0.0, 3.0, 1.0, 0.0, -3.0, 1.0, 2.0, -3.0,
            1.0, 2.0, 3.0, 1.0, 2.0, -3.0, -1.0, 2.0, -3.0, -1.0, 2.0, 3.0,
            -1.0, 2.0, 3.0, -1.0, 2.0, -3.0, -1.0, 0.0, -3.0, -1.0, 0.0, 3.0,
            -1.0, 0.0, -3.0, 1.0, 0.0, -3.0, 1.0, 0.0, 3.0, -1.0, 0.0, 3.0,
            1.0, 0.0, -3.0, -1.0, 0.0, -3.0, -1.0, 2.0, -3.0, 1.0, 2.0, -3.0
        ]);
        this.vertices_finger = new Float32Array([
            0.5, 1.0, 0.5, -0.5, 1.0, 0.5, -0.5, 0.0, 0.5, 0.5, 0.0, 0.5,
            0.5, 1.0, 0.5, 0.5, 0.0, 0.5, 0.5, 0.0, -0.5, 0.5, 1.0, -0.5,
            0.5, 1.0, 0.5, 0.5, 1.0, -0.5, -0.5, 1.0, -0.5, -0.5, 1.0, 0.5,
            -0.5, 1.0, 0.5, -0.5, 1.0, -0.5, -0.5, 0.0, -0.5, -0.5, 0.0, 0.5,
            -0.5, 0.0, -0.5, 0.5, 0.0, -0.5, 0.5, 0.0, 0.5, -0.5, 0.0, 0.5,
            0.5, 0.0, -0.5, -0.5, 0.0, -0.5, -0.5, 1.0, -0.5, 0.5, 1.0, -0.5
        ]);
        this.vertices_finger_smaller = new Float32Array([
            0.5, 1.5, 0.1, -0.5, 1.5, 0.1, -0.5, 0.0, 0.1, 0.5, 0.0, 0.1,
            0.5, 1.5, 0.1, 0.5, 0.0, 0.1, 0.5, 0.0, -0.1, 0.5, 1.5, -0.1,
            0.5, 1.5, 0.1, 0.5, 1.5, -0.1, -0.5, 1.5, -0.1, -0.5, 1.5, 0.1,
            -0.5, 1.5, 0.1, -0.5, 1.5, -0.1, -0.5, 0.0, -0.1, -0.5, 0.0, 0.1,
            -0.5, 0.0, -0.1, 0.5, 0.0, -0.1, 0.5, 0.0, 0.1, -0.5, 0.0, 0.1,
            0.5, 0.0, -0.1, -0.5, 0.0, -0.1, -0.5, 1.5, -0.1, 0.5, 1.5, -0.1
        ]);
        this.originalNormals = new Float32Array([
            0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
            1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
            -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,
            0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,
            0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0
        ]);
        this.originalIndices = new Uint8Array([
            0, 1, 2, 0, 2, 3,
            4, 5, 6, 4, 6, 7,
            8, 9, 10, 8, 10, 11,
            12, 13, 14, 12, 14, 15,
            16, 17, 18, 16, 18, 19,
            20, 21, 22, 20, 22, 23
        ]);
        this.meshLandScapeVertices = new Float32Array();
        this.meshLandScapeIndices = new Uint16Array();
        this.initVertexBuffers();
    }
    initVertexBuffers() {
        this.g_baseBuffer = this.initArrayBufferForLaterUse(gl, this.vertices_base, 3, gl.FLOAT);
        this.g_arm1Buffer = this.initArrayBufferForLaterUse(gl, this.vertices_arm1, 3, gl.FLOAT);
        this.g_arm2Buffer = this.initArrayBufferForLaterUse(gl, this.vertices_arm2, 3, gl.FLOAT);
        this.g_palmBuffer = this.initArrayBufferForLaterUse(gl, this.vertices_palm, 3, gl.FLOAT);
        this.g_fingerBuffer = this.initArrayBufferForLaterUse(gl, this.vertices_finger, 3, gl.FLOAT);
        this.g_legBuffer = this.initArrayBufferForLaterUse(gl, this.vertices_leg, 3, gl.FLOAT);
        this.g_fingerSmallerBuffer = this.initArrayBufferForLaterUse(gl, this.vertices_finger_smaller, 3, gl.FLOAT);
        this.creatlandScapeVertices();
        this.meshVerticesBuffer = this.initArrayBufferForLaterUse(gl, this.meshLandScapeVertices, 3, gl.FLOAT);
        this.meshIndicesBuffer = this.createIndicesBuffer(this.meshLandScapeIndices);
        this.originalNormalBuffer = this.initArrayBufferForLaterUse(gl, this.originalNormals, 3, gl.FLOAT);
        this.originalIndcesBuffer = this.createIndicesBuffer(this.originalIndices);
    }
    initArrayBufferForLaterUse(gl, data, num, type) {
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        buffer.num = num;
        buffer.type = type;
        buffer.length = data.length;
        return buffer;
    }
    createIndicesBuffer(indices) {
        let indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
        indexBuffer.num = 1;
        indexBuffer.type = gl.UNSIGNED_INT;
        indexBuffer.length = indices.length;
        return indexBuffer;
    }
    changeIndexBuffer = (type) => {
        if (type == 'ARTICULATED') {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.originalIndcesBuffer);
            return this.originalIndcesBuffer.length
        } else {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.meshIndicesBuffer);
            return this.meshIndicesBuffer.length;
        }
    }
    createStaticTipsList(type, num) {
        let list = new Float32Array(num);
        list.fill(type);
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, list, gl.STATIC_DRAW);
        let staticBolLocation = gl.getAttribLocation(gl.program, "staticBol");
        gl.vertexAttribPointer(staticBolLocation, 1, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(staticBolLocation);
    }
    creatlandScapeVertices() {
        let meshLandScapeVertices = [];
        const size = 50;
        const step = 50 / 100;
        let meshLandScapeIndices = [];
        for (let z = 0; z <= 100; z++) {
            for (let x = 0; x <= 100; x++) {
                meshLandScapeVertices.push(
                    x * step - size / 2,
                    0,
                    z * step - size / 2
                );
            }
        }
        for (let z = 0; z < 100; z++) {
            for (let x = 0; x < 100; x++) {
                const topLeft = z * (100 + 1) + x;
                const topRight = topLeft + 1;
                const bottomLeft = (z + 1) * (100 + 1) + x;
                const bottomRight = bottomLeft + 1;
                meshLandScapeIndices.push(topLeft, bottomLeft, topRight);
                meshLandScapeIndices.push(topRight, bottomLeft, bottomRight);
            }
        }
        this.meshLandScapeVertices = new Float32Array(meshLandScapeVertices);
        this.meshLandScapeIndices = new Uint16Array(meshLandScapeIndices);
    }
    createBufferForObj(url, objName) {
        let _this = this;
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.text())
                .then(data => {
                    let { vertices, indices, normals } = _this.parseObj(data);
                    vertices = new Float32Array(vertices);
                    normals = new Float32Array(normals);
                    indices = new Uint16Array(indices);
                    let { vertexBuffer, indexBuffer, normalBuffer } = _this.initBuffers(vertices, indices, normals);
                    _this.OBJ[objName] = { vertices, indices, normals, vertexBuffer, indexBuffer, normalBuffer };
                    resolve(_this.OBJ[objName]);
                })
                .catch(error => {
                    console.error('Error loading OBJ file:', error);
                    reject(error);
                });
        });
    }
    initBuffers(vertices, indices, normals) {
        const vertexBuffer = this.initArrayBufferForLaterUse(gl, new Float32Array(vertices), 3, gl.FLOAT);
        const normalBuffer = this.initArrayBufferForLaterUse(gl, new Float32Array(normals), 3, gl.FLOAT);
        const indexBuffer = this.createIndicesBuffer(indices);
        return { vertexBuffer, indexBuffer, normalBuffer };
    }
    parseObj(data) {
        const vertices = [];
        let normals = [];
        const indices = [];
        const lines = data.split('\n');
        const faces = []
        lines.forEach(line => {
            const parts = line.trim().split(/\s+/);
            if (parts[0] === 'v') {
                vertices.push(parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3]));
            } else if (parts[0] === 'vn') {
                normals.push(parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3]));
            } else if (parts[0] === 'vt') {
            } else if (parts[0] === 'f') {
                const face = parts.slice(1).map(p => parseInt(p.split('/')[0]) - 1);
                faces.push(face);
                for (let i = 1; i < face.length - 1; i++) {
                    indices.push(face[0], face[i], face[i + 1]);
                }
            }
        });
        if (normals.length == 0) {
            normals = this.calculateNormalVertices(indices, vertices);
        }
        return { vertices, indices, normals };
    }
    calculateNormalVertices(face, vertices) {
        var tmpFace = [];
        var tmpFaceNormal = [];
        var tmpVertexNormal = [];
        var vertexNormal = [];
        for (let i = 0; i < vertices.length; i++) {
            tmpVertexNormal.push(0.0);
        }
        for (let i = 0; i < face.length; i += 3) {
            var tmpX = vertices[(face[i] * 3)];
            var tmpY = vertices[(face[i] * 3) + 1];
            var tmpZ = vertices[(face[i] * 3) + 2];
            var v1 = vec3(tmpX, tmpY, tmpZ);
            tmpX = vertices[(face[i + 1] * 3)];
            tmpY = vertices[(face[i + 1] * 3) + 1];
            tmpZ = vertices[(face[i + 1] * 3) + 2];
            var v2 = vec3(tmpX, tmpY, tmpZ);
            tmpX = vertices[(face[i + 2] * 3)];
            tmpY = vertices[(face[i + 2] * 3) + 1];
            tmpZ = vertices[(face[i + 2] * 3) + 2];
            var v3 = vec3(tmpX, tmpY, tmpZ);
            tmpFace.push([(face[i] * 3), (face[i + 1] * 3), (face[i + 2] * 3)]);
            var t1 = vec3();
            var t2 = vec3();
            var normal = vec3();
            t1 = subtract(v2, v1);
            t2 = subtract(v3, v1);
            normal = cross(t1, t2);
            t2 = normalize(normal)
            tmpFaceNormal.push(t2);
        }
        for (let i = 0; i < tmpFace.length; i++) {
            for (var q = 0; q < 3; q++) {
                tmpVertexNormal[tmpFace[i][q]] += tmpFaceNormal[i][0];
                tmpVertexNormal[tmpFace[i][q] + 1] += tmpFaceNormal[i][1];
                tmpVertexNormal[tmpFace[i][q] + 2] += tmpFaceNormal[i][2];
            }
        }
        for (let i = 0; i < tmpVertexNormal.length; i += 3) {
            t1 = vec3(tmpVertexNormal[i], tmpVertexNormal[i + 1], tmpVertexNormal[i + 2]);
            t2 = normalize(t1);
            vertexNormal.push(t2[0]);
            vertexNormal.push(t2[1]);
            vertexNormal.push(t2[2]);
        }
        return vertexNormal;
    }
}