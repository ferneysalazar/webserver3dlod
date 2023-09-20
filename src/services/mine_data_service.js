const THREE = require('three');

let originalPositions;

let lowLevel1Positions;
let lowLevel2Positions;
let lowLevel3Positions;
let lowLevel4Positions;
let lowLevel5Positions;
let lowLevel6Positions;

const generateOriginalPositions = () => {

    const xLoopCounter = 200;
    const zLoopCounter = 2000;
    let minY;
    let maxY;

    // Generate our positions attributes array
    originalPositions = new Float32Array(xLoopCounter * zLoopCounter * 3);

    for (let i = 0; i < zLoopCounter; i++) {

        const ellipsePoints = generateEllipsePoints(xLoopCounter);

        for (let j = 0; j < ellipsePoints.length; j++) {

            const deltaY = THREE.MathUtils.randFloatSpread(0.07);
            const x = ellipsePoints[j].x / 5;
            const y = ellipsePoints[j].y / 10 + deltaY;
            const deltaZ = THREE.MathUtils.randFloatSpread(0.06);
            const z = parseFloat(-i / 10) + deltaZ;

            const offset = (i * xLoopCounter) * 3 + j * 12;
            originalPositions.set([x, y, z], offset);
            originalPositions.set([-x, y, z], offset + 3);
            originalPositions.set([x, -y, z], offset + 6);
            originalPositions.set([-x, -y, z], offset + 9);

            if (!minY || -y < minY) {
                minY = -y;
            }

            if (!maxY || y > maxY) {
                maxY = y;
            }
        }
    }

    return { level: 0, nodes: originalPositions.length / 3 };

}

const generateEllipsePoints = (quarterNumPoints) => {
    const points = [];

    const numPoints = quarterNumPoints; // Adjust as needed
    const semiMajorAxis = 5; // Adjust as needed
    const semiMinorAxis = 5;  // Adjust as needed


    for (let i = 0; i < numPoints / 4; i++) {

        const degrees = THREE.MathUtils.randInt(1, 44)
        const theta = (degrees * Math.PI) / 180;
        const x = semiMajorAxis * Math.cos(theta);
        const y = semiMinorAxis * Math.sin(theta);
        points.push({ x, y });
    }

    return points;
}

const generateLowRes = (level) => {

    if (!level) {
        return { error: true, errorMsg: "No level set!" }
    }

    if (level < 1 || level > 6) {
        return { error: true, errorMsg: "Level out of bounds!" }
    }

    if (!originalPositions || !originalPositions.length || originalPositions.length == 0) {
        return { error: true, errorMsg: "Original positions not initializated yet. Use /initdata" }
    }

    let originalNumberOfPoints = originalPositions.length / 3;
    const divider = Math.pow(2, level);
    let lowresNumberOfPoints = originalNumberOfPoints / divider;

    let levelPositions = new Float32Array(lowresNumberOfPoints * 3);

    for (let i = 0; i < lowresNumberOfPoints; i++) {

        let offset = i * divider;
        let x = originalPositions[offset];
        let y = originalPositions[offset + 1];
        let z = originalPositions[offset + 2];
        levelPositions.set([x, y, z], i * 3);

    }

    switch (level) {
        case 1:
            lowLevel1Positions = levelPositions;
            break;
        case 2:
            lowLevel2Positions = levelPositions;
            break;
        case 3:
            lowLevel3Positions = levelPositions;
            break;
        case 4:
            lowLevel4Positions = levelPositions;
            break;
        case 5:
            lowLevel5Positions = levelPositions;
            break;
        case 6:
            lowLevel6Positions = levelPositions;
            break;
    }

    return { level: level, nodes: levelPositions.length / 3 };
}

