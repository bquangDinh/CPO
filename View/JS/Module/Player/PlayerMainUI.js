"use strict";
module.exports = class PlayerMainUI{
	constructor(player){
		this.player = player;
	}

	InitUI(avatar_btt,
        plus_btt,
        minus_btt,
        custom_score_input,
        custom_score_btt,
        lock_btt,
        disable_alarm,
        score_box,
        name_box,
        answer_box,
        status_box,
        timeLb,
        timeProgressBar,
        player_background){

		this.avatar_btt = avatar_btt;
        this.plus_btt = plus_btt;
        this.minus_btt = minus_btt;
        this.custom_score_input = custom_score_input;
        this.custom_score_btt = custom_score_btt;
        this.lock_btt = lock_btt;
        this.disable_alarm = disable_alarm;
        this.scoreBox = score_box;
    	this.nameBox = name_box;
    	this.answerBox = answer_box;
        this.statusBox = status_box;
        this.timeLb = timeLb;
        this.timeProgressBar = timeProgressBar;
        this.player_background = player_background;
	}

	InitEvents(){
		var that = this;

		this.avatar_btt.addEventListener('dblclick',function(){
			const dialog = require('electron').remote.dialog;

			dialog.showOpenDialog({
                properties: ['openFile']
            }, function (files){
                if(files){
                    that.avatar_btt.src = files;
                    that.player.AvaSrc = files;
                }
            });
		});

		this.plus_btt.addEventListener('click',function(){
			that.player.Score += 10;
			that.scoreBox.innerHTML = that.player.Score;
		});

		this.minus_btt.addEventListener('click',function(){
			that.player.Score -= 10;
			that.scoreBox.innerHTML = that.player.Score;
		});

		this.custom_score_btt.addEventListener('click',function(){
			var scoreData = that.custom_score_input.value;
			var stringHelper = require("../stringHelper.js");

			if(stringHelper.isNumberic(scoreData) == false){
				alert('You must enter a numberic string');
			}else{
				that.player.Score = parseInt(scoreData);
				that.scoreBox.innerHTML = that.player.Score;
			}
		});

		this.lock_btt.addEventListener('click',function(){
			if(that.player.Lock == 0){
				that.lock_btt.style.color = "#e74c3c";
				that.player.Lock = 1;			
			}else{
				that.lock_btt.style.color = "#212529";
				that.player.Lock = 0;		
			}
		});

		this.disable_alarm.addEventListener('click',function(){
			if(that.player.DisableAlarm == 0){
				that.disable_alarm.style.color = "#e74c3c";
				that.player.DisableAlarm = 1;			
			}else{
				that.disable_alarm.style.color = "#212529";
				that.player.DisableAlarm = 0;		
			}
		});
	}

	InitListener(){
		/*Listening to event*/
		var that = this;
        this.player.eventEmitter.on('ui-update',function(data){
        	//extract properties name
			var propertiesName = data.substring(0,3);
			var value = data.substring(3,data.length);

			switch(propertiesName){
				case that.player.PROPERTIES_NAME.NAME:
					that.nameBox.innerHTML = value;
					break;

				case that.player.PROPERTIES_NAME.ANSWER:
					that.answerBox.innerHTML = value;
					break;

				case that.player.PROPERTIES_NAME.STATUS:
					//clear
					that.statusBox.classList.remove("user-offline");
					that.statusBox.classList.remove("user-online");
					
					if(value == "Offline"){
						that.statusBox.classList.add("user-offline");
					}else{
						that.statusBox.classList.add("user-online");
					}
					break;

				case that.player.PROPERTIES_NAME.CURRTIME:
					let dataPackage = value.split("#");
					that.timeLb.innerHTML = dataPackage[0];
					that.timeProgressBar.style.width = dataPackage[1] + "%";
					break;

				case that.player.PROPERTIES_NAME.ALARM:
					that.player_background.style.background = "#e74c3c";
					that.timeProgressBar.style.background = "white";
					setTimeout(function(){
						that.player_background.style.background = "white";
						that.timeProgressBar.style.background = "#e74c3c";
					},1500);
					break;

				case that.player.PROPERTIES_NAME.SCORE:
					that.scoreBox.innerHTML = value;
					break;

				case that.player.PROPERTIES_NAME.LOCK:
					if(value == 1){
						that.lock_btt.style.color = "#e74c3c";
					}else{
						that.lock_btt.style.color = "#212529";
					}
					break;

				case that.player.PROPERTIES_NAME.DISABLEALR:
					if(value == 1){
						that.disable_alarm.style.color = "#e74c3c";
					}else{
						that.disable_alarm.style.color = "#212529";
					}
					break;
			}
        });
	}
}