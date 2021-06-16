//h.w - load images
var ruler,ground,bg; 
var rulerImg,bgImg,enemyImg,bombImg;
var PLAY = 1;
var END = 0;
var gameState= PLAY;
var restart, restartImg;
var score = 0;




function preload(){
  rulerImg= loadImage("ruler.png");
  bgImg= loadImage("bg.jpg");
  enemyImg= loadImage("enemy.png");
  bombImg= loadImage("bomb.png");
  place1= loadImage("place.jpg");
  place2= loadImage("place1.png");
  restartImg= loadImage("restart.jpg");

}


function setup() {
  createCanvas(900,670);

  bg = createSprite(450,335,50,50);
  bg.addImage("bg", bgImg);
  
  ruler = createSprite(400, 580, 50, 50);
  ruler.addImage("ruler",rulerImg);
  ruler.scale = 0.31;
  ground = createSprite(450,660,970,20);
  ground.shapeColor="brown";
 
  enemyGroup = new Group();
  placesGroup = new Group();

  restart = createSprite(450,335,50,50);
  restart.visible= false;
  restart.addImage("restart", restartImg);
  restart.scale = 0.5;

  

}


function draw() {
  background(0);  
  textSize(20);
  text("SCORE : " + score, 50,50);
  
  
  if(gameState === PLAY){
  
    if(keyDown(RIGHT_ARROW)){
      ruler.x = ruler.x+5;
    }
  
    if(keyDown(LEFT_ARROW)){
      ruler.x = ruler.x-5;
    }
  
    if(keyDown(UP_ARROW)){
      ruler.y = ruler.y-5;
    }
  
    if(keyDown(DOWN_ARROW)){
      ruler.y = ruler.y+5;
    }

    spawnEnemy();
    spawnPlaces();

    

    if(enemyGroup.isTouching(ruler)){
      gameState=END ;
      console.log("gameEnded");
    }
  }

else if(gameState === END){
  enemyGroup.setVelocityXEach(0);
  enemyGroup.setLifetimeEach(-1);

  placesGroup.setVelocityXEach(0);
  placesGroup.setLifetimeEach(-1);
 
  restart.visible = true;
  if(mousePressedOver(restart)) {
    reset();
  }
}

  ruler.collide(ground);

  drawSprites();

  textSize(20);
  fill("black");
  text("SCORE : " + score, 50,50);

}

function reset(){
  gameState = PLAY;
  restart.visible = false;
  enemyGroup.destroyEach();
  placesGroup.destroyEach();
  score = 0;

}


function spawnEnemy(){
  if(frameCount % 70 === 0){
   var enemy = createSprite(900,Math.round(random(50,670)),50,50);
   var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: enemy.addImage(enemyImg);
              break;
      case 2: enemy.addImage(bombImg);
        default: break;
    }
    enemy.scale = 0.2;
    enemy.velocityX = -(6+3*score/100);
    enemy.lifetime = 150;
    enemyGroup.add(enemy);
    
  }
}

function spawnPlaces(){
  if(frameCount % 150 === 0){
    var places = createSprite(Math.round(random(100,900)),Math.round(random(300,600)),30,30);
    
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: places.addImage(place1);
              break;
      case 2: places.addImage(place2);
        default: break;
    }
    if(places.isTouching(ruler)){
      score = score + 30;
    }
    places.scale = 0.25;
    places.velocityX = -7;
    places.lifetime = 150;
    placesGroup.add(places);
  }
  

}


