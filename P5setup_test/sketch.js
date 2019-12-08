// P5's drawing and animation file


//Images:
let tavern;
let marko;
let barextra;
let notes;

// Timer stuff for speach bubble
let tempFlag = false; //to display the text box or not ( when user enters sets to true)
let replyString = ''; //it's global cz its set inside another method ( rive stuff) and needs to be in draw to actually render the text
let initialTimer = 14
let timer = initialTimer; //text stays on screen for this amount of time

// User text box input
let input;



function preload(){
  tavern = loadImage("/images/tavern.png");
  marko= loadImage("/images/marko.png");
  barextra= loadImage("/images/barextra.png");
  speechBubble = loadImage("/images/speechBubble.png");
  notes = loadImage("/images/notes.png");

}

function setup(){
  // windowWidth, windowHeight
  var canvas =  createCanvas(windowWidth, windowHeight);
  // var canvas =  createCanvas(1230,800);
  canvas.parent("sketch_canvas");
  // background(0, 0, 0);


  input = createInput();
  input.position(0, 700).size(500,40);

  var button = createImg("/images/notes.png","notes button");
  button.position(1120,655).size(100,100);
  button.mousePressed(openLog);
}

function openLog(){
drawLogRectangle();

}
function closeLog(){

}
function draw(){
  image(tavern,0,0);
  image(marko,10,0);
  image(barextra,0,-10);

  if(tempFlag== true){
        drawSpeachBubble()
        text(replyString, 760, 100, 280, 200);
    if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    timer --;
  }
  if (timer <= 0) {
    tempFlag = false;
    timer = initialTimer;
  }
  }
}

function drawSpeachBubble(){
  image(speechBubble,600,10);
  formatRectangle();
  formatText(CENTER,CENTER);

}
function formatRectangle(){

  fill('rgba(0%,0%,0%,0.0)');//transparent tectangle
  rect(760, 100, 280, 200); // Draw rectangle
  noStroke();
}

function drawLogRectangle(){
  console.log("drawing the log")
  fill(255);
  rect(1230, 0, 460, windowHeight); // Draw rectangle


  var factList =[];
  for(var i = 0; i<=playerKB.length-1 ;i++){
    if("Knowledgable" in playerKB[i] && playerKB[i]["Knowledgable"]==true )
      {
        factList.push(simpleTextify(playerKB[i] ,"Barkeep"));
      }
  }
    formatText(CENTER,200);
    text(factList.join('\n'),1230, 20, 460, windowHeight-20 );


console.log(factList);
}

// function check(){
//    if("Knowledgable" in element && element["Knowledgable"]==true )
// }


function formatText(height,width){
  fill(0);//text filling color
  textSize(15);
  textAlign(height,width);
}
function keyPressed() {
  if (keyCode === RETURN) {
    value = chat(input.value(), displayDialogue);
    input.value('');
  }
}

function displayDialogue(dialogue){
  replyString = dialogue;
  tempFlag = true;
}
