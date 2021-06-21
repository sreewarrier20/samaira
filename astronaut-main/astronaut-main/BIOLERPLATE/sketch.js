var gameState= 1
var astronaut1, astronaut2
var block, ghost, sky
var startTime, endTime

function setup() {
  createCanvas(displayWidth,displayHeight);
  astronaut1 =createSprite(displayWidth/2, displayHeight-10, 50, 50);
  astronaut1.addAnimation("image1",astronautimage1)

  astronaut1.addAnimation("image2",astronautimage2)

  ghostGroup=new Group ()
  astronaut1.debug=true
  astronaut1.setCollider("rectangle",0,0,50,100)

  startTime=new Date().getTime()
 //console.log(startTime.getSeconds())
}

function draw() {
  background("#33768E");

image (skyimage,0,-1*displayHeight,displayWidth,2*displayHeight)
drawSprites();  
if(gameState==1){

  if(keyWentDown("space")){
    console.log("hello")
    //astronaut1.addAnimation("image2",astronautimage2)
    astronaut1.changeAnimation("image2",astronautimage2)
     astronaut1.velocityY=-10
  }

  if (keyWentUp ("space")){
    astronaut1.velocityY=0
    astronaut1.changeAnimation("image1",astronautimage1)
  }

  if(keyWentDown("right")){
    astronaut1.velocityX=12
  }
  if(keyWentDown("left")){
    astronaut1.velocityX=-12
  }

  if(keyWentUp("right")){
    astronaut1.velocityX=0
  }
  if(keyWentUp("left")){
    astronaut1.velocityX=0
  }
  camera.position.y= astronaut1.y
  camera.position.x=width/2

  obstacle()
if (astronaut1.isTouching(ghostGroup)){
  gameState=0

}  
currentTime=new Date().getTime()

fill("black")
textSize(40)
text(dateDiffToString(startTime, currentTime), (astronaut1.x+width)/2,(astronaut1.y-300) )
}

if(gameState==0){
  astronaut1.velocityY=0
  ghostGroup.setVelocityEach(0,0)

}

 
}

function preload(){
astronautimage1= loadAnimation("images/astronaut1.png")
astronautimage2= loadAnimation("images/astronaut2.png")
blockimage= loadImage("images/block.png")
ghostimage= loadImage("images/ghost.png")
skyimage = loadImage("images/sky.jpeg")

}

function obstacle(){

  if(frameCount%Math.round(random(100,300))==0){
ghost= createSprite (random(0,width),astronaut1.y-200)
ghost.addImage(ghostimage)
ghostGroup.add(ghost)
ghost.velocityY=4
ghost.setCollider("circle",0,0,40)
  }

}



function dateDiffToString(a, b){


  diff = Math.abs(a - b);

  ms = diff % 1000;
  diff = (diff - ms) / 1000
  ss = diff % 60;
  diff = (diff - ss) / 60
  mm = diff % 60;
  diff = (diff - mm) / 60
  hh = diff % 24;
  days = (diff - hh) / 24

  return days + ":" + hh+":"+mm+":"+ss+"."+ms;

}