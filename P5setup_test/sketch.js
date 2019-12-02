let tavern;
let marko;
let bar;

let input, button, greeting;

function preload(){
  tavern = loadImage("/images/tavern.png");
  marko= loadImage("/images/marko.png");
  barextra= loadImage("/images/barextra.png");


  input = createInput();
  input.position(0, -10);


}

function setup(){
  createCanvas(1230,800);
}

function draw(){
  image(tavern,0,0);
  // rotate(PI / 180 * 45);
  image(marko,10,0);
  image(barextra,0,-10);
}

function keyPressed() {

  if (keyCode === ENTER) {
    value = greet();
  }
}

  function greet(){
  //
  //   // const name = input.value();
    // greeting.html('hello!');
  //   // input.value('');
  //
    for (let i = 0; i < 200; i++) {
      push();

      text("test", 0, 0);
      pop();
    }

  }
