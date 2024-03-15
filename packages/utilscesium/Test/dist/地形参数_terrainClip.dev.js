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

viewer._cesiumWidget._creditContainer.style.display = "none"; // var points = Cesium.Cartesian3.fromDegreesArray([
//   118.86649836587841,
//   29.974068702700407,
//   118.865312946459,
//   29.97469947739822,
//   118.86527149770781,
//   29.974821402495827,
//   118.86528577124774,
//   29.97514464840908,
//   118.86551381384272,
//   29.975388411953215,
//   118.86604888725662,
//   29.9759790830651,
//   118.86666510513952,
//   29.9765646709775,
//   118.86738071899393,
//   29.97715384861534,
//   118.86848813647767,
//   29.97749431050751,
//   118.86892695728797,
//   29.97758539576697,
//   118.86977672117331,
//   29.977597337073725,
//   118.87135211395781,
//   29.977560031462765,
//   118.8727380909265,
//   29.977346462862325,
//   118.87379162313401,
//   29.9769145354854,
//   118.87470971984526,
//   29.976330044224515,
//   118.87496645568014,
//   29.97589798334156,
//   118.87510102678628,
//   29.974984444259597,
//   118.87520186136122,
//   29.974202958359633,
//   118.87506538387518,
//   29.973335603984555,
//   118.87473180593308,
//   29.972727514780594,
//   118.87447130657708,
//   29.972137905640512,
//   118.87378689350159,
//   29.970951274737587,
//   118.87340472973541,
//   29.970729537168015,
//   118.87270804371924,
//   29.970561770719907,
//   118.87242425731387,
//   29.969927254925132,
//   118.8722228213875,
//   29.969876324816685,
//   118.87139777191804,
//   29.97031325064132,
//   118.87027264091142,
//   29.969590563927937,
//   118.86963537924734,
//   29.96926826255972,
//   118.86872605518164,
//   29.96911679245049,
//   118.86823088827072,
//   29.969969730864456,
//   118.86809632823835,
//   29.972278112442176,
//   118.86749504390013,
//   29.97245929924756,
//   118.8669679410126,
//   29.972924831953684,
//   118.86741585889888,
//   29.973420414118472,
//   118.86649836587841,
//   29.974068702700407,
// ]).reverse(); // 指定开挖多边形的点集，判断多边形点集是否为凸多边形，且为逆时针
// //分别计算由三点确定的面（其中第三个点为原点，裁剪面经过原点），midpoint为两点直线连线的中点，up是单位向量，
// //从原点（0,0,0）出发经过midpoint射线方向的单位向量。right为第一个点到第二点方向的单位向量。normal为垂直于裁
// //剪面的法线向量。originCenteredPlane是法向量normal经过原点的面，distance是中点到originCenteredPlane面的距离，
// //由distance和normal即可确定两点构成的裁剪面。
// var pointsLength = points.length;
// var clippingPlanes = [];
// for (var i = 0; i < pointsLength; ++i) {
//   var nextIndex = (i + 1) % pointsLength;
//   var midpoint = Cesium.Cartesian3.add(
//     points[i],
//     points[nextIndex],
//     new Cesium.Cartesian3()
//   );
//   midpoint = Cesium.Cartesian3.multiplyByScalar(midpoint, 0.5, midpoint);
//   var up = Cesium.Cartesian3.normalize(midpoint, new Cesium.Cartesian3());
//   var right = Cesium.Cartesian3.subtract(
//     points[nextIndex],
//     midpoint,
//     new Cesium.Cartesian3()
//   );
//   right = Cesium.Cartesian3.normalize(right, right);
//   var normal = Cesium.Cartesian3.cross(right, up, new Cesium.Cartesian3());
//   normal = Cesium.Cartesian3.normalize(normal, normal);
//   var originCenteredPlane = new Cesium.Plane(normal, 0.0);
//   var distance = Cesium.Plane.getPointDistance(originCenteredPlane, midpoint);
//   clippingPlanes.push(new Cesium.ClippingPlane(normal, distance));
// }

