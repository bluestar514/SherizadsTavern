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
   var initalPlayerInput = inputbot.reply("local-user", userInput);

   // show the reply
   //console.log(reply);
   initalPlayerInput.then(function(ininitalRiveTranlation){
        console.log("looking for action which starts with: "+ ininitalRiveTranlation)
        doAction(matchAction(ininitalRiveTranlation, "Barkeep", "Marco")) //for the player actions

        var townieResponce = bot.reply("local-user", ininitalRiveTranlation)

        townieResponce.then(function(townieResponceTranslation){
          let currentAction = getBestActionBetween("Marco", "Barkeep");
          displayFunction(townieResponceTranslation);

          doAction(currentAction);
          setTimeout(function () {
            var townieAction = bot.reply("local-user", currentAction["name"]);

            townieAction.then(function(towniActionTranslation){

              displayFunction(towniActionTranslation);
            })
          }, 14000)



        })
   })
   // output.html(reply);
 }
