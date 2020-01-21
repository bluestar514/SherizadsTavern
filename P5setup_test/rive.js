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
      if(ininitalRiveTranlation == "catch"){ //TODO check where catch is set and maybe add cond
        console.log("catching a quick response")
        quickResponse(userInput, displayFunction);
      // } else if (ininitalRiveTranlation == "tellAboutPerson"){
      //   testingAskAbout(userInput, displayFunction);
      // }
    }else{
        enactPlayerAction(ininitalRiveTranlation, displayFunction);
      }
   })
 }
// //weird doesn't do an action / idela but missebehaving - copied this for now // have it not do an action if it is that tipic
 function testingAskAbout(ininitalRiveTranlation, displayFunction){
   console.log("BOO-- trying from asking about somone ---  " + ininitalRiveTranlation)
   var townieAction = simpleBot.reply("local-user", ininitalRiveTranlation);

   // console.log("townieActionTranslation"+ townieActionTranslation);
   townieAction.then(function(townieActionTranslation){
     console.log("asked about someone -- "+ townieActionTranslation)
     displayFunction(townieActionTranslation);

     if(Math.random() > .25){
       enableInput();
     }else{
       let currentAction = getBestActionBetween("Marco", "Barkeep");
       console.log("Townie tries to: "+ currentAction["name"]);

       doAction(currentAction);
       setTimeout(function () {
         verbalizeTownieAction(currentAction, displayFunction)
       }, 14000)
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

    console.log("ensemble expander looking for: "+actionResult)//TODO this one
    var townieActsOn = expandEnsembleActionWithSubject(actionResult, marcoKB)

    if(townieActsOn.includes("no new info")){
      townieActsOn = "no new info";
    }

    var townieResponce = bot.reply("local-user", townieActsOn)
    console.log("rive looking for: "+ townieActsOn)//todo fiom here to line 91
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
  displayFunction(townieResponceTranslation);

  //TODO here add something to stay in that inner loop or exit  out maybe based in nrandom
  let currentAction = getBestActionBetween("Marco", "Barkeep");
  console.log("Townie tries to: "+ currentAction["name"]);

  doAction(currentAction);
  setTimeout(function () {
    verbalizeTownieAction(currentAction, displayFunction)
  }, 14000)
}

function verbalizeTownieAction(currentAction, displayFunction){
  //let it finish if it is in inner loop - hpw do we check if in topic in rive
  var expandedAction = expandEnsembleActionWithSubject(currentAction["name"], marcoKB)
  console.log("Townie action expanded to: "+expandedAction);
  //adding it to player KB (future to json)/ just logging for now

  if(expandedAction.includes("no new info")){
    expandedAction = "no new info";
  }

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

    if(Math.random() > .25){
      enableInput();
    }else{
      simpleBot.reply("local-user", "random");
      
      let currentAction = getBestActionBetween("Marco", "Barkeep");
      console.log("Townie tries to: "+ currentAction["name"]);

      doAction(currentAction);
      setTimeout(function () {
        verbalizeTownieAction(currentAction, displayFunction)
      }, 14000)
    }

  })
}
