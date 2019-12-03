let tavern;
let marko;
let bar;

//from a tutorial below
let bot = new RiveScript();

const brains = [
   '/images/brain.rive'
// './another-category-sample.rive
];
bot.loadFile(brains).then(botReady).catch(botNotReady);

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
  // option1 = createButton('option1textinputfromfile').size(600,40);
  // option2 = createButton('option2PATHinputfromfile').size(600,40);
  // option3 = createButton('option33textinputfromfile').size(600,40);
  //
  // option1.position(0, 700);
  // option2.position(0, 750);
  // option3.position(0, 790);
  //
  // option1.mousePressed(doSomthing);

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
    // value = greet();
    value = chat();

  }
}
  function greet(){
    print ("hello world!");
    let userInput= input.value();
    //do checks on imput.valuenew p5.Element(
    print("user wentef", userInput);
    input.value('');


    }

//bot functions

function chat() {
   // What did the user say?
   let userInput = input.value();
   // What does the bot say?
   var reply = bot.reply("local-user", userInput);
   //TODO an modify reply and user input here 0000 priot to sending
   //TODO if its not listed here have it go to one of the dge cases

   // show the reply
   print(reply.promiseValue);
   // output.html(reply);
 }

function botReady(){
   bot.sortReplies();
   print('does this happen? does the bot reply');//yes this *used to*  works
  }
function botNotReady(err){
   // print("An error has occurred", err);
   print("An error has occurred",err);

    }

FILE_DIR = "barDomain3";
FILES = {"actions" : FILE_DIR + "/actions.json",
		"cast" : FILE_DIR + "/cast.json",
		"history" : FILE_DIR + "/history.json",
		"schema" : FILE_DIR + "/schema.json",
		"volitions"	: FILE_DIR + "/volitions.json",
    "trigger"	: FILE_DIR + "/triggers.json"}

document.addEventListener('ensembleLoaded', function (e){
	console.log("Ensemble Loaded")
	main();
});

function main() {
	console.log(ensemble);
	ensemble.init();

	raw = {}

	for (const [key, value] of Object.entries(FILES)) {
	  raw[key] = ensemble.loadFile(value)

	}

	console.log(raw)

	var schema = ensemble.loadSocialStructure(raw["schema"])
	console.log(schema)

	var rules = ensemble.addRules(raw["volitions"])
	console.log(rules)

	var actions = ensemble.addActions(raw["actions"])
	console.log(actions)

	var cast = ensemble.addCharacters(raw["cast"])
	console.log(cast)

	var history = ensemble.addHistory(raw["history"])
	console.log(history)

}

function getAllVolitions() {
	var cast = ensemble.getCharacters();
	var calculatedVolitions = ensemble.calculateVolition(cast);

	return calculatedVolitions
}

function getAllVolitionsFor(initiator) {
	var allVolitions = getAllVolitions().dump();
	return allVolitions[initiator]
}

function getActions(initiator, responder){
	var cast = ensemble.getCharacters();
	var calculatedVolitions = ensemble.calculateVolition(cast);
	var actions = ensemble.getActions(initiator, responder, calculatedVolitions, cast, 100, 100, 100)

	return actions;
}

function getAllActionsFor(initiator) {
	var cast = ensemble.getCharacters();
	var allActions = {}

	for (var j = cast.length - 1; j >= 0; j--) {
		try{
			allActions[cast[j]] = getActions(initiator, cast[j]);
		}catch(e){
			allActions[cast[j]] = e;
		}
	}

	return allActions
}

function getAllActions(){
	var cast = ensemble.getCharacters();
	var allActions = {}
	for (var i = cast.length - 1; i >= 0; i--) {
		allActions[cast[i]] = getAllActionsFor(cast[i])
	}
	return allActions
}
