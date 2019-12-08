FILE_DIR = "barDomain3";
FILES = {"actions" : FILE_DIR + "/actions.json",
    "cast" : FILE_DIR + "/cast.json",
    "history" : FILE_DIR + "/history.json",
    "schema" : FILE_DIR + "/schema.json",
    "volitions" : FILE_DIR + "/volitions.json",
    "trigger" : FILE_DIR + "/triggers.json"}


// document.addEventListener('ensembleLoaded', function (e){
// 	console.log("Ensemble Loaded")
// This should work. It isn't cooperating right now. I don't know why
// 	startEnsemble();
// });

startEnsemble();
startRive();

var marcoKB = loadKB("MarcoKB.json");
var marcoWorries = expandEnsembleActionWithSubject("complain", marcoKB);
console.log(marcoWorries);
