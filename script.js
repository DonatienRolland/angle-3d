var stage;

function init() {
  var canvas = document.getElementById("360viewer");
  if (!canvas || !canvas.getContext) return;

  stage = new createjs.Stage(canvas);
  stage.enableMouseOver(true);
  stage.mouseMoveOutside = true;
  createjs.Touch.enable(stage);

  var imgList = [
	"./viewer/porte_00000.jpg",
	"./viewer/porte_00001.jpg",
	"./viewer/porte_00002.jpg",
	"./viewer/porte_00003.jpg",
	"./viewer/porte_00004.jpg",
	"./viewer/porte_00005.jpg",
	"./viewer/porte_00006.jpg",
	"./viewer/porte_00007.jpg",
	"./viewer/porte_00008.jpg",
	"./viewer/porte_00009.jpg",
	"./viewer/porte_00010.jpg",
	"./viewer/porte_00011.jpg",
	"./viewer/porte_00012.jpg",
	"./viewer/porte_00013.jpg",
	"./viewer/porte_00014.jpg",
	"./viewer/porte_00015.jpg",
	"./viewer/porte_00016.jpg",
	"./viewer/porte_00017.jpg",
	"./viewer/porte_00018.jpg",
	"./viewer/porte_00019.jpg",	
	"./viewer/porte_00020.jpg",
	"./viewer/porte_00021.jpg",
	"./viewer/porte_00022.jpg",
	"./viewer/porte_00023.jpg",
	"./viewer/porte_00024.jpg",
	"./viewer/porte_00025.jpg",
  ];
  var images = [],
    loaded = 0,
    currentFrame = 0,
    totalFrames = imgList.length;
  var rotate360Interval, start_x;

  var bg = new createjs.Shape();
  stage.addChild(bg);

  var bmp = new createjs.Bitmap();
  stage.addChild(bmp);

  // var myTxt = new createjs.Text("360 prototype", '13px Roboto', "#E81280");
  // myTxt.x = myTxt.y =0;
  // myTxt.alpha = 0.5;
  // stage.addChild(myTxt);   

  function load360Image() {
    var img = new Image();
    img.src = imgList[loaded];
    img.onload = img360Loaded;
    images[loaded] = img;
  }
  
function img360Loaded(event) {
loaded++;

if (loaded === 1){
bg.graphics.clear()
bg.graphics.beginFill("#fff").drawRect(0, 0, stage.canvas.width * loaded / totalFrames, stage.canvas.height);
bg.graphics.endFill();

bmp.image = images[0];
load360Image();
}
else if(loaded === totalFrames){
bg.graphics.clear()
bg.graphics.beginFill("#fff").drawRect(0, 0, stage.canvas.width * loaded / totalFrames, stage.canvas.height);
bg.graphics.endFill();
start360();
}
else load360Image();

}
/*
  function img360Loaded(event) {
    loaded++;
    bg.graphics.clear()
    bg.graphics.beginFill("#fff").drawRect(0, 0, stage.canvas.width * loaded / totalFrames, stage.canvas.height);
    bg.graphics.endFill();

    if (loaded == totalFrames) start360();
    else load360Image();
  }
*/
  function start360() {
    document.body.style.cursor = 'none';
	
	//clear loader à la fin du chargement des images du viewer
	document.getElementById("chargement").style.display = "none";

    // 360 icon
    // var iconImage = new Image();
    // iconImage.src = "http://jsrun.it/assets/y/n/D/c/ynDcT.png";
    // iconImage.onload = iconLoaded;        

    // update-draw
    update360(0);

	
    // first rotation
    rotate360Interval = setInterval(function() {
      if (currentFrame === totalFrames - 1) {
        clearInterval(rotate360Interval);
        addNavigation();
      }
      update360(1);
    }, 25);
  }

  function iconLoaded(event) {
    var iconBmp = new createjs.Bitmap();
    iconBmp.image = event.target;
    iconBmp.x = 20;
    iconBmp.y = canvas.height - iconBmp.image.height - 20;
    stage.addChild(iconBmp);
  }

  function update360(dir) {
    currentFrame += dir;
    if (currentFrame < 0) currentFrame = totalFrames - 1;
    else if (currentFrame > totalFrames - 1) currentFrame = 0;
    bmp.image = images[currentFrame];
  }

  //------------------------------- 
  function addNavigation() {
    stage.onMouseOver = mouseOver;
    stage.onMouseDown = mousePressed;
    document.body.style.cursor = 'auto';
  }

  function mouseOver(event) {
    document.body.style.cursor = 'pointer';
  }

  function mousePressed(event) {
    start_x = event.rawX;
    stage.onMouseMove = mouseMoved;
    stage.onMouseUp = mouseUp;

    document.body.style.cursor = 'w-resize';
  }

  function mouseMoved(event) {
    var dx = event.rawX - start_x;
    var abs_dx = Math.abs(dx);

    if (abs_dx > 5) {
      update360(dx / abs_dx);
      start_x = event.rawX;
    }
  }

  function mouseUp(event) {
    stage.onMouseMove = null;
    stage.onMouseUp = null;
    document.body.style.cursor = 'pointer';
  }

  function handleTick() {
    stage.update();
  }

  document.body.style.cursor = 'progress';
  load360Image();

  // TICKER
  createjs.Ticker.addEventListener("tick", handleTick);
  createjs.Ticker.setFPS(24);
  createjs.Ticker.useRAF = true;
}

// Init
window.addEventListener('load', init, false);