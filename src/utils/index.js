/**
 * @Author: wyy
 * @Date: 2019/11/2
 * @Description: 3D绘制点、线、面方法封装
 **/
import * as THREE from "three";

export const drawLine = (scene, startCoord, endCoord) => {
    let geometry = new THREE.Geometry(),
        material = new THREE.LineBasicMaterial({
            vertexColors: true
        }),
        startColor = new THREE.Color(0xaa00ff),
        endColor = new THREE.Color(0x412070),
        startPoint = new THREE.Vector3(startCoord.x, startCoord.y, startCoord.z),
        endPoint = new THREE.Vector3(endCoord.x, endCoord.y, endCoord.z);
    geometry.vertices.push(startPoint);
    geometry.vertices.push(endPoint);
    geometry.colors.push(startColor, endColor);
    let line = new THREE.Line(geometry, material, THREE.LineSegments);
    scene.add(line);
};

export const isEqualObj = (obj_1, obj_2) => {
    return JSON.stringify(obj_1) === JSON.stringify(obj_2);
};
