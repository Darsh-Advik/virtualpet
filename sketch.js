//Create variables here
var dog; 
//var happyDog; 
var database;
var foodS;
var foodStock;


function preload()
{
  //load images here
  image1 = loadImage("images/dogImg.png");
  image2 = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(250, 200, 50, 50);
  dog.addImage(image1);
  dog.scale=0.2;
  database = firebase.database();
  foodStock = database.ref("FoodStocks");
  foodStock.on("value",readStock);
}


function draw() {  

  background(46, 139, 87);
  
  fill("black");
  textSize(20);
 //x text("Foodstocksleft : "+20,165,100);
  text("Press up arrow key to feed doggo! ",100,300);

  dog.display();

  drawSprites();
  //add styles here
  text("Foodstocksleft : "+foodS,165,100);
  if(keyWentDown(UP_ARROW)){
   writeStock(foodS);
   dog.addImage(image2);
   // text("Foodstocksleft : "+19,165,100);
  }

}

function writeStock(x){

  database.ref("/").update({Food:x})
  
  if(x<=0){
    x=0
  } 
  else{
    x=x-1;
  }
}

function readStock(data){
  foodS = data.val();
}