// P5's drawing and animation file

//Images:
let tavern;
let marko;
let barextra;
let notes;

// Timer stuff for speach bubble
let tempFlag = false; //to display the text box or not ( when user enters sets to true)
let replyString = ''; //it's global cz its set inside another method ( rive stuff) and needs to be in draw to actually render the text
let initialTimer = 10;
let timer = initialTimer; //text stays on screen for this amount of time
let logPressed = false;
let logTimer = 14;
// User text box input
let input;

let factList =[];
let addedStructure = false;
let logText ;


let bubbles ;



function preload(){
  tavern = loadImage("/images/tavern.png");
  marko= loadImage("/images/marko.png");
  barextra= loadImage("/images/barextra.png");
  speechBubble = loadImage("/images/speechBubble.png");
  notes = loadImage("/images/notes.png");
  g_loadimg = loadImage ("/images/test.gif");
  g_createimg = createImg("/images/test.gif");

}

function setup(){
  var canvas =  createCanvas(windowWidth, windowHeight);
  // var canvas =  createCanvas(1230,800);
  canvas.parent("sketch_canvas");
  //input text field  setup
  input = createInput();
  input.position(0, 700).size(500,40);
  input.style("background-color","white");
  //log buttonn setup
  var button = createImg("/images/notes.png","notes button");
  button.position(1120,655).size(100,100);
  // button.mousePressed(openLog);
  button.mousePressed(logbuttonPressed);

}

function logbuttonPressed(){
  logPressed = true
}

function disableInput(){
  input.style("background-color","grey");
  input.attribute('disabled', '');


}
function enableInput(){
  input.style("background-color","white");
  input.removeAttribute('disabled');

}


function closeLog(){
//clearning this is just an attempt - tried dedrawing and clearing the array -- does not seem to work - stoppinng this for now ( weird sinnce speach bubbles are redrawn ok...)
  console.log("closing log ", logPressed);
  // factList =[];
  console.log(factList);
  // fill(255);
  // rect(1230, 0, 0, 0); // Draw rectangle
  // noStroke();
 logText = text(factList.join('\n'),1230, 20, 460, windowHeight-20 );
}
function draw(){
  image(tavern,0,0);
  image(marko,10,0);
  image(barextra,0,-10);

  runLogChecks();
  runSpeachBubble();
}

//to open or close it has to be redrawn hence timers :/
function runLogChecks()
{
  if(logPressed ==true){
    openLog();
    if (frameCount % 60 == 0 && logTimer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    logTimer --;
  }
    if (logTimer <= 0) {
      closeLog();
      logPressed = false;
      addedStructure = true; //to stop it from adding the same elements in a loop
      logTimer = initialTimer;
      background(0,0,0,0)
  }
  }
}

function runSpeachBubble(){
  if(tempFlag== true){
    drawSpeachBubble()
    text(replyString, 760, 100, 280, 200);
    if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
      timer --;
      // image(g_loadimg, 200, 50, 200, 200); //loads only first frame
      var img = g_createimg.position(460,50); //loads GIF correctly
  }
  if (timer <= 0) {
    img.remove();
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

function openLog(){
var factListLength = 0;
if(addedStructure==false){
    for(var i = 0; i<=playerKB.length-1 ;i++){
      if("Knowledgable" in playerKB[i] && playerKB[i]["Knowledgable"]==true )
        {
          factList.push(simpleTextify(playerKB[i] ,"Barkeep"));
        }
    }
    addedStructure = true;
}

  //if the new length is diff update the text
  if(factList.length > factListLength){

  }

  fill(255);
  rect(1230, 0, 460, windowHeight); // Draw rectangle
  formatText(CENTER,200);
  logText = text(factList.join('\n'),1230, 20, 460, windowHeight-20 );
  // console.log(factList);
}

function addLogFact(text){
//want to reverse textify and add it to jsonn
//for now simply adding it to our fact list as a string
factList.push("marco" + text);
//update the text log - can be refactored lator

}



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
