let tavern;
let marko;
let bar;

let input, button, greeting;
let option1,option2,option3,option4;

function preload(){
  tavern = loadImage("/images/tavern.png");
  marko= loadImage("/images/marko.png");
  barextra= loadImage("/images/barextra.png");

}



function setup(){
  createCanvas(1230,800);

//make this into a funcion later
  option1 = createButton('option1textinputfromfile').size(600,40);
  option2 = createButton('option2PATHinputfromfile').size(600,40);
  option3 = createButton('option33textinputfromfile').size(600,40);

  option1.position(0, 700);
  option2.position(0, 750);
  option3.position(0, 790);

  option1.mousePressed(doSomthing);

  input = createInput();
  input.position(0, 0);
}

function doSomthing(){
  //
  // DEBUG:
  print("npc replies here")
  //reply herenew p5.Element(elt,pInst)
  // reset button text - maybe save it as a varible
}

function draw(){
  image(tavern,0,0);
   // rotate(PI / 180 * 45);
  image(marko,10,0);
  image(barextra,0,-10);
}

function keyPressed() {

  if (keyCode === RETURN) {
    value = greet();
  }
}

  function greet(){
    print ("hello world!");
    let userInput= input.value();

    //do checks on imput.valuenew p5.Element(
    print("user wentef", userInput);
    input.value('');

    for (let i = 0; i < 200; i++) {
      push();

      text("test", 0, 0);
      pop();
    }

  }
