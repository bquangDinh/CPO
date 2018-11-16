"use strict";

var WDStatus = {
	OPENING:0,
	DEACTIVED:1
}

const {remote} = require('electron');
const {BrowserWindow} = remote;
const electron = require('electron');
const app = require('electron').remote.app;

var currentStatus = WDStatus.DEACTIVED; // default
var currentWin = null;
var displaySelected = null;
var displays = electron.screen.getAllDisplays();

/*BUTTON EVENTS*/
function SelectDisplayById(){
	var display_id = this.getAttribute("display-id");
	var display_name = this.getAttribute("display-name");


	//find display
	for(var i in displays){
		if(displays[i].id == display_id){
			displaySelected = displays[i];
			break;
		}
	}

	let message = "Bạn đã chọn " + display_name + "(" + displaySelected.bounds.width + "x" + displaySelected.bounds.height + ")";
	Message("display-selection-message",message);
}

function ShowPlayerBoard(){
	if(currentStatus == WDStatus.DEACTIVED){
		//open player board window
		const path = require('path');
		const windowPath = path.join('file://',__dirname,'../HTML/ranking-board.html');
		var win = null;

		if(displaySelected == null){
			win = new BrowserWindow({frame:false,fullscreen:true});
		}else{
			win = new BrowserWindow({frame:false,fullscreen:true,x:displaySelected.bounds.x,y:displaySelected.bounds.y});
		}
			
		win.on('close',() => {
			currentWin = null;

			//change status
			f_WD_Closing();
		});

		win.loadURL(windowPath);
		win.show();
		currentWin = win;

		//change status
		f_WD_Opening();

		let Data = {
			Player0: players_storage[0],
			Player1: players_storage[1],
			Player2: players_storage[2],
			Player3: players_storage[3],
			WD_ID: win.id
		}
		TransferDataToBoard("players-information",Data);	
	}
}

function ChangeShowMode(mode){
	let Data = {
		mode:mode,
		WD_ID:currentWin.id
	}
	TransferDataToBoard("change-show-mode",Data);
}

function ClosePlayersBoard(){
	const win = BrowserWindow.fromId(currentWin.id);
	win.close();
}

function ReloadPlayersBoard(){
	let Data = {
		Player0: players_storage[0],
			Player1: players_storage[1],
			Player2: players_storage[2],
			Player3: players_storage[3],
			WD_ID: currentWin.id
	}
	TransferDataToBoard("players-information",Data);
}

function StartTimeCountDown(){
	//reset counter
	for(var i = 0 ; i < 4;i++){
		players_storage[i].StopCounter = 0;
	}

	//check if player board is not opened 
	if(currentWin != null){
		//player board window is opening
		ReloadPlayersBoard();
	}
	
	//check input valid
	let value = document.getElementById("time-input-field").value;
	const stringHelper = require("../JS/Module/stringHelper");
	
	if(stringHelper.isNumberic(value) == false){
		alert("You must enter a number");
		return;
	}

	if(currentWin != null){
		let Data = {
			time:value,
			WD_ID: currentWin.id
		}
		TransferDataToBoard("time-set-up",Data);
	}

	timeCountDown.SetTime(value);
	timeCountDown.Start();

	if(document.getElementById("lock-all-user-cb").checked == true){
		UnlockAllPlayer();
	}
}

function StopTimeCountDown(){
	timeCountDown.Stop();
	for(var i = 0; i < 4;i++){
		players_storage[i].StopCounter = 1;
	}
}

function ChangeHeaderInfo(){
	var colorCodex = document.getElementById("rk-color-input").value;
	var fontSize = document.getElementById("fontsize-title-input").value;
	var title = document.getElementById("title-input").value;

	if(colorCodex == ""){
		alert("Enter your color !");
		return;
	}

	var stringHelper = require("../JS/Module/stringHelper");
	if(stringHelper.isHexColor(colorCodex) == false){
		alert("Invalid Color");
		return;
	}	

	if(stringHelper.isNumberic(fontSize) == false){
		alert("Invalid Font Size");
		return;
	}

	if(currentWin == null){
		alert("Player Board is not opened !");
		return;
	}

	let Data = {
		title:title,
		f_size:fontSize,
		hex_clr:colorCodex,
		WD_ID:currentWin.id
	}

	TransferDataToBoard("header-update",Data);
}

/*-------------*/

/*METHODS*/
function UnlockAllPlayer(){
	ToggleLockingAllPlayer(0);
	document.getElementById("lock-all-user-btt").style.backgroundColor = "white";
	document.getElementById("lock-all-user-btt").style.color = "#1c1c1c";
}

