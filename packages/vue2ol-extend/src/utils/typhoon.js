
/**
 * 根据中心点与风圈信息获取风圈点集
 * @param {Object} wndRadius 风圈信息
 * @param {ol/Coordinates>} 中心点坐标
 * @returns {Array<ol/Coordinates>} 点集
 */
export function parseWndRadius(wndRadius, center) {
  var pointsArray = [];
  var _interval = 1;
  for (var i = 0; i < 360 / _interval; i++) {
    var _r = 0;
    var _ang = i * _interval;
    if (_ang > 0 && _ang <= 90) {
      _r = +wndRadius.ne / 111;
    } else if (_ang > 90 && _ang <= 180) {
      _r = +wndRadius.wn / 111;
    } else if (_ang > 180 && _ang <= 270) {
      _r = +wndRadius.ws / 111;
    } else {
      _r = +wndRadius.es / 111;
    }
    var x = +center[1] + _r * Math.cos((_ang * 3.14) / 180);
    var y = +center[0] + _r * Math.sin((_ang * 3.14) / 180);
    pointsArray.push([y, x]);
  }
  return pointsArray;
}

/**
 * @description 根据风速获取台风级别
 * @param windSpeed {String|Number}
 * @return {String}
 */
export function getTyphoonLevel(windSpeed) {
  var level = "";
  var speed = Number(windSpeed);
  if (isNaN(speed)) return level;

  if (speed <= 17.1) {
    //热带低压(TD) : 底层中心附近最大平均风速10.8-17.1 米/秒，也即风力为6-7 级
    level = "TD";
  } else if (speed > 17.1 && speed <= 24.4) {
    //热带风暴(TS) : 底层中心附近最大平均风速17.2-24.4 米/秒，也即风力8-9 级
    level = "TS";
  } else if (speed > 24.4 && speed <= 32.6) {
    //强热带风暴(STS): 底层中心附近最大平均风速24.5-32.6 米/秒，也即风力10-11 级
    level = "STS";
  } else if (speed > 32.6 && speed <= 41.4) {
    //台风（TY）: 底层中心附近最大平均风速32.7-41.4 米/秒，也即12-13 级
    level = "TY";
  } else if (speed > 41.4 && speed <= 50.9) {
    //强台风（STY）: 底层中心附近最大平均风速41.5-50.9 米/秒，也即14-15 级
    level = "STY";
  } else if (speed > 50.9) {
    //超强台风（Super TY）: 底层中心附近最大平均风速≥51.0 米/秒，也即16级或以上
    level = "SuperTY";
  }
  return level;
}

//台风等级颜色表
export const colorTable = {
  TD: "#EED139",
  TS: "#0000FF",
  STS: "#0f8000",
  TY: "#FE9C45",
  STY: "#FE00FE",
  SuperTY: "#FE0000",
};

// export const findRadiusBySpeed = (speed) => {
//   if (speed < 0.2) {
//     speed = 0;
//   } else if (speed < 1.5) {
//     speed = 1;
//   } else if (speed < 3.3) {
//     speed = 2;
//   } else if (speed < 5.4) {
//     speed = 3;
//   } else if (speed < 7.9) {
//     speed = 4;
//   } else if (speed < 10.7) {
//     speed = 5;
//   } else if (speed < 13.8) {
//     speed = 6;
//   } else if (speed < 17.1) {
//     speed = 7;
//   } else if (speed < 20.7) {
//     speed = 8;
//   } else if (speed < 24.4) {
//     speed = 9;
//   } else if (speed < 28.4) {
//     speed = 10;
//   } else if (speed < 32.6) {
//     speed = 11;
//   } else if (speed < 36.9) {
//     speed = 12;
//   } else if (speed < 41.4) {
//     speed = 13;
//   } else if (speed < 46.1) {
//     speed = 14;
//   } else if (speed < 50.9) {
//     speed = 15;
//   } else if (speed < 56.0) {
//     speed = 16;
//   } else if (speed < 61.2) {
//     speed = 17;
//   } else {
//     speed = 18;
//   }
//   return {
//     level: speed, // 风速等级
//     radius: 4, // 路径点半径
//   };
// };
// const RadiusTableConfig = {
//   "0": 3,
//   "1": 3,
//   "2": 3,
//   "3": 3,
//   "4": 3,
//   "5": 3,
//   "6": 3,
//   "7": 4,
//   "8": 3,
//   "9": 4,
//   "10": 3,
//   "11": 4,
//   "12": 3,
//   "13": 4,
//   "14": 3,
//   "15": 4,
//   "16": 3,
//   "17": 4,
//   "18": 5,
// };

export const levelTable = {
  TD: "热带低压",
  TS: "热带风暴",
  STS: "强热带风暴",
  TY: "台风",
  STY: "强台风",
  SuperTY: "超强台风",
  BX: "变性",
  RYTD: "弱于TD",
};

export const dirTable = {
  W: "西",
  E: "东",
  N: "北",
  S: "南",
};

//预报机构
export const organTable = {
  BABJ: "中央气象台",
  RKSL: "韩国气象厅",
  RCTP: "台湾中央气象局",
  VHHH: "香港天文台",
  VMMC: "澳门地球物理暨气象局",
  RPMM: "菲律宾大气地球物理和天文管理局",
  SBBR: "巴西海军",
  PGTW: "联合台风警告中心",
};
