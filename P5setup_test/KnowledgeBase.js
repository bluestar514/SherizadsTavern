var emotion ="happy";

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

function getAbout(kb, subjectList){
	var about = [];

	for(var i=0; i<kb.length; i++){
		if(subjectList.includes(kb[i]["subject"].toLowerCase())
			|| ("object" in kb[i] && subjectList.includes(kb[i]["object"].toLowerCase()))){
			about.push(kb[i])
		}
	}
	return about;
}

function simpleTextify(fact, name){
	console.log(fact);
	setEmotion(fact["opinion"]);
	subject = fact["subject"]
	if(subject == name){
		subject = "I"
	}

	var text = [subject];
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

function setEmotion(opinionValue){
	emotion ="happy";
	if(opinionValue >= 12 ){
		emotion ="superHappy";
	} else if(opinionValue <15 && opinionValue >=1 ){
		emotion ="Happy";
	} else if(opinionValue <=0 && opinionValue >= -5)
		emotion ="sad";
		else {
		emotion ="superSad"	;
		}
	console.log("the emotion of char is " + emotion);
}

function getEmotion(){
	return emotion;
}

function expandEnsembleActionWithSubject(action, kb){
	switch(action){
		case "complain":
		case "tellAboutBadThing":
			worries = getWorry(kb);
			worry = pickRandom(worries);

			//remove(kb, worry); //Not ideal but prevents him from saying the thing again

			return action+" about "+simpleTextify(worry, "Marco");
		case "tellAboutGoodThing":
			goodies = getGoodThing(kb);
			event = pickRandom(goodies);

			//remove(kb, event);

			return action+" about "+simpleTextify(event, "Marco");
		case "askaboutfamilyresponse":
			aboutFamily = getAbout(kb, ["alicia"]);
			event = pickRandom(aboutFamily);

			//remove(kb, event);

			return action+" "+simpleTextify(event, "Marco");
		case "askaboutbusinessresponse":
			aboutBusiness = getAbout(kb, ["clinic", "doctor"]);
			event = pickRandom(aboutBusiness);

			//remove(kb, event);

			return action+" "+simpleTextify(event, "Marco");
		default:
			return action;
	}
}

function remove(array, value){
	for (var i = 0; i < array.length; i++) {
		if(array[i] === value){
			array.splice(i,1);
			return;
		}
	}
}
