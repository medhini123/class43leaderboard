var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player;
var myplayerCount,mygameState;
var myForm,myGame,myPlayer
var car1,car2,car1Image,car2Image,trackImage
var cars=[]
var allPlayers
var fuelImg,fuelGroup
var powercoinsImg,powercoinsGroup

function preload() {
  backgroundImage = loadImage("./assets/background.png");
  car1Image= loadImage("assets/car1.png")
  car2Image= loadImage("assets/car2.png")
  trackImage= loadImage("assets/track.jpg")
  fuelImg= loadImage("assets/fuel.png")
  powercoinsImg= loadImage("assets/goldCoin.png")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();

  myGame=new Game()
  myGame.start()
  myGame.getState()
  

}

function draw() {
  background(backgroundImage);
  if(myplayerCount===2){
    myGame.updateState(1)
  }


  if(mygameState===1){
    myGame.play()
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
