"use strict";

/*init*/
let AlarmMessager_MD = require("../JS/Module/Alarm/AlarmMessager");
var AlarmMessager = new AlarmMessager_MD(document.getElementById("fadeMessageBox"));

let AlarmRanking_MD = require("../JS/Module/Alarm/AlarmRanking");
var AlarmRanking = new AlarmRanking_MD();

var AlarmStatus = [false,false,false,false];

function ChangeAlarmReviewMode(){
	if(alarm_sys.currentMode == alarm_sys.modes.REVIEW){
		document.getElementById("alarm-section-message").style.visibility = "hidden";
		alarm_sys.currentMode = alarm_sys.modes.REAL_TIME;
		alarm_sys.ClearAlarm();
	}else{
		document.getElementById("alarm-section-message").style.visibility = "visible";
		alarm_sys.currentMode = alarm_sys.modes.REVIEW;
	}
}

function AddAlarmMessage(message,usingTime = true){
	var messageBox = null;
	if(AlarmMessager.CheckNumberOfMessageBox() == true){
		messageBox = AlarmMessager.InsertMessage(message,usingTime);
	}else{
		console.log("Message Container reached maxium box !");
	}
	return messageBox;
}

function ResetAlarmToDefault(){
	AlarmStatus = [false,false,false,false];
	AlarmMessager.Clear();

	//clear alarm at player board
	if(currentWin != null){
		let Data = {
			WD_ID:currentWin.id
		}
		TransferDataToBoard("alarm-clearing",Data);
	}
}

function ToggleLockingAlarm(value){
	for(var i = 0; i < 4;i++){
		players_storage[i].DisableAlarm = value;
	}
}

function ShowAlarm(player_id){
	alarm_sys.AlarmById(player_id);
	var audio = document.getElementById("sound-alarm");
	audio.play();
}

var lockAlarm = 0;
function LockAllAlarm(){
	if(lockAlarm == 0){
		ToggleLockingAlarm(1);
		document.getElementById("lock-all-alarm").style.backgroundColor = "#e74c3c";
		document.getElementById("lock-all-alarm").style.color = "white";
		lockAlarm = 1;
	}else{
		ToggleLockingAlarm(0);
		document.getElementById("lock-all-alarm").style.backgroundColor = "#DDDDDD";
		document.getElementById("lock-all-alarm").style.color = "#1c1c1c";
		lockAlarm = 0;
	}
}

