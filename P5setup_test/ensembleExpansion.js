function startEnsemble() {
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
