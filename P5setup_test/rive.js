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
   var reply = inputbot.reply("local-user", userInput);

   // show the reply
   //console.log(reply);
   reply.then(function(value){
        console.log("looking for action which starts with: "+value)
        doAction(matchAction(value, "Barkeep", "Marco"))

        console.log(value)
        var reply2 = bot.reply("local-user", value)
        
        reply2.then(function(value2){
            displayFunction(value2)
        })
   })
   // output.html(reply);
 }