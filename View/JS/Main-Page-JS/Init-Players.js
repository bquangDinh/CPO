"use strict";

const NUM_CLIENTS = 4;

var players_storage = [];
var players_UI_storage = [];

for(var i = 0; i < NUM_CLIENTS;i++){
	var scoreBox = document.getElementById("user-score-"+ (i+1));
	var nameBox = document.getElementById("user-name-"+ (i+1));
	var answerBox = document.getElementById("user-answer-content-" + (i+1));
	var statusBox = document.getElementById("user-status-" + (i+1));
	var avatar = document.getElementById("user-avatar-" + (i+1));
	var plus_btt = document.getElementById("plus-btt-" + (i+1));
	var minus_btt = document.getElementById('minus-btt-' + (i+1));
	var custom_score_input = document.getElementById('custom-score-input-' + (i+1));
	var custom_score_btt = document.getElementById('custom-score-btt-' + (i+1));
	var lock_btt = document.getElementById('lock-user-' + (i+1));
	var settings_btt = document.getElementById('settings-user-' + (i+1));
	var time_lb = document.getElementById("time-countdown-lb-result-" + (i+1));
	var time_progressBar = document.getElementById("time-countdown-progress-" + (i+1));
	var player_background = document.getElementById("user-" + (i+1));

	const player = require('../JS/Module/Player/Player');
	let _player = new player();

	const playerUI = require('../JS/Module/Player/PlayerMainUI');
	let _playerUI = new playerUI(_player);

	 _playerUI.InitUI(
		avatar,
		plus_btt,
		minus_btt,
		custom_score_input,
		custom_score_btt,
		lock_btt,
		settings_btt,
		scoreBox,
		nameBox,
		answerBox,
		statusBox,
		time_lb,
		time_progressBar,
		player_background
		);
	 _playerUI.InitEvents();
	 _playerUI.InitListener();

	players_storage.push(_player);
	players_UI_storage.push(_playerUI);
} 

const playerManager_MD = require('../JS/Module/Player/PlayerManager');
var playerManager = new playerManager_MD(players_storage);

const timeCommunicator_MD = require("../JS/Module/Time/TimeCommunicator")
var timeCommunicator = new timeCommunicator_MD();

timeCommunicator.Add(playerManager);

const timeCountDown_MD = require("../JS/Module/Time/TimeCountDown");
var timeCountDown = new timeCountDown_MD(timeCommunicator);


/*Events Listener from players*/
var init_events_listener = function(player_index){
	players_storage[player_index].eventEmitter.on('ui-update',function(data){
		var propertiesName = data.substring(0,3);
		var value = data.substring(3,data.length);

		if(propertiesName == players_storage[player_index].PROPERTIES_NAME.STOPCTER){
			if(currentWin != null){
				let Data = {
				PLAYER:player_index,
				WD_ID:currentWin.id
				}

				TransferDataToBoard("time-stop",Data);
			}
		}

		if(propertiesName == players_storage[player_index].PROPERTIES_NAME.ALARM){
			if(AlarmStatus[player_index] == false){
				var messageBox = AddAlarmMessage(players_storage[player_index].Name + " vừa nhấn chuông");
			
				if(messageBox != null){	
					//get ranking
					var rank = messageBox.getAttribute("data-alr-ranking");

					if(rank == 1){
						//showing alarm
						ShowAlarm(player_index)
					}
					
					if(currentWin != null){					
						let Data = {
							PLAYER_ID:player_index,
							RANK:rank,
							WD_ID:currentWin.id
						}
						TransferDataToBoard("alarm-ranking",Data);	
					}
					AlarmStatus[player_index] = true;
				}
			}			
		}
	});
}


init_events_listener(0);
init_events_listener(1);
init_events_listener(2);
init_events_listener(3);
