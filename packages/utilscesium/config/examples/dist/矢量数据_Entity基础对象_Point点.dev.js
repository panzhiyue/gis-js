"use strict";

//设置token
Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNmZlMThiNC05MjZjLTRhMzQtYjk1NC04Mzk1OWUzNGQyNDYiLCJpZCI6MTE2NjEsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1NTk1NTEwODh9.1sP9cG15Apatkf1x1g1_P_86wc3gFNOZM66XoWLUsxc";
var viewer = new Cesium.Viewer("mapContainer", {
  animation: false,
  //如果设置为false，将不创建“动画”窗口小部件。
  homeButton: false,
  //如果设置为false，将不会创建HomeButton小部件。
  fullscreenButton: false,
  //如果设置为false，将不会创建FullscreenButton小部件。
  geocoder: false,
  //是否显示地名查找控件
  sceneModePicker: false,
  //是否显示投影方式控件
  baseLayerPicker: false,
  //如果设置为false，则不会创建BaseLayerPicker小部件。
  timeline: false,
  //是否显示时间线控件
  infoBox: false,
  //是否显示点击要素之后显示的信息
  navigationHelpButton: false,
  //如果设置为false，将不会创建导航帮助按钮。
  selectionIndicator: false //如果设置为false，则不会创建SelectionIndicator小部件。

}); // 隐藏Cesium自身的logo

viewer._cesiumWidget._creditContainer.style.display = "none";

function addPoint() {
  Sandcastle.declare(addPoint);
  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
    point: {
      pixelSize: 10,
      color: Cesium.Color.YELLOW
    }
  });
}

function setPointProperties() {
  Sandcastle.declare(setPointProperties);
  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
    point: {
      show: true,
      // default
      color: Cesium.Color.SKYBLUE,
      // default: WHITE
      pixelSize: 10,
      // default: 1
      outlineColor: Cesium.Color.YELLOW,
      // default: BLACK
      outlineWidth: 3 // default: 0

    }
  });
}

function changePointProperties() {
  Sandcastle.declare(changePointProperties);
  var entity = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883, 300000.0),
    point: {
      pixelSize: 2
    }
  });
  var point = entity.point;
  point.pixelSize = 20.0;
  point.color = Cesium.Color.YELLOW.withAlpha(0.33);
}

function addMultiplePoints() {
  Sandcastle.declare(addMultiplePoints);
  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
    point: {
      color: Cesium.Color.RED,
      pixelSize: 8
    }
  });
  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(-80.5, 35.14),
    point: {
      color: Cesium.Color.BLUE,
      pixelSize: 16
    }
  });
  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(-80.12, 25.46),
    point: {
      color: Cesium.Color.LIME,
      pixelSize: 32
    }
  });
}

function scaleByDistance() {
  Sandcastle.declare(scaleByDistance);
  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
    point: {
      // pixelSize will multiply by the scale factor, so in this
      // example the size will range from 20px (near) to 5px (far).
      pixelSize: 10,
      scaleByDistance: new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5)
    }
  });
}

function fadeByDistance() {
  Sandcastle.declare(fadeByDistance);
  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
    point: {
      pixelSize: 20,
      translucencyByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2)
    }
  });
}

Sandcastle.addToolbarMenu([{
  text: "Add point",
  onselect: function onselect() {
    addPoint();
    Sandcastle.highlight(addPoint);
  }
}, {
  text: "Set point properties at creation",
  onselect: function onselect() {
    setPointProperties();
    Sandcastle.highlight(setPointProperties);
  }
}, {
  text: "Change point properties",
  onselect: function onselect() {
    changePointProperties();
    Sandcastle.highlight(changePointProperties);
  }
}, {
  text: "Add multiple points",
  onselect: function onselect() {
    addMultiplePoints();
    Sandcastle.highlight(addMultiplePoints);
  }
}, {
  text: "Scale by viewer distance",
  onselect: function onselect() {
    scaleByDistance();
    Sandcastle.highlight(scaleByDistance);
  }
}, {
  text: "Fade by viewer distance",
  onselect: function onselect() {
    fadeByDistance();
    Sandcastle.highlight(fadeByDistance);
  }
}]);

Sandcastle.reset = function () {
  viewer.entities.removeAll();
};