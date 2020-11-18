// To create : 1. player,2. obstacles
// the player will move with the arrow keys(space bar).
// make infinite scrolling background.
// npc : good food, bad food, and the needy person(we have to spawn them in between(foods at siome interval and person at last)).
// how to score :1. when we take the good food score increases
//               2. when we take the bad food score decreases.
// ending conditions : if th player is less then the omited score he will lose the game and if he had a omited score he will win.
var play = 1;
var end = 0;
var gameState = play;
var player;
var ground;
var goodfoodImage , badfoodImage , groundImage , playerImage;
var goodfoodgroup,badfoodgroup;
var score = 0;

function preload(){
    playerImage = loadImage("player.png");
    groundImage = loadImage("ground1.png");
    goodfoodImage = loadImage("goodfood.png");
    badfoodImage = loadImage("badfood.png");
}
function setup(){
    createCanvas(1000,400)
    ground = createSprite(500,230,2000,20);
    ground.addImage("ground",groundImage);
    ground.scale = 0.3
    ground.x = ground.width/2;
   // ground.debug = true;

    invisibleground = createSprite(500,400,1000,10);
    invisibleground.shapeColor = "green"

    player = createSprite(200,350,20,40);
    player.addImage("player",playerImage)
    player.scale = 0.3;
   // player.debug = true;

   goodfoodgroup = new Group()
   badfoodgroup = new Group()

   
}
function draw(){
    background("lightgreen");
    textSize(20);
    text("score: "+score,850,50)

    if(gameState === play){
        score = score + Math.round(getFrameRate()/60);
         ground.velocityX = -(6 + 3*score/100);
        if(keyDown("space")&& player.y>=306.05){
            player.velocityY = -14;
        }
        console.log(player.y)
        player.velocityY = player.velocityY+0.5
        ground.velocityX = -5;
    
        if(ground.x <0){
            ground.x = ground.width/2
        }
       
        spawnbadfood()
        spawngoodfood()
       if(badfoodgroup.isTouching(player)){
           gameState = end;         
       } 
    }

    if(gameState === end){
        ground.velocityX = 0;
        goodfoodgroup.setVelocityXEach(0)
        badfoodgroup.setVelocityXEach(0)
        goodfoodgroup.setLifetimeEach(-1)
        badfoodgroup.setLifetimeEach(-1)
        player.velocityY = 0  ;
        textSize(20);
        text("press r to restart",450,200)
        

        if(keyDown("r")){
            gameState = play;
            score = 0;
            goodfoodgroup.destroyEach()
            badfoodgroup.destroyEach()
        }
    }
    player.collide(invisibleground);
    drawSprites()
}
function spawnbadfood(){
    if(frameCount%200 === 0){
        var badfood = createSprite(1000,360,20,40)
        badfood.addImage("badfood",badfoodImage)
        badfood.scale = 0.3
        badfood.velocityX =  -(6 + 3*score/100);
        badfood.lifetime = 200;
        badfoodgroup.add(badfood)
    }
}
function spawngoodfood(){
    if(frameCount%100 === 0){
        var goodfood = createSprite(1000,370,20,40)
        goodfood.addImage("goodfood",goodfoodImage)
        goodfood.scale = 0.03
        goodfood.velocityX =  -(3 + 3*score/100);
        goodfood.shapeColor="cyan"
        goodfood.lifetime = 250;
        goodfoodgroup.add(goodfood)
    }
}