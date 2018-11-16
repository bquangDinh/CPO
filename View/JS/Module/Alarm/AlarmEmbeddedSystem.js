"use strict";
module.exports = class AlarmEmbeddedSystem{
	constructor(){
		this.alarm_clrs = ["#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF"];
		this.modes = {
			REVIEW:0,
			REAL_TIME:1
		};
		this.currentMode = this.modes.REVIEW;
		this.NUMBER_ALARM = 4;
		this.alarmIntervalTime = 3000;
		this.turnOnEffect = false;

		/*private*/
		var that = this;
		this.RunLightingSpawn = function(args){
			const {app} = require('electron').remote;
			const cpo_lighting_execute = app.getAppPath() + "\\cpouart.exe";
			const {spawn} = require('child_process');
			const bat = spawn(cpo_lighting_execute,args);

			bat.stdout.on('data',(data) => {
				that.eventEmitter.emit('spawn_data',data);
			});
			
			bat.stdout.on('error',(data) => {
				that.eventEmitter.emit('spawn_data',data);
			});
		}

		/*Init Events*/
        var event = require('events');
        this.eventEmitter = new event.EventEmitter();
	}

	set AlarmTime(value){
		this.alarmIntervalTime = value*1000;
	}

	/*Methods*/
	AlarmById(_id){
		var args = [];
		for(let i = 0; i < this.NUMBER_ALARM;i++){
			if(i == _id){
				args.push(this.alarm_clrs[i]);
			}else{
				args.push("#000000");
			}
		}

		this.RunLightingSpawn(args);

		var that = this;
		setTimeout(function(){
			let new_args = ["#000000","#000000","#000000","#000000"];
			that.RunLightingSpawn(new_args);
		},that.alarmIntervalTime);
	}

	ShowAllAlarm(){
		this.RunLightingSpawn(this.alarm_clrs);
	}

	ClearAlarm(){
		this.RunLightingSpawn(["#000000","#000000","#000000","#000000"]);
	}

	//Effect
	ShowIntro(){
		this.RunLightingSpawn(["#000000","#000000","#000000","#000000"]);
	}

	TurnOnEffect(turnOn){
		this.turnOnEffect = turnOn;
	}
}