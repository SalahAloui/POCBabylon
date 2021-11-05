let domElement = document.getElementById("babylonViewer");

const conf = {
  zoom: {
    minDistance: 2.1,
    maxDistance: 33 //not working
  },
  backgroundColor: {
    //  (r: 0, g: 0, b: 0, a: 0) = transparente background
    r: 0,
    g: 0,
    b: 0,
    a: 0
  }
};
// let modelUrl = domElement.getAttribute("data-dior-asset-url");
/*
        don't have to use JS

      */
// function globalSceneInitCallback(scene) {
//   //callback
//   console.log(
//     "%c " + "scene-init function defined in the configuration" + " ",
//     "background: orange; color: black; padding: 2px 6px"
//   );
//   console.log(scene.clearColor);

//   // console.log(scene.clearColor);
// }

// Promise-based API:
BabylonViewer.viewerManager
  .getViewerPromiseById("babylon-viewer")
  .then(function (viewer) {
    // this will resolve only after the viewer with this specific ID is initialized
    console.log("Using promises: ", "viewer - " + viewer.getBaseId());

    viewerObservables(viewer);
  });

function viewerObservables(viewer) {
  viewer.onEngineInitObservable.add(function (engine) {
    console.log("Engine initialized");
    console.log("engine : ", engine);
  });

  viewer.onSceneInitObservable.add(function (scene) {
    console.log("Scene initialized");
    console.log("scene : ", scene);

    // Set bg transparent by JS
    scene.clearColor = new BABYLON.Color4(
      conf.backgroundColor.r,
      conf.backgroundColor.g,
      conf.backgroundColor.b,
      conf.backgroundColor.a
    );
    console.log(scene.clearColor);

    //lowerRadiusLimit
    console.log("scene :", scene);
    console.log("camera : ", scene.cameras[0]);

    // Set Camera zomm Min/max
    scene.cameras[0].lowerRadiusLimit = conf.zoom.minDistance; // minDistance zoom Camera
    scene.cameras[0].upperRadiusLimit = conf.zoom.maxDistance; // maxDistance zoom Camera
    console.log({
      lrl: scene.cameras[0].lowerRadiusLimit,
      url: scene.cameras[0].upperRadiusLimit
    });

    //remove bouncing
    // scene.cameras[0].useBouncingBehavior = false; // maxDistance zoom Camera
    scene.cameras[0]._bouncingBehavior.transitionDuration = 0; // maxDistance zoom Camera
    scene.cameras[0]._bouncingBehavior.lowerRadiusTransitionRange = 0; // maxDistance zoom Camera
  });

  viewer.onModelLoadedObservable.add(function (meshes) {
    console.log("Model loaded");
  });
}
