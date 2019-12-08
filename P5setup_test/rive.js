let bot = new RiveScript();
let inputbot = new RiveScript();
const marcoBrains = [
   '/brains/MarcoBrains.rive'
// './another-category-sample.rive
];
const inputBrains = [
   '/brains/inputBrain.rive'
];

function startRive(){
    bot.loadFile(marcoBrains).then(botReady).catch(botNotReady);

    inputbot.loadFile(inputBrains).then(inputbotReady).catch(botNotReady);
}


function botReady(){
   bot.sortReplies();
   console.log('Marco Bot Ready');//yes this *used to*  works
  }

function inputbotReady(){
   inputbot.sortReplies();
   console.log('Input Bot Ready');//yes this *used to*  works
}
function botNotReady(err){
   // console.log("An error has occurred", err);
   console.log("Bot Not Ready",err);

}

//bot functions
function chat(userInput, displayFunction) {
   //var userInput = input.value();
   console.log("player input: "+ userInput);
   var initalPlayerInput = inputbot.reply("local-user", userInput);

   initalPlayerInput.then(function(ininitalRiveTranlation){
        enactPlayerAction(ininitalRiveTranlation, displayFunction);
   })
 }

function enactPlayerAction(ininitalRiveTranlation, displayFunction){
  console.log("player input parsed to: "+ ininitalRiveTranlation)

  var actionResult = matchAction(ininitalRiveTranlation, "Barkeep", "Marco");
  doAction(actionResult) //for the player actions

  console.log("ensemble expander looking for: "+actionResult["name"]+"response")
  var townieActsOn = expandEnsembleActionWithSubject(actionResult["name"]+"response", marcoKB)

  var townieResponce = bot.reply("local-user", townieActsOn)
  console.log("rive looking for: "+ townieActsOn)
  townieResponce.then(function(townieResponceTranslation){
        verbalizeTownieResponse(townieResponceTranslation, displayFunction);
   })
}

function verbalizeTownieResponse(townieResponceTranslation, displayFunction){
  console.log("Townie responds with: "+ townieResponceTranslation);

  let currentAction = getBestActionBetween("Marco", "Barkeep");
  console.log("Townie tries to: "+ currentAction["name"]);
  displayFunction(townieResponceTranslation);

  doAction(currentAction);
  setTimeout(function () {
    verbalizeTownieAction(currentAction, displayFunction)
  }, 14000)
}

function verbalizeTownieAction(currentAction, displayFunction){
  var expandedAction = expandEnsembleActionWithSubject(currentAction["name"], marcoKB)
  console.log("Townie action expanded to: "+expandedAction);
  var townieAction = bot.reply("local-user", expandedAction);

  townieAction.then(function(townieActionTranslation){

    displayFunction(townieActionTranslation);
  })
}