const getNodesInfo = () => {

    let data = {
        originalNodes: undefined,
        originalArray: undefined,
        lowLevel1Nodes: undefined,
        lowLevel1Array: undefined,
        lowLevel2Nodes: undefined,
        lowLevel2Array: undefined,
        lowLevel3Nodes: undefined,
        lowLevel3Array: undefined,
        lowLevel4Nodes: undefined,
        lowLevel4Array: undefined,
        lowLevel5Nodes: undefined,
        lowLevel5Array: undefined,
        lowLevel6Nodes: undefined,
        lowLevel6Array: undefined,
    }

    if (originalPositions && originalPositions.length && originalPositions.length > 0) {
        data.originalNodes = originalPositions.length / 3;
        data.originalArray = originalPositions.length;
    }

    if (lowLevel1Positions && lowLevel1Positions.length && lowLevel1Positions.length > 0) {
        data.lowLevel1Nodes = lowLevel1Positions.length / 3;
        data.lowLevel1Array = lowLevel1Positions.length;
    }
    if (lowLevel2Positions && lowLevel2Positions.length && lowLevel2Positions.length > 0) {
        data.lowLevel2Nodes = lowLevel2Positions.length / 3;
        data.lowLevel2Array = lowLevel2Positions.length;
    }
    if (lowLevel3Positions && lowLevel3Positions.length && lowLevel3Positions.length > 0) {
        data.lowLevel3Nodes = lowLevel3Positions.length / 3;
        data.lowLevel3Array = lowLevel3Positions.length;
    }
    if (lowLevel4Positions && lowLevel4Positions.length && lowLevel4Positions.length > 0) {
        data.lowLevel4Nodes = lowLevel4Positions.length / 3;
        data.lowLevel4Array = lowLevel4Positions.length;
    }
    if (lowLevel5Positions && lowLevel5Positions.length && lowLevel5Positions.length > 0) {
        data.lowLevel5Nodes = lowLevel5Positions.length / 3;
        data.lowLevel5Array = lowLevel5Positions.length;
    }
    if (lowLevel6Positions && lowLevel6Positions.length && lowLevel6Positions.length > 0) {
        data.lowLevel6Nodes = lowLevel6Positions.length / 3;
        data.lowLevel6Array = lowLevel6Positions.length;
    }

    return data;

}

const getLevelData = (level) => {

    let posObj;
    let error = false;

    switch (level) {
        case 0:
            if (originalPositions && originalPositions.length && originalPositions.length) {
                posObj = originalPositions;
            } else {
                error = true;
            }
            break;
        case 1:
            if (lowLevel1Positions && lowLevel1Positions.length && lowLevel1Positions.length) {
                posObj = lowLevel1Positions;
            } else {
                error = true;
            }
            break;
        case 2:
            if (lowLevel2Positions && lowLevel2Positions.length && lowLevel2Positions.length) {
                posObj = lowLevel2Positions;
            } else {
                error = true;
            }
            break;
        case 3:
            if (lowLevel3Positions && lowLevel3Positions.length && lowLevel3Positions.length) {
                posObj = lowLevel3Positions;
            } else {
                error = true;
            }
            break;
        case 4:
            if (lowLevel4Positions && lowLevel4Positions.length && lowLevel4Positions.length) {
                posObj = lowLevel4Positions;
            } else {
                error = true;
            }
            break;
        case 5:
            if (lowLevel5Positions && lowLevel5Positions.length && lowLevel5Positions.length) {
                posObj = lowLevel5Positions;
            } else {
                error = true;
            }
            break;
        case 6:
            if (lowLevel6Positions && lowLevel6Positions.length && lowLevel6Positions.length) {
                posObj = lowLevel6Positions;
            } else {
                error = true;
            }
            break;
    }

    if (!error) {
        console.log("posObj.length");
        console.log(posObj.length);
        return posObj
    } else {

        return { error: true, errorMsg: "No data calculated for the level " + level };
    }

}


module.exports = {
    generateOriginalPositions,
    generateLowRes,
    getNodesInfo,
    getLevelData

};