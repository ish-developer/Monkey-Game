var PLAY = 0;
var END = 1
gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var sprite
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
  

  
}



function setup() {
  monkey = createSprite(50,320,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.1;

  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
    
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  
  obstacleGroup = createGroup();
  FoodGroup = createGroup();
  
  score = 0;
  
}


function draw() {
background("skyblue");
  fill("black");
  
  text("SURVIVAL TIME: " +score, 250, 50);
 
  
  if (gameState === PLAY){
    
    score =  score + Math.ceil(getFrameRate()/60);
    obstacles();
    fruits();
    
    

  
    if(keyDown("space")&&monkey.y >= 235) {
      monkey.velocityY = -13; 
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    
    if (obstacleGroup.isTouching(monkey)){
      gameState = END;
    }
    
  } else
  
  if (gameState === END){
    ground.velocityX = 0;
    monkey.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
   obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    fill("red");
    textSize(20);
  text("Press R to restart ",100,100 ); 
    
  
   
  if(keyDown("R")){
    reset();
    
    
  }
  }
  
  
  
  
  drawSprites(); 
  
     monkey.collide(ground);
     
   } 
    
    
 


function fruits() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(400,180,20,50);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200
    
    
    //adjust the depth
    monkey.depth = banana.depth;
    monkey.depth = monkey.depth + 1;
    
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
     
}

function obstacles() {
  //write code here to spawn the clouds
  if (frameCount % 300 === 0) {
    var stone = createSprite(400,325,20,50);
    stone.x = Math.round(random(50,400));
    stone.addImage(obstaceImage);
    stone.scale = 0.1;
    stone.velocityX = -3;
    obstacleGroup.add(stone);
    stone.lifetime = 200;
  }
    
    
    
    
    
    
    
}



function reset(){
  gameState = PLAY;
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  score = 0;
  
}





