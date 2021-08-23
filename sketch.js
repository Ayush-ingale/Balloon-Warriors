var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obstacleTop, obsTop1, obsTop2
var obstacleBottom, obsBottom1,obsBottom2, obsBottom3
var gameState="play"
var life =15;


function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")

obsTop1 = loadImage("assets/obsTop1.png")
obsTop2 = loadImage("assets/obsTop2.png")

obsBottom1 = loadImage("assets/obsBottom1.png")
obsBottom2 = loadImage("assets/obsBottom2.png")
obsBottom3 = loadImage("assets/obsBottom3.png")
repairkit = loadImage("assets/repairkit-removebg-preview.png")
medkit = loadImage("assets/medkit.png")
jerrycan = loadImage("assets/fuel_can-removebg-preview.png")
airfiller = loadImage("assets/airblower-removebg-preview.png")
groudanimation=loadAnimation("assets/ground.png","assets/ground - Copy.png","assets/ground - Copy (2).png")

}

function setup(){

  createCanvas(windowWidth-10,windowHeight-50)
//background image
bg = createSprite(displayWidth/2,displayHeight/2,1,1);
bg.addImage(bgImg);
bg.scale = 1.3


//creating top and bottom grounds
bottomGround = createSprite(width/2,590,width*3,20);
bottomGround.addAnimation("Ground",groudanimation);
bottomGround.velocityX=-4;
bottomGround.visible = true;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;

obstacleGroup=createGroup();
obstacleGroup1=createGroup();

helpingGroup=createGroup();





}

function draw() {
  
  background("black");
  balloon.collide(bottomGround);

  if(gameState==="play"){
    if(keyDown("space")) {
      balloon.velocityY = -6 ;
      
      
    }

    if(bottomGround.x<0){
      bottomGround.x=bottomGround.width/2;
    }
    for(var i=0;i<helpingGroup.length;i++){
      if(balloon.isTouching(helpingGroup[i])){
        life=life+1;
        helpingGroup[i].destroy();
   
       }

    }
    if(life>15){
      life=15;
    }

  



    for(var i=0;i<obstacleGroup.length;i++){
      if(balloon.isTouching(obstacleGroup[i])){
        life=life-3;
        obstacleGroup[i].destroy();
   
       }

    }
    for(var i=0;i<obstacleGroup1.length;i++){
      if(balloon.isTouching(obstacleGroup1[i])){
        life=life-3;
        obstacleGroup1[i].destroy();
   
       }

    }

    

    //adding gravity
     balloon.velocityY = balloon.velocityY + 0.8;
     


     
    Bar();
    spawnObstaclesTop();
    spawnObstaclesBottom();
    safetykit();
    if(life === 0||life<0){
      gameState="end";

    }


  }

        
          //making the hot air balloon jump
         
   
        drawSprites();
        if(gameState==="end"){
          obstacleGroup.setVelocityXEach(0);
          obstacleGroup.setLifetimeEach(-1);
          obstacleGroup1.setVelocityXEach(0);
          obstacleGroup1.setLifetimeEach(-1);
          textSize(40);
          fill("red");
          text("GAME OVER",width/2-75,height/2);
          helpingGroup.setVelocityXEach(0);
          helpingGroup.setLifetimeEach(-1);
          bottomGround.velocityX=0;
          fill("black");
          text("PRESS 'R' TO RESTART",width/2-175,height/2-80);
          if(keyDown("r")){
            gameState="play";
            life=15;
            obstacleGroup.destroyEach();
            obstacleGroup1.destroyEach();
            helpingGroup.destroyEach();

          }


    
        }  
        textSize(40);
        fill("black")
        text("life : "+life,100,50)
        //spawning top obstacles
      

      
}


function spawnObstaclesTop() 
{
      if(World.frameCount % 100 === 0) {
        obstacleTop = createSprite(width,50,40,50);
    
    //obstacleTop.addImage(obsTop1);
    
    obstacleTop.scale = 0.1;
    obstacleTop.velocityX = -4;

    //random y positions for top obstacles
    obstacleTop.y = Math.round(random(10,200));

    //generate random top obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacleTop.addImage(obsTop1);
              break;
      case 2: obstacleTop.addImage(obsTop2);
              break;
      default: break;
    }

     //assign lifetime to the variable
   obstacleTop.lifetime = 350;
    
   balloon.depth = balloon.depth + 1;
   obstacleGroup.add(obstacleTop);
   
      }
}

 function Bar() 
 {
         if(World.frameCount % 60 === 0)
         {
           var bar = createSprite(400,200,10,800);
          bar.velocityX = -6
          bar.depth = balloon.depth;
          bar.lifetime = 70;
          bar.visible = false;
         }
}


function spawnObstaclesBottom() 
{
      if(World.frameCount % 150 === 0) {
        obstacleBottom = createSprite(width,50,40,50);
    
    //obstacleTop.addImage(obsTop1);
    
    obstacleBottom.scale = 0.2;
    obstacleBottom.velocityX = -4;

    //random y positions for top obstacles
    obstacleBottom.y = Math.round(random(500,height-50));

    //generate random top obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacleBottom.addImage(obsBottom1);
              break;
      case 2: obstacleBottom.addImage(obsBottom2);
              break;
              case 3: obstacleBottom.addImage(obsBottom3);
              break;
      default: break;
    }

     //assign lifetime to the variable
   obstacleBottom.lifetime = 350;
    
   balloon.depth = balloon.depth + 1;
   obstacleGroup1.add(obstacleBottom);
   
      }
}


function safetykit() 
{
      if(World.frameCount % 240 === 0) {
        obstacletop1 = createSprite(width,50,40,50);
    
    //obstacleTop.addImage(obsTop1);
    
    obstacletop1.scale = 0.3;
    obstacletop1.velocityX = -4;

    //random y positions for top obstacles
    obstacletop1.y = Math.round(random(10,200));

    //generate random top obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacletop1.addImage(airfiller);
              obstacletop1.scale=0.2; 
              break;
      case 2: obstacletop1.addImage(repairkit);
              obstacletop1.scale=0.2;
              break;
              case 3: obstacletop1.addImage(medkit);
              
              break;
      default: break;
    }

     //assign lifetime to the variable
   obstacletop1.lifetime = 350;
    
   balloon.depth = balloon.depth + 1;
   helpingGroup.add(obstacletop1);
   
      }
}
