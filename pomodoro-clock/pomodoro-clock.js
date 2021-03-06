"use strict";

var currBreakLen = 5,
	currSessionLen = 25,
	currTime = (60*currSessionLen),
	currMode = "Session",
	currState = "pause",
	timerVar,
	changeTimer,

setLen = (currLen, dir) =>{
	if (dir === 1){
		if (currLen === 120){
			return 120;
		} else{
			return (currLen+1);
		} 
	} else if (dir === 0){
		if (currLen === 1){
			return 1;
		} else{
			return (currLen-1);
		}
	} else {
		return 0;
	}
},
	
formatTime = (time) =>{
	var min = Math.floor(time/60) + "",
			sec = (time%60) + "";
	while (sec.length < 2) {
				sec = "0" + sec;
		}
	return (min) + ":" + (sec);
},
	
tick = () =>{
	if (currTime > 0){
		currTime--;
		document.getElementById("timeTitle").innerHTML = formatTime(currTime);
	} else {
		clearInterval(timerVar);
		switch(currMode){
			// if we are in session, flip to break
			case "Session":{
				currMode = "Break";
				currTime = (60*currBreakLen);
				// Let's also display some change to the user that indicates we are in "break-mode"
				document.body.style.background = "green";
			}
			break;
			// if we are in break, flip to session
			case "Break":{
				currMode = "Session";
				currTime = (60*currSessionLen);
				document.body.style.background = "darkgrey";
			}
			break;
		}
		timerVar = setInterval(tick, 1000);
		setVars();
	}
},
	
changeTimer = () =>{
	if (currState === "pause"){
		currState = "run";
		timerVar = setInterval(tick, 1000);
	} else if (currState === "run"){
		currState = "pause";
		clearInterval(timerVar);
	}
},

setVars = () =>{
	document.getElementById("breakAmt").innerHTML = currBreakLen;
	document.getElementById("sessionAmt").innerHTML = currSessionLen;
	document.getElementById("stateTitle").innerHTML = currMode;
	document.getElementById("timeTitle").innerHTML = formatTime(currTime);
},

decreaseBreak = () =>{
	currBreakLen = setLen(currBreakLen, 0);
	if (currMode == "Break"){
		clearInterval(timerVar);
		currTime = (60*currBreakLen);
	}
	setVars();
},

increaseBreak = () =>{
	currBreakLen = setLen(currBreakLen, 1);
	if (currMode == "Break"){
		clearInterval(timerVar);
		currTime = (60*currBreakLen);
	}
	setVars();
},

decreaseSession = () =>{
	currSessionLen = setLen(currSessionLen, 0);
	if (currMode == "Session"){
		clearInterval(timerVar);
		currTime = (60*currSessionLen);
	}
	setVars();
},

increaseSession = () =>{
	currSessionLen = setLen(currSessionLen, 1);
	if (currMode == "Session"){
		clearInterval(timerVar);
		currTime = (60*currSessionLen);
	}
	setVars();
},
		
resetTimer = () =>{
	clearInterval(timerVar);
	currTime = (60*currSessionLen);
	setVars();
};


$(document).ready(function() {
	setVars();
	$(" #timer ").on("click", changeTimer);
	$(" #breakDec ").on("click", decreaseBreak); // Decrement Break
	$(" #breakInc ").on("click", increaseBreak); // Increment Break
	$(" #sessionDec ").on("click", decreaseSession); // Decrement Session
	$(" #sessionInc ").on("click", increaseSession); // Increment Break
	$(" .reset-box ").on("click", resetTimer); // Increment Break
});