var clippingPlanecollection1 = new Cesium.ClippingPlaneCollection({
  planes: [new Cesium.ClippingPlane(new Cesium.Cartesian3(1.0, 0.0, 0.0), 0.0), new Cesium.ClippingPlane(new Cesium.Cartesian3(-1.0, 0.0, 0.0), -500.0), new Cesium.ClippingPlane(new Cesium.Cartesian3(0.0, 1.0, 0.0), -15.0), new Cesium.ClippingPlane(new Cesium.Cartesian3(0.0, -1.0, 0.0), -15.0)]
});
var clippingPlanecollection2 = new Cesium.ClippingPlaneCollection({
  planes: [new Cesium.ClippingPlane(new Cesium.Cartesian3(1.0, 0.0, 0.0), 1000), new Cesium.ClippingPlane(new Cesium.Cartesian3(-1.0, 0.0, 0.0), -2000.0), new Cesium.ClippingPlane(new Cesium.Cartesian3(0.0, 1.0, 0.0), -15.0), new Cesium.ClippingPlane(new Cesium.Cartesian3(0.0, -1.0, 0.0), -15.0)]
});
var Check = Cesium.Check;
var Color = Cesium.Color;
var defaultValue = Cesium.defaultValue;
var defined = Cesium.defined;
var destroyObject = Cesium.destroyObject;
var Matrix4 = Cesium.Matrix4;
var PixelFormat = Cesium.PixelFormat;
var PixelDatatype = Cesium.PixelDatatype;
var Sampler = Cesium.Sampler;
var Texture = Cesium.Texture;
var ClippingPlaneCollection = Cesium.ClippingPlaneCollection;
/**
 * Specifies a set of ClippingPlaneCollections. ClippingPlaneCollections selectively disable rendering in a region on the
 * outside of the specified list of {@link ClippingPlaneCollections} objects for the globe, it has not been tested on models nor 3D Tilesets.
 * MultiClippingPlaneCollection is now not abled to deal with unionClippingRegions.
 *
 * <p>
 * In general the clipping planes' coordinates are relative to the object they're attached to, so a plane with distance set to 0 will clip
 * through the center of the object.
 * </p>
 * <p>
 * </p>
 *
 * @alias MultiClippingPlaneCollection
 * @constructor
 *
 * @param {Object} [options] Object with the following properties:
 * @param {MultiClippingPlane[]} [options.collections=[]] An array of {@link ClippingPlaneCollection} objects used to selectively disable rendering on the outside of collection.
 * @param {Matrix4} [options.modelMatrix=Matrix4.IDENTITY] The 4x4 transformation matrix specifying an additional transform relative to the clipping planes original coordinate system.
 * @param {Color} [options.edgeColor=Color.WHITE] The color applied to highlight the edge along which an object is clipped.
 * @param {Number} [options.edgeWidth=0.0] The width, in pixels, of the highlight applied to the edge along which an object is clipped.
 */

function MultiClippingPlaneCollection(options) {
  options = defaultValue(options, defaultValue.EMPTY_OBJECT);
  this._multiCollections = [];
  this._dataArrayBuffer = null;
  this._lengthArrayBuffer = null;
  this._dataTexture = null;
  this._lengthTexture = null;
  this._dirty = false;
  this._maxCollectionLength = 0;
  this._totalPlanesCount = 0;
  /**
   * The 4x4 transformation matrix specifying an additional transform relative to the clipping planes
   * original coordinate system.
   *
   * @type {Matrix4}
   * @default Matrix4.IDENTITY
   */

  this.modelMatrix = Matrix4.clone(defaultValue(options.modelMatrix, Matrix4.IDENTITY));
  /**
   * The color applied to highlight the edge along which an object is clipped.
   *
   * @type {Color}
   * @default Color.WHITE
   */

  this.edgeColor = Color.clone(defaultValue(options.edgeColor, Color.WHITE));
  /**
   * The width, in pixels, of the highlight applied to the edge along which an object is clipped.
   *
   * @type {Number}
   * @default 0.0
   */

  this.edgeWidth = defaultValue(options.edgeWidth, 0.0); // Add each ClippingPlaneCollection object

  var collections = options.collections;
  var me = this;

  if (defined(collections)) {
    collections.forEach(function (p) {
      me.add(p);
    });
  }
}

