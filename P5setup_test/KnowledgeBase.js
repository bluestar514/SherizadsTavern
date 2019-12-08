
function loadKB(filename){ //shamelessly stolen from ensemble.js
	var fileResults;

	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			fileResults = JSON.parse(xmlhttp.responseText);
		} 
	}

	xmlhttp.open("GET", filename, false); // false = synchronously
	xmlhttp.send();

	return fileResults
}

function pickRandom(array){
	return array[Math.floor(Math.random()*array.length)];
}

function getWorry(kb){
	var worries = [];
	for(var i=0; i< kb.length; i++){
		if(kb[i].opinion < 0){
			worries.push(kb[i]);
		}
 	}
 	return worries;
}

function getGoodThing(kb){
	var goodies = [];
	for(var i=0; i< kb.length; i++){
		if(kb[i].opinion > 0){
			goodies.push(kb[i]);
		}
 	}
 	return goodies;
}

function getAboutFamily(kb, familyList){
	var aboutFamily = [];

	for(var i=0; i<kb.length; i++){
		//console.log(kb[i]);
		if(familyList.includes(kb[i]["subject"]) || familyList.includes(kb[i]["object"])){
			aboutFamily.push(kb[i])
		}
	}

	console.log(aboutFamily)
	return aboutFamily;
}

function simpleTextify(fact){
	console.log(fact)
	var text = [fact["subject"]];
	if("action" in fact){
		text.push(fact["action"])
		if("object" in fact){
			text.push(fact["object"])
		}
	}else if("state" in fact){
		text.push("is");
		text.push(fact["state"]);
	}

	return text.join(" ");
}

function expandEnsembleActionWithSubject(action, kb){
	switch(action){
		case "complain":
		case "tellAboutBadThing":
			worries = getWorry(kb);
			worry = pickRandom(worries);
			
			return action+" about "+simpleTextify(worry);
		case "tellAboutGoodThing":
			goodies = getGoodThing(kb);
			event = pickRandom(goodies);
			
			return action+" about "+simpleTextify(event);
		case "askaboutfamilyresponse":
			aboutFamily = getAboutFamily(kb, ["Alicia"]);
			event = pickRandom(aboutFamily);

			return action+" about "+simpleTextify(event);
		default:
			return action;
	}
}