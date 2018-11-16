"use strict";

var players_storage = [];
var players_UI_storage = [];
var PLAYER_COUNT = 4;
var SHOW_MODE = {
	NAME_SCORE:0,
	NAME_ANSWER_SCORE:1,
	NAME_TIMEPRO_SCORE:2,
	NAME_ANSWER_TIME:3,
	NAME_TIMEPRO_TIME:4
}

var RANKING_COLOR = {
	_1st:"#ff321d",
	_2nd:"#fd6b5c",
	_3rd:"#ff9b90",
	_4th:"#fdddda"
}
var alarm_changed = false;

var showMode = SHOW_MODE.NAME_SCORE;
var init_ed = false;

const {ipcRenderer} = require('electron');

const player_MD = require("../JS/Module/Player/Player");


for(var i = 0; i < PLAYER_COUNT;i++){
	var player = new player_MD();
	players_storage.push(player);
}

init();

ipcRenderer.on('players-information',(event,arg) => {
	players_storage[0].CopyData(arg.Player0);
	players_storage[1].CopyData(arg.Player1);
	players_storage[2].CopyData(arg.Player2);
	players_storage[3].CopyData(arg.Player3);
});

ipcRenderer.on('change-show-mode',(event,arg) => {
	let mode = arg.mode;
	playerUI_manager.ChangeShowMode(mode);
});

ipcRenderer.on("time-set-up",(event,arg) => {
	let time_value = arg.time;
	timeCountDown.SetTime(time_value);
	timeCountDown.Start();
});

ipcRenderer.on("header-update",(event,arg) => {
	let title = arg.title;
	let fontSize = arg.f_size;
	let hexColor = arg.hex_clr;

	var header = document.getElementById("header-text");
	header.innerHTML = title;
	header.style.fontSize = fontSize + "px";
	header.style.color = hexColor;
});


ipcRenderer.on("time-stop",(event,arg) => {
	let player_id = arg.PLAYER;
	players_storage[player_id].StopCounter = 1;
	
});

ipcRenderer.on("alarm-ranking",(event,arg) => {
	let player_id = arg.PLAYER_ID;
	let rank = arg.RANK;

	var setRankingColor = function(_rank){
		switch (_rank){
			case "1":
				players_UI_storage[player_id].mainContentBox.style.backgroundColor = RANKING_COLOR._1st;
				break;
			case "2":
				players_UI_storage[player_id].mainContentBox.style.backgroundColor = RANKING_COLOR._2nd;
				break;
			case "3":
				players_UI_storage[player_id].mainContentBox.style.backgroundColor = RANKING_COLOR._3rd;
				break;
			case "4":
				players_UI_storage[player_id].mainContentBox.style.backgroundColor = RANKING_COLOR._4th;
				break;
		}		
	}
	setRankingColor(rank);
	alarm_changed = true;
});

ipcRenderer.on("alarm-clearing",(event,arg) => {
	if(alarm_changed){
		for(let i = 0 ; i < PLAYER_COUNT;i++){
			players_UI_storage[i].mainContentBox.style.backgroundColor = "white";
		}
	}
});

function init(){
	for(let i = 0 ; i < PLAYER_COUNT;i++){
		var playerControl_MD = require('../JS/Module/Player/PlayerBoardUI');
		var _playerUI = new playerControl_MD(players_storage[i]);

		var avatar_img = document.getElementById("rk-player-avatar-" + (i + 1));
		var main_content_box = document.getElementById("main-content-box-" + (i + 1));
		var name_box = document.getElementById("rk-player-name-" + (i + 1));
		var score_box = document.getElementById("rk-player-score-" + (i + 1));
		var answer_box = document.getElementById("rk-player-content-answer-" + (i + 1));
		var time_box = document.getElementById("rk-player-time-" + (i + 1));
		var time_progress = document.getElementById("time-countdown-progress-" + (i + 1));
		var time_progress_outer = document.getElementById("rk-player-time-progressbar-" + (i + 1));
		var timeLb = document.getElementById("time-countdown-lb-result-" + (i + 1));
		
		//connect to UI
		_playerUI.InitUI(avatar_img,main_content_box,name_box,score_box,answer_box,time_box,time_progress,time_progress_outer,timeLb);
		_playerUI.InitListener();
		players_UI_storage.push(_playerUI);
	}
}

const playerUI_manager_MD = require("../JS/Module/Player/PlayerBoardUI_Manager");
var playerUI_manager = new playerUI_manager_MD(players_UI_storage);

const player_manager_MD = require("../JS/Module/Player/PlayerBoardManager");
var player_manager = new player_manager_MD(players_storage);

/*Init Time*/
const timeCommun_MD = require("../JS/Module/Time/TimeCommunicator");
const timeCountDown_MD = require("../JS/Module/Time/TimeCountDown");

var timeCommunicator = new timeCommun_MD();
timeCommunicator.Add(player_manager);

var timeCountDown = new timeCountDown_MD(timeCommunicator);

