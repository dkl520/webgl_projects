var g_matrixStack = []; // 用于存储矩阵的数组
function pushMatrix(m) { // 将指定的矩阵存储到数组中
    var m2 = deepCopy(m);
    g_matrixStack.push(m2);
}
function popMatrix() { // 从数组中检索矩阵
    return g_matrixStack.pop();
}
function deepCopy(arr) {
    let newArr = JSON.parse(JSON.stringify(arr));
    newArr.type = "mat4"
    return newArr;
}