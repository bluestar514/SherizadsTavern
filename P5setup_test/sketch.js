let tavern;
let marko;
let bar;
let tempFlag = false; //to display the text box or not ( when user enters sets to true)
let replyString = ''; //it's global cz its set inside another method ( rive stuff) and needs to be in draw to actually render the text
let timer = 14; //text stays on screen for this amount of time
//from a tutorial below
let bot = new RiveScript();
let inputbot = new RiveScript();
const marcoBrains = [
   '/brains/MarcoBrains.rive'
// './another-category-sample.rive
];
const inputBrains = [
   '/brains/inputBrain.rive'
// './another-category-sample.rive
];
bot.loadFile(marcoBrains).then(botReady).catch(botNotReady);

inputbot.loadFile(inputBrains).then(inputbotReady).catch(botNotReady);

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
  input.position(0, 700).size(500,40);
}

function draw(){
  image(tavern,0,0);
   // rotate(PI / 180 * 45);
  image(marko,10,0);
  image(barextra,0,-10);

  if(tempFlag== true){

    triangle(405, 250, 600, 320, 600, 375);

    let c = color(255,255,255); // Define color 'c'
    fill(c); // Use color variable 'c' as fill color
    strokeWeight(4);
    stroke(51);
    rect(600, 10, 400, 450); // Draw rectangle

    textSize(15);
    fill(255);
    text(replyString, 600, 10, 400, 450); // Text wraps within text box

    if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    timer --;
  }
  if (timer <= 0) {
    tempFlag = false;
    timer = 16;
  }
  }
}

function keyPressed() {
  if (keyCode === RETURN) {
    value = chat();
    input.value('');
  }
}

//bot functions

function chat() {
   // What did the user say?
   var userInput = input.value();
   // What does the bot say?
   var reply = inputbot.reply("local-user", userInput);
   //TODO an modify reply and user input here 0000 priot to sending
   //TODO if its not listed here have it go to one of the dge cases

   // show the reply
   print(reply);
   reply.then(function(value){
      var reply2 = bot.reply("local-user", value)
      console.log(value)
      reply2.then(function(value2){

        replyString = value2;
        tempFlag = true;
      })
   })
   // output.html(reply);
 }

function botReady(){
   bot.sortReplies();
   print('does this happen? does the bot reply');//yes this *used to*  works
  }

function inputbotReady(){
   inputbot.sortReplies();
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

function simplifyActionOptions(actionsList){
  var simpleDictionary = {}

  for (var action in actionsList) {
    console.log(action)
    let actionName = actionsList[action]["name"]
    let actionWeight = actionsList[action]["weight"]
    if( actionName in simpleDictionary){
      simpleDictionary[actionName] += actionWeight
    }else{
      simpleDictionary[actionName] = actionWeight
    }
  }

  return simpleDictionary
}

function getBestActionBetween(initiator, responder){
  var allActions = simplifyActionOptions(getAllActionsFor(initiator)[responder]);

  var bestAction = 0;

  for (var action in allActions) {
    if (allActions[bestAction] < allActions[action]) {
      bestAction = action
    }
  }

  return allActions[bestAction]
}

function doAction(action){
  var effects = action.effects; // where action came from ensemble.getAction(..) or getActions(..)
  for(var i = 0; i < effects.length; i += 1){
    ensemble.set(effects[i]);
  }
}
