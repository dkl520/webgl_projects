class Brush {
    constructor(buffer, loader) {
        this.ANGLE_STEP = 3.0;
        this.g_arm1Angle = 90.0;
        this.g_jointMiddleAngle = 50.0;
        this.g_legAngle = 90.0;
        this.g_jointWristAngle = 0.0;
        this.g_joint3Angle = 0.0;
        this.g_fingernail1 = 0.0;
        this.g_fingernail2 = 0.0;
        this.g_modelMatrix = mat4();
        this.g_normalMatrix = mat4();
        this.buffer = buffer;
        this.loader = loader;
    }
    resetBrush() {
        this.ANGLE_STEP = 3.0;
        this.g_arm1Angle = 90.0;
        this.g_jointMiddleAngle = 50.0;
        this.g_legAngle = 90.0;
        this.g_jointWristAngle = 0.0;
        this.g_joint3Angle = 0.0;
        this.g_fingernail1 = 0.0;
        this.g_fingernail2 = 0.0;
        this.g_modelMatrix = mat4();
        this.g_normalMatrix = mat4();
    }
    drawMeshLandScape() {
        let bufferModel = this.buffer;
        let n = bufferModel.changeIndexBuffer("meshLandScope");
        let loader = this.loader;
        gl.bindBuffer(gl.ARRAY_BUFFER, bufferModel.meshVerticesBuffer);
        gl.vertexAttribPointer(loader.a_Position, bufferModel.meshVerticesBuffer.num, bufferModel.meshVerticesBuffer.type, false, 0, 0);
        gl.enableVertexAttribArray(loader.a_Position);
        bufferModel.createStaticTipsList(1.0, bufferModel.meshVerticesBuffer.length / bufferModel.meshVerticesBuffer.num);
        this.loader.activeProection();
        gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_SHORT, 0);
    }

    drawSegment(buffer, g_modelMatrix, u_NormalMatrixLocation) {
        let bufferModel = this.buffer;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(this.loader.a_Position, buffer.num, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.loader.a_Position);

        let originalNormalBuffer = this.buffer.originalNormalBuffer
        gl.bindBuffer(gl.ARRAY_BUFFER, originalNormalBuffer);
        gl.vertexAttribPointer(this.loader.a_Normal, originalNormalBuffer.num, originalNormalBuffer.type, false, 0, 0);
        gl.enableVertexAttribArray(this.loader.a_Normal);

        bufferModel.createStaticTipsList(0.0, buffer.length / buffer.num);
        this.loader.activeProection();
        gl.uniformMatrix4fv(this.loader.modelMatrixLocation, false, flatten(g_modelMatrix));

        var g_normalMatrix = inverse4(g_modelMatrix);
        g_normalMatrix = transpose(g_normalMatrix)
        gl.uniformMatrix4fv(u_NormalMatrixLocation, false, flatten(g_normalMatrix));
        let n = bufferModel.originalIndices.length;
        gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
    }
    drawObj() {
        let bufferModel = this.buffer;
        let transformMatrix = this.loader.transformMatrix;
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        if (!(targetModel in bufferModel.OBJ)) {
            return;
        }
        let { vertexBuffer, indexBuffer, normalBuffer } = bufferModel.OBJ[targetModel];
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.vertexAttribPointer(this.a_Position, vertexBuffer.num, vertexBuffer.type, false, 0, 0);
        gl.enableVertexAttribArray(this.a_Position);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        gl.vertexAttribPointer(this.loader.a_Normal, normalBuffer.num, normalBuffer.type, false, 0, 0);
        gl.enableVertexAttribArray(this.loader.a_Normal);
        bufferModel.createStaticTipsList(0.0, indexBuffer.length / 1);

        this.loader.activeProection();
        gl.uniformMatrix4fv(this.loader.modelMatrixLocation, false, flatten(transformMatrix));

        let g_normalMatrix = inverse4(transformMatrix);
        g_normalMatrix = transpose(g_normalMatrix)
        gl.uniformMatrix4fv(this.loader.u_NormalMatrixLocation, false, flatten(g_normalMatrix));

        gl.drawElements(gl.TRIANGLES, indexBuffer.length, gl.UNSIGNED_SHORT, 0);
    }
    draw = () => {

        let u_NormalMatrixLocation = this.loader.u_NormalMatrixLocation;
        let bufferModel = this.buffer;
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        let transformMatrix = this.loader.transformMatrix;
        var baseHeight = 2.0;
        var g_modelMatrix = deepCopy(transformMatrix);
        bufferModel.changeIndexBuffer("ARTICULATED")
        g_modelMatrix = mult(g_modelMatrix, translate(0.0, -12.0, 0.0));
        this.drawSegment(bufferModel.g_baseBuffer, g_modelMatrix, u_NormalMatrixLocation);

        var arm1Length = 10.0;
        g_modelMatrix = mult(g_modelMatrix, translate(0.0, baseHeight, 0.0));
        g_modelMatrix = mult(g_modelMatrix, rotate(this.g_arm1Angle, 0.0, 1.0, 0.0));
        this.drawSegment(bufferModel.g_arm1Buffer, g_modelMatrix, u_NormalMatrixLocation);

        var arm2Length = 10.0;
        g_modelMatrix = mult(g_modelMatrix, translate(0.0, arm1Length, 0.0));
        g_modelMatrix = mult(g_modelMatrix, rotate(this.g_jointMiddleAngle, 0.0, 0.0, 1.0));
        this.drawSegment(bufferModel.g_arm2Buffer, g_modelMatrix, u_NormalMatrixLocation);

        var arm3Length = 6.0;
        g_modelMatrix = mult(g_modelMatrix, translate(0.0, arm2Length, 0.0));
        g_modelMatrix = mult(g_modelMatrix, rotate(this.g_legAngle, 0.0, 0.0, 1.0));
        this.drawSegment(bufferModel.g_legBuffer, g_modelMatrix, u_NormalMatrixLocation);


        var palmLength = 2.0;
        g_modelMatrix = mult(g_modelMatrix, translate(0.0, arm3Length, 0.0));
        g_modelMatrix = mult(g_modelMatrix, rotate(this.g_jointWristAngle, 0.0, 1.0, 0.0));
        this.drawSegment(bufferModel.g_palmBuffer, g_modelMatrix, u_NormalMatrixLocation);
        g_modelMatrix = mult(g_modelMatrix, translate(0.0, palmLength, 0.0));

        var fingerLength = 1.0;
        pushMatrix(g_modelMatrix);
        g_modelMatrix = mult(g_modelMatrix, translate(0.0, 0.0, 2.0));
        g_modelMatrix = mult(g_modelMatrix, rotate(this.g_joint3Angle, 1.0, 0.0, 0.0));
        this.drawSegment(bufferModel.g_fingerBuffer, g_modelMatrix, u_NormalMatrixLocation);

        g_modelMatrix = mult(g_modelMatrix, translate(0.0, fingerLength, 0.0));
        g_modelMatrix = mult(g_modelMatrix, rotate(this.g_fingernail1, 0.0, 1.0, 0.0));
        this.drawSegment(bufferModel.g_fingerSmallerBuffer, g_modelMatrix, u_NormalMatrixLocation);
        g_modelMatrix = popMatrix();

        g_modelMatrix = mult(g_modelMatrix, translate(0.0, 0.0, -2.0));
        g_modelMatrix = mult(g_modelMatrix, rotate(-this.g_joint3Angle, 1.0, 0.0, 0.0));
        this.drawSegment(bufferModel.g_fingerBuffer, g_modelMatrix, u_NormalMatrixLocation);


        g_modelMatrix = mult(g_modelMatrix, translate(0.0, fingerLength, 0.0));
        g_modelMatrix = mult(g_modelMatrix, rotate(this.g_fingernail2, 0.0, 1.0, 0.0));
        this.drawSegment(bufferModel.g_fingerSmallerBuffer, g_modelMatrix, u_NormalMatrixLocation);

    }
    render = () => {
        if (targetModel == "original") {
            this.draw();
        } else {
            this.drawObj();
        }
        this.drawMeshLandScape();
        requestAnimationFrame(() => this.render());
    }

}





