Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNmZlMThiNC05MjZjLTRhMzQtYjk1NC04Mzk1OWUzNGQyNDYiLCJpZCI6MTE2NjEsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1NTk1NTEwODh9.1sP9cG15Apatkf1x1g1_P_86wc3gFNOZM66XoWLUsxc";

var viewer = new Cesium.Viewer("mapContainer", {
  animation: false, //如果设置为false，将不创建“动画”窗口小部件。
  baseLayerPicker: false, //如果设置为false，则不会创建BaseLayerPicker小部件。
  fullscreenButton: false, //如果设置为false，将不会创建FullscreenButton小部件。
  vrButton: false, //如果设置为true，将创建VRButton小部件。
  geocoder: false, //是否显示地名查找控件
  homeButton: false, //如果设置为false，将不会创建HomeButton小部件。
  infoBox: false, //是否显示点击要素之后显示的信息
  sceneModePicker: false, //是否显示投影方式控件
  selectionIndicator: false, //如果设置为false，则不会创建SelectionIndicator小部件。
  timeline: false, //是否显示时间线控件
  navigationHelpButton: false, //如果设置为false，将不会创建导航帮助按钮。
  navigationInstructionsInitiallyVisible: false, //如果导航说明最初应该可见，则为True；如果直到用户明确单击该按钮才显示，则为false。
  scene3DOnly: false, //为true时，每个几何实例仅将以3D渲染以节省GPU内存
  shouldAnimate: false, //如果时钟默认情况下应尝试延长仿真时间，则为可选，false否则为false。此选项优先于setting Viewer#clockViewModel。
  clockViewModel: null, //用于控制当前时间的时钟视图模型。
  selectedImageryProviderViewModel: null, //当前基础图像层的视图模型（如果未提供）将使用第一个可用的基础层。仅当options.baseLayerPicker设置为true时，此值才有效。
  imageryProviderViewModels: null, //ProviderViewModels的数组，可以从BaseLayerPicker中选择。仅当options.baseLayerPicker设置为true时，此值才有效。
  selectedTerrainProviderViewModel: null, //当前基础地形图层的视图模型，如果未提供，则使用第一个可用的基础图层。仅当options.baseLayerPicker设置为true时，此值才有效。
  terrainProviderViewModels: null, //ProviderViewModels的数组，可以从BaseLayerPicker中选择。仅当options.baseLayerPicker设置为true时，此值才有效。
  imageryProvider: null, //要使用的图像提供程序。仅当options.baseLayerPicker设置为false时，此值才有效。
  terrainProvider: null, //要使用的地形提供程序
  skyBox: null, //用于渲染星星的天空盒。当为时undefined，使用默认星号。
  skyAtmosphere: null, //蓝天，以及围绕地球四肢的辉光。设置为false关闭。
  fullscreenElement: null, //按下全屏按钮时将置于全屏模式的元素或id。
  useDefaultRenderLoop: true, //如果此窗口小部件应控制渲染循环，则为True，否则为false。
  targetFrameRate: null, //使用默认渲染循环时的目标帧速率。
  showRenderLoopErrors: false, //如果为true，则在发生渲染循环错误时，此小部件将自动向包含错误的用户显示HTML面板。
  useBrowserRecommendedResolution: false, //如果为true，则以浏览器建议的分辨率渲染并忽略window.devicePixelRatio。
  automaticallyTrackDataSourceClocks: false, //如果为true，则此小部件将自动跟踪新添加的数据源的时钟设置，并在数据源的时钟发生更改时进行更新。如果要独立配置时钟，请将其设置为false。
  contextOptions: null, // options传递给的可选 Context和WebGL创建属性Scene。
  sceneMode: null, //初始场景模式。
  mapProjection: null, //在2D和Columbus View模式下使用的地图投影。
  globe: null, //在场景中使用的地球仪。如果设置为false，则不会添加任何地球仪。
  orderIndependentTranslucency: false, //如果为true并且配置支持它，请使用顺序无关的半透明性。
  creditContainer: null, //包含的DOM元素或ID CreditDisplay。如果未指定，则将功劳添加到小部件本身的底部。
  creditViewport: null, //DOM元素或ID，将包含由创建的信用弹出窗口CreditDisplay。如果未指定，它将显示在小部件本身上。
  dataSources: null, //小部件可视化的数据源集合。如果提供此参数，则假定实例由调用方拥有，并且在销毁查看器时不会销毁该实例。
  terrainExaggeration: null, //标量，用于放大地形。请注意，地形夸张不会修改任何其他相对于椭球的图元。
  shadows: false, //确定阴影是否由光源投射。
  terrainShadows: null, //确定地形是投射还是接收来自光源的阴影。
  mapMode2D: null, //确定2D地图是可旋转的还是可以在水平方向上无限滚动。
  projectionPicker: false, //如果设置为true，将创建ProjectionPicker小部件。
  requestRenderMode: false, //如果为true，则仅根据场景中的变化确定是否需要渲染帧。启用可减少应用程序的CPU / GPU使用率，并减少移动设备上的电池消耗，但需要Scene#requestRender在此模式下显式渲染新帧。在API的其他部分对场景进行更改后，在很多情况下这是必要的。请参见使用显式渲染提高性能。
  maximumRenderTimeChange: null, //如果requestRenderMode为true，则此值定义在请求渲染之前允许的最大模拟时间更改。请参见使用显式渲染提高性能。
});

// 隐藏Cesium自身的logo
viewer._cesiumWidget._creditContainer.style.display = "none";
