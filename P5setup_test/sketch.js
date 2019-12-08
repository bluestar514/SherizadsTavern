// P5's drawing and animation file


//Images:
let tavern;
let marko;
let barextra;

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

}

function setup(){
  var canvas =  createCanvas(1230,800);
  canvas.parent("sketch_canvas");
  background(0, 0, 0);


  input = createInput();
  input.position(0, 700).size(500,40);
  input.parent("sketch_input");
}

function draw(){
  image(tavern,0,0);
   // rotate(PI / 180 * 45);
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
  formatText();

}
function formatRectangle(){

  fill('rgba(0%,0%,0%,0.0)');//transparent tectangle
  rect(760, 100, 280, 200); // Draw rectangle
  noStroke();
}

function formatText(){
  fill(0);//text filling color
  textSize(15);
  textAlign(CENTER, CENTER);
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