Object.defineProperties(MultiClippingPlaneCollection.prototype, {
  /**
   * Returns the number of ClippingPlaneCollections in this MultiClippingPlaneCollection.
   *
   * @memberof MultiClippingPlaneCollection.prototype
   * @type {Number}
   * @readonly
   */
  length: {
    get: function get() {
      return this._multiCollections.length;
    }
  },

  /**
   * Returns a texture containing all planes of all ClippingPlaneCollections.
   *
   * @memberof MultiClippingPlaneCollection.prototype
   * @type {Texture}
   * @readonly
   */
  dataTexture: {
    get: function get() {
      return this._dataTexture;
    }
  },

  /**
   * Returns a texture containing length of each ClippingPlaneCollection.
   *
   * @memberof MultiClippingPlaneCollection.prototype
   * @type {Texture}
   * @readonly
   */
  lengthTexture: {
    get: function get() {
      return this._lengthTexture;
    }
  },

  /**
   * Returns the combined state of each ClippingPlaneCollection.
   *
   * @memberof MultiClippingPlaneCollection.prototype
   * @type {String}
   * @readonly
   */
  collectionsState: {
    get: function get() {
      var state = 0;

      this._multiCollections.forEach(function (p, i) {
        // state += (p.enabled ? "+" : "-") + i + p.clippingPlanesState;
        state += p.clippingPlanesState;
      });

      return state;
    }
  },

  /**
   * Returns the max length of ClippingPlaneCollection in this MultiClippingPlaneCollection. This is used in
   * getMultiClippingFunction.js .
   *
   * @memberof MultiClippingPlaneCollection.prototype
   * @type {Number}
   * @readonly
   */
  maxCollectionLength: {
    get: function get() {
      return this._maxCollectionLength;
    }
  },

  /**
   * Returns the count of all planes.
   *
   * @memberof MultiClippingPlaneCollection.prototype
   * @type {Number}
   * @readonly
   */
  totalPlanesCount: {
    get: function get() {
      return this._totalPlanesCount;
    }
  }
});
/**
 * Adds the specified {@link ClippingPlaneCollection} to the collection to be used to selectively disable rendering
 * on the outside of each plane collection.
 * @param {ClippingPlaneCollection} collection The ClippingPlaneCollection to add to the collection.
 */

MultiClippingPlaneCollection.prototype.add = function (collection) {
  this._multiCollections.push(collection);

  this._dirty = true;
};
/**
 * Returns the plane in the collection at the specified index.  Indices are zero-based
 * and increase as planes are added.  Removing a plane shifts all planes after
 * it to the left, changing their indices.
 *
 * @param {Number} index The zero-based index of the ClippingPlaneCollection.
 * @returns {ClippingPlaneCollection} The ClippingPlaneCollection at the specified index.
 */


MultiClippingPlaneCollection.prototype.get = function (index) {
  //>>includeStart('debug', pragmas.debug);
  Check.typeOf.number("index", index); //>>includeEnd('debug');

  return this._multiCollections[index];
};
/**
 * Checks whether this collection contains a ClippingPlaneCollection equal to the given ClippingPlaneCollection.
 *
 * @param {ClippingPlaneCollection} collection
 * @returns {Bollean} <code>true</code> if this collection contains the ClippingPlaneCollection, <code>false</code> otherwise.
 */


MultiClippingPlaneCollection.prototype.contains = function (collection) {
  return this._multiCollections.findIndex(function (p) {
    return p === collection;
  }) !== -1;
};
/**
 * Removes the first occurrence of the given ClippingPlane from the collection.
 *
 * @param {ClippingPlaneCollection} collection
 * @returns {Boolean} <code>true</code> if the plane was removed; <code>false</code> if the plane was not found in the collection.
 */


MultiClippingPlaneCollection.prototype.remove = function (collection) {
  var collections = this._multiCollections;
  var index = collections.findIndex(function (p) {
    return p === collection;
  });

  if (index === -1) {
    return false;
  }

  collections.splice(index, 1);

  if (collection instanceof ClippingPlaneCollection) {
    collection.destroy();
  }

  this._dirty = true;
  return true;
};
/**
 * Removes all ClippingPlaneCollection from the collection.
 */


MultiClippingPlaneCollection.prototype.removeAll = function () {
  this._multiCollections.forEach(function (collection) {
    if (collection instanceof ClippingPlaneCollection) {
      collection.destroy();
    }
  });

  this._multiCollections = [];
  this._dirty = true;
};
/**
 * Called when {@link Viewer} or {@link CesiumWidget} render the scene to
 * build the resources for clipping planes.
 * <p>
 * Do not call this function directly.
 * </p>
 */


