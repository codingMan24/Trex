var trex;
var trexRunning;
var ground;
var cloudAnimation;
var clouds;
var cloud;
var cactusAnimation1;
var cactusAnimation2;
var cactusAnimation3;
var cactusAnimation4;
var cactusAnimation5;
var cactusAnimation6;
var cactuses;
var cactus;
var gamestate;
var trexStanding;
var trexCollided;
var restartImage;
var restart;
var score;
var highscore;
function preload(){
  cloudAnimation = loadAnimation('cloud.png');
  trexRunning = loadAnimation('trex3.png','trex4.png');
  trexStanding = loadAnimation('trex_collided.png');
  trexCollided = loadAnimation('trex_collided.png');
  cactusAnimation1 = loadImage('obstacle1.png');
  cactusAnimation2 = loadImage('obstacle2.png');
  cactusAnimation3 = loadImage('obstacle3.png');
  cactusAnimation4 = loadImage('obstacle4.png');
  cactusAnimation5 = loadImage('obstacle5.png');
  cactusAnimation6 = loadImage('obstacle6.png');
  restartImage = loadImage('btton.png');
}
function setup(){ 
  clouds = new Group();
  cactuses = new Group();
  gamestate = 'start';
  createCanvas(600,200);
  trex = createSprite(50,160,10,10);
  highscore = 0;
  score = 0;
  trex.addAnimation('standing',trexStanding);
  trex.addAnimation('running',trexRunning);
  trex.addAnimation('collided',trexCollided);
  trex.scale = 0.5;
  trex.setCollider('circle',0,0,40);
  //trex.debug = 'true';
  ground = createSprite(600,180,1200,5);
  ground.addAnimation('ground','ground2.png');
  restart = createSprite(300,130,10,10);
  restart.scale = 0.6;
  restart.addImage(restartImage);
  restart.visible = false;
}
function createCactuses(){
  if(frameCount % 60 == 0){
    cactus = createSprite(600,160,10,60);
    var x = Math.round(random(1,6));
    cactus.velocityX = -10;
    cactus.scale = 0.45;
    cactuses.add(cactus);
    cactus.lifetime = 150;
    switch(x){
      case 1:
        cactus.addImage(cactusAnimation1);
      break;
      case 2:
        cactus.addImage(cactusAnimation2);
      break;
      case 3:
        cactus.addImage(cactusAnimation3);
      break;
      case 4:
        cactus.addImage(cactusAnimation4);
      break;
      case 5:
        cactus.addImage(cactusAnimation5);
      break;
      case 6:
        cactus.addImage(cactusAnimation6);
      break;
      default:
        break;
    }
  }
}
function createClouds(){
  if(frameCount % 120 == 0){
    cloud = createSprite(600,Math.round(random(50,75)),10,10);
    cloud.addAnimation('cloud',cloudAnimation);
    cloud.velocityX = -5;
    clouds.add(cloud);
    cloud.lifetime = 150;
    trex.depth = cloud.depth+1;
    cloud.depth = 0;
  }
}
function draw(){
  background('white');
  if(keyDown(' ') && gamestate == 'start'){
    gamestate = 'play';
  }
  text('High Score ' + highscore,300,50);
  text('Score ' + score,400,50);
  if(gamestate == 'lose'){
    trex.velocityY =0;
    restart.visible = true;
    trex.changeAnimation('collided');
    textSize(50);
    text('You lose',200,90);
    clouds.setLifetimeEach(-1);     
    cactuses.setLifetimeEach(-1);
    ground.velocityX = 0;
    cactuses.setVelocityXEach(0);
    clouds.setVelocityXEach(0);
    if(mousePressedOver(restart)){
      gamestate = 'play';
      score = 0;
      restart.visible = false;
      clouds.setLifetimeEach(0);
      cactuses.setLifetimeEach(0);
    }
    if(score >= highscore){
      highscore = score;
    }
  }
  if(gamestate == 'play'){
    if(frameCount % 30 == 0){
      score++;
    }
    restart.visible = false;
    trex.changeAnimation('running');
    if(keyDown('space') && trex.collide(ground)){   
      trex.velocityY = -25;
    }
    if(ground.x<-200){
      ground.x = 600;
    }
    ground.velocityX=-10;
    trex.velocityY +=3;
    createClouds();
    createCactuses();
    if(trex.isTouching(cactuses)){
      gamestate = 'lose';
    }
  }
  trex.collide(ground);
  drawSprites();
}