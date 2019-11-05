/**
 * @Author: wyy
 * @Date: 2019/11/2
 * @Description: 全局默认基础数据（包括坐标轴、默认基础色值等）
 **/

/*******************************-①BaseColors-*******************************/
/*******************************-②BaseDatas-********************************/
export const GLOBAL_CENTER_COORD = {
    x: 0,
    y: 0,
    z: 0
};
export const X_AXIS_COORD = {
    startCoord: GLOBAL_CENTER_COORD,
    endCoord: {
        x: 800,
        y: 0,
        z: 0
    }
};
export const Y_AXIS_COORD = {
    startCoord: GLOBAL_CENTER_COORD,
    endCoord: {
        x: 0,
        y: 500,
        z: 0
    }
};
export const Z_AXIS_COORD = {
    startCoord: GLOBAL_CENTER_COORD,
    endCoord: {
        x: 0,
        y: 0,
        z: 500
    }
};

export const BASE_UP_ZOOM = 0.5;

export const MODEL_GROUP_ARR= [
    {
        mtlName: "circulatorly_heart.mtl",
        objName: "heart_final.obj"
    },{
        mtlName: "respiratory_Lungs.mtl",
        objName: "lungs_final.obj"
    }
];
/*******************************-①BaseColors-*******************************/
/*******************************-①BaseColors-*******************************/
/*******************************-①BaseColors-*******************************/
/*******************************-①BaseColors-*******************************/
/*******************************-①BaseColors-*******************************/
/*******************************-①BaseColors-*******************************/
/*******************************-①BaseColors-*******************************/
