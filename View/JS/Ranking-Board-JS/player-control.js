class Player{
	constructor(){
		this.ID = 0;
		this.score = 0;
		this._name = "Player"
		this.SHOW_MODE = {
			NAME_SCORE:0,
			NAME_ANSWER_SCORE:1,
			NAME_TIMRPRO_SCORE:2,
			NAME_ANSWER_TIME:3
		}

		const app = require('electron').remote.app;
        this.avatarSrc = app.getAppPath() + "\\View\\Asset\\Image\\user-image-test.jpg"; 
	}

	connectToUI(avatarImg,
		name_box,
		score_box,
		answer_box,
		time_box,
		time_progress){

		this.avatarImg = avatarImg;
		this.name_box = name_box;
		this.score_box = score_box;
		this.answer_box = answer_box;
		this.time_box = time_box;
		this.time_progress = time_progress;

	}

	get Score(){
		return this.score;
	}

	set Score(value){
		this.score = value;
		this.score_box.innerHTML = value;
	}

	get Name(){
		return this._name;
	}

	set Name(value){
		this._name = value;
		this.name_box.innerHTML = value;
	}

	set AvaSrc(value){
		this.avatarSrc = value;
		this.avatarImg.src = value;
	}

	
	startTimeProgress(timeCount){
		var timeTicked = 0;
		var that = this;
		this.timer = setInterval(function () {
			timeTicked += 100;
			var timePercent = parseInt(timeTicked / timeCount) * 100;
			that.time_progress.style.width = timePercent + "%";
			if(timeTicked == timeCount){
				clearInterval(that.timer);
			}
		},100);
	}

	stopTimeProgress(){
		clearInterval(this.timer);
	}

	changeShowMode(mode){
		//change show mode
		if(mode == this.SHOW_MODE.NAME_ANSWER_SCORE){
			debugger;
			this.name_box.classList.add("name-transition-zoom-in-animation");
			this.answer_box.classList.add("fade-in-animation");
			this.score_box.style.display = "block";
			this.score_box.classList.add("fade-in-animation");
			this.time_box.style.display = "none";
		}
	}
}