MultiClippingPlaneCollection.prototype.update = function (frameState) {
  var collections = this._multiCollections;
  collections.forEach(function (p) {
    if (p.enabled) p.update(frameState);
  });

  if (this._dirty) {
    var context = frameState.context; // concat each collection's arraybuffer

    var useFloatTexture = ClippingPlaneCollection.useFloatTexture(context);
    var widthTotal = 0,
        height;
    var updateTexture = true;
    var totalPlanes = 0;
    var maxLength = 0;

    for (var i = 0; i < collections.length; i++) {
      var collection = collections[i];
      totalPlanes += collections.length;
      maxLength = Math.max(maxLength, collection.length); // if (collection.enabled) {

      height = collection.texture.height; // should be the same for all collections

      widthTotal += collection.texture.width; // }

      if (!defined(collection.texture)) {
        updateTexture = false;
      }
    }

    this._totalPlanesCount = totalPlanes;
    this._maxCollectionLength = maxLength;

    if (updateTexture && collections.length > 0) {
      this._dataArrayBuffer = useFloatTexture ? new Float32Array(widthTotal * height * 4) : new Uint8Array(widthTotal * height * 4);
      this._lengthArrayBuffer = new Float32Array(collections.length * 4);
      var arrayBuffer = this._dataArrayBuffer;
      var lengthArrayBuffer = this._lengthArrayBuffer;
      var startIndex = 0;
      collections.forEach(function (p, i) {
        // if (p.enabled) {
        var nowDataBuffer = useFloatTexture ? p._float32View : p._uint8View;
        var nowDataIndex = 0; // exclude zeros (data with height = 1)

        for (var j = 0; j < p.length; ++j) {
          arrayBuffer[startIndex] = nowDataBuffer[nowDataIndex];
          arrayBuffer[startIndex + 1] = nowDataBuffer[nowDataIndex + 1];
          arrayBuffer[startIndex + 2] = nowDataBuffer[nowDataIndex + 2];
          arrayBuffer[startIndex + 3] = nowDataBuffer[nowDataIndex + 3];
          nowDataIndex += 4; // each plane is 4 floats

          startIndex += 4;
        }

        lengthArrayBuffer[i * 4 + 3] = p.length; // startIndex += p.texture.width * 4;
        // }
      });

      if (useFloatTexture) {
        this._dataTexture = new Texture({
          context: context,
          width: widthTotal,
          height: height,
          pixelFormat: PixelFormat.RGBA,
          pixelDatatype: PixelDatatype.FLOAT,
          sampler: Sampler.NEAREST,
          flipY: false
        });
      } else {
        this._dataTexture = new Texture({
          context: context,
          width: widthTotal,
          height: height,
          pixelFormat: PixelFormat.RGBA,
          pixelDatatype: PixelDatatype.UNSIGNED_BYTE,
          sampler: Sampler.NEAREST,
          flipY: false,
          source: {
            width: widthTotal,
            height: height,
            arrayBufferView: arrayBuffer
          }
        });
      }

      this._dataTexture.copyFrom({
        width: widthTotal,
        height: height,
        arrayBufferView: arrayBuffer
      });

      this._lengthTexture = new Texture({
        context: context,
        width: collections.length,
        height: 1,
        pixelFormat: PixelFormat.RGBA,
        pixelDatatype: PixelDatatype.FLOAT,
        sampler: Sampler.NEAREST,
        flipY: false
      });

      this._lengthTexture.copyFrom({
        width: collections.length,
        height: 1,
        arrayBufferView: lengthArrayBuffer
      });
    }

    this._dirty = false;
  }
};
/**
 * Destroys the WebGL resources held by this object.  Destroying an object allows for deterministic
 * release of WebGL resources, instead of relying on the garbage collector to destroy this object.
 * <br /><br />
 * Once an object is destroyed, it should not be used; calling any function other than
 * <code>isDestroyed</code> will result in a {@link DeveloperError} exception.  Therefore,
 * assign the return value (<code>undefined</code>) to the object as done in the example.
 *
 * @exception {DeveloperError} This object was destroyed, i.e., destroy() was called.
 *
 *
 * @example
 * multiClippingPlaneCollections = multiClippingPlaneCollections && multiClippingPlaneCollections.destroy();
 *
 * @see ClippingPlaneCollection#isDestroyed
 */


MultiClippingPlaneCollection.prototype.destroy = function () {
  this._multiCollections.forEach(function (collection) {
    if (collection instanceof ClippingPlaneCollection) {
      collection.destroy();
    }
  });

  this._multiCollections = undefined;
  this._dataTexture = this._dataTexture && this._dataTexture.destroy();
  this._lengthTexture = this._lengthTexture && this._lengthTexture.destroy();
  return destroyObject(this);
};

viewer.scene.globe.multiClippingPlanes = new MultiClippingPlaneCollection({
  collections: [clippingPlanecollection1, clippingPlanecollection2],
  // modelMatrix: entity.computeModelMatrix(Cesium.JulianDate.now()),
  edgeWidth: 1,
  edgeColor: Cesium.Color.WHITE
});
console.log(Cesium.ContextLimits);