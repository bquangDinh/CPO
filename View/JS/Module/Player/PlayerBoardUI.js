"use strict";
module.exports = class PlayerBoardUI{
	constructor(player){
		this.player = player;
	}

	InitUI(avatar,
		mainContentBox,
		nameBox,
		scoreBox,
		answerBox,
		timeResultBox,
		timeProgressBar,
		timeProgressBarOuter,
		timeLb){
		this.avatar = avatar;
		this.mainContentBox = mainContentBox;
		this.nameBox = nameBox;
		this.scoreBox = scoreBox;
		this.answerBox = answerBox;
		this.timeResultBox = timeResultBox;
		this.timeProgressBarOuter = timeProgressBarOuter;
		this.timeProgressBar = timeProgressBar;
		this.timeLb = timeLb;
	}

	InitListener(){
		var that = this;
		this.player.eventEmitter.on('ui-update',function(data){

			var propertiesName = data.substring(0,3);
			var value = data.substring(3,data.length);

			switch(propertiesName){
				case that.player.PROPERTIES_NAME.NAME:
					that.nameBox.innerHTML = value;
					break;

				case that.player.PROPERTIES_NAME.AVATARSRC:
					that.avatar.src = value;
					break;

				case that.player.PROPERTIES_NAME.SCORE:
					that.scoreBox.innerHTML = value;
					break;

				case that.player.PROPERTIES_NAME.ANSWER:
					that.answerBox.innerHTML = value;
					break;

				case that.player.PROPERTIES_NAME.CURRTIME:
					let dataPackage = value.split("#");
					that.timeLb.innerHTML = dataPackage[0];
					that.timeProgressBar.style.width = dataPackage[1] + "%";
					break;

				case that.player.PROPERTIES_NAME.TIME:
					that.timeResultBox.innerHTML = value;
					break;
			}
		});
	}
}