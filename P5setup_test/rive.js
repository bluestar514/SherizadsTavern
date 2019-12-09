let bot = new RiveScript();
let inputbot = new RiveScript();
let simpleBot = new RiveScript();

const marcoBrains = [
   '/brains/MarcoBrains.rive'
  //'./brains/MarcoBtwo.rive'
];
const inputBrains = [
   '/brains/inputBrain.rive'
];
const simpleBrains = [
  '/brains/MarcoBtwo.rive'
]

function startRive(){
    bot.loadFile(marcoBrains).then(function(){botReady(bot, "marco")}).catch(botNotReady);
    inputbot.loadFile(inputBrains).then(function(){botReady(inputbot, "input")}).catch(botNotReady);
    simpleBot.loadFile(simpleBrains).then(function(){botReady(simpleBot, "quick")}).catch(botNotReady);
}

function botReady(botName, name){
   botName.sortReplies();
   console.log("Rive " + name + " ready!");
}

function botNotReady(err){
   console.log("Bot Not Ready",err);
}

//bot functions
function chat(userInput, displayFunction) {
   //var userInput = input.value();
   //iniital chat - user input
   //disable user input
   disableInput();
   console.log("player input: "+ userInput);

   var initalPlayerInput = inputbot.reply("local-user", userInput);

   initalPlayerInput.then(function(ininitalRiveTranlation){
      if(ininitalRiveTranlation == "catch"){
        console.log("catching a quick response")
        quickResponse(userInput, displayFunction);
      }else{
        enactPlayerAction(ininitalRiveTranlation, displayFunction);
      }    
   })
 }

function enactPlayerAction(ininitalRiveTranlation, displayFunction){
  console.log("player input parsed to: "+ ininitalRiveTranlation)

  var actionResult = matchAction(ininitalRiveTranlation, "Barkeep", "Marco");
  console.log(actionResult)

  if(actionResult != null){
    doAction(actionResult) //for the player actions
    actionResult = actionResult["name"]+"response"

    console.log("ensemble expander looking for: "+actionResult)
    var townieActsOn = expandEnsembleActionWithSubject(actionResult, marcoKB)

    var townieResponce = bot.reply("local-user", townieActsOn)
    console.log("rive looking for: "+ townieActsOn)
    addLogFact(townieActsOn);//adding whatever townie says to notes

    townieResponce.then(function(townieResponceTranslation){
          verbalizeTownieResponse(townieResponceTranslation, displayFunction);
     })
  }else{
    actionResult = "nonunderstood statement"
    
    var townieAction = bot.reply("local-user", actionResult);

    townieAction.then(function(townieActionTranslation){

      displayFunction(townieActionTranslation);

      enableInput(); //let the  user type again
      //allow typing after responce (set time )
      //grey out inbox
      //add to player knoledge
      // return player typinng back
    })
  }

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
  //adding it to player KB (future to json)/ just logging for now
  addLogFact(expandedAction);
  var townieAction = bot.reply("local-user", expandedAction);

  townieAction.then(function(townieActionTranslation){

    displayFunction(townieActionTranslation);

    enableInput();
  })
}

function quickResponse(ininitalRiveTranlation, displayFunction){
  console.log("trying " + ininitalRiveTranlation)
  var townieAction = simpleBot.reply("local-user", ininitalRiveTranlation);

  townieAction.then(function(townieActionTranslation){
    console.log("quickResponse Result: "+ townieActionTranslation)
    displayFunction(townieActionTranslation);
    enableInput();
  })
}