function Message(message_box_id,message){
	document.getElementById(message_box_id).innerHTML = message;
}

function TransferDataToBoard(channelName,data){
	const {ipcRenderer} = require('electron');
	ipcRenderer.send(channelName,data);	
}

function ToggleDisplayStatus(){
	var deactivedElements =  document.getElementsByClassName("deactived");
	if(deactivedElements.length > 0){
		for(i = 0; i < deactivedElements.length;i++){
			deactivedElements[i].disabled = true;
		}
	}
	
	var activedElements = document.getElementsByClassName("actived");
	if(activedElements.length > 0){
		for(i = 0; i < activedElements.length;i++){
			activedElements[i].disabled = false;
		}
	}
}

function f_WD_Opening(){
	document.getElementById("users-board-status").innerHTML = "Đang mở...";
	document.getElementById("starting-users-board-page").classList.add("deactived");
	document.getElementById("starting-users-board-page").classList.remove("actived");

	document.getElementById("closing-users-board-page").classList.remove("deactived");
	document.getElementById("closing-users-board-page").classList.add("actived");
	
	document.getElementById("reloading-users-board-page").classList.remove("deactived");
	document.getElementById("reloading-users-board-page").classList.add("actived");

	
	currentStatus = WDStatus.OPENING;
	ToggleDisplayStatus();
}

function f_WD_Closing(){
	document.getElementById("users-board-status").innerHTML = "Chưa mở";
	document.getElementById("starting-users-board-page").classList.remove("deactived");
	document.getElementById("starting-users-board-page").classList.add("actived");

	document.getElementById("closing-users-board-page").classList.add("deactived");
	document.getElementById("closing-users-board-page").classList.remove("actived");

	document.getElementById("reloading-users-board-page").classList.add("deactived");
	document.getElementById("reloading-users-board-page").classList.remove("actived");

	currentStatus = WDStatus.DEACTIVED;
	ToggleDisplayStatus();
}

function UpdateDisplaysInformation(displays_list){
	var count = displays_list.length;
	var display_message = document.getElementById("display-selection-message");

	for(i = 0; i < count;i++){
		var displayComponents = displays_list[i].split('#');
		/*[0] is display name
			[1] is size of the display
		*/

		var bound = displayComponents[1].split("x");
		/*
			bound[0] : width
			bound[1] : height
		*/

		var displayDiv = document.createElement('div');
		displayDiv.classList.add('display');

		var nameOfDisplay = document.createElement('p');
		nameOfDisplay.classList.add('name-of-display');
		nameOfDisplay.innerHTML = displayComponents[0];

		displayDiv.appendChild(nameOfDisplay);

		var selectDiv = document.createElement('div');
		selectDiv.classList.add('select-display-button');

		var selectButton = document.createElement('button');
		selectButton.setAttribute('id','display-config-button-1')
		selectButton.setAttribute("display-id",displays[i].id);
		selectButton.setAttribute("display-name",displayComponents[0]);
		selectButton.addEventListener("dblclick",SelectDisplayById);
		selectButton.innerHTML = displayComponents[1];

		selectDiv.appendChild(selectButton);

		displayDiv.appendChild(selectDiv);

		var displays_area = document.getElementById('displays-list');
		displays_area.appendChild(displayDiv);
	}
}

function ReDetectDisplay(){
	//clear child nodes
	var displays_area = document.getElementById('displays-list');
	while(displays_area.hasChildNodes()){
		displays_area.removeChild(displays_area.firstChild);
	}

	const {app} = require('electron').remote;

	const displayPr_execute =  app.getAppPath() + "\\graphics_information.exe";

	const {spawn} = require('child_process');
	const bat = spawn(displayPr_execute);

	var result = "";
	bat.stdout.on('data',(data)=>{
		var stringHelper = require("../JS/Module/stringHelper.js");
		result = stringHelper.convertAsciiArrayToText(data);
		result = result.substring(0,result.length - 1);
		UpdateDisplaysInformation(result.split("-"));
	});
}

function ChangeAlarmColor(){
	const {app} = require('electron').remote;
	const cpo_lighting_execute = app.getAppPath() + "\\cpouart.exe";
	const {spawn} = require('child_process');
	const bat = spawn(cpo_lighting_execute,["#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF"]);

	bat.stdout.on('data',(data) => {
		console.log(data);
	});
}


/*------------------*/

/*Run When Init*/
ReDetectDisplay();