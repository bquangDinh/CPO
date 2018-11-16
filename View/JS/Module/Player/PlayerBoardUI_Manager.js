"use strict";
module.exports = class PlayerBoardUI_Manager{
	constructor(playerUI_list){
		this.playerUI_list = playerUI_list;
		this.SHOW_MODE = {
			NAME_SCORE:0,
			NAME_ANSWER_SCORE:1,
			NAME_TIMRPRO_SCORE:2,
			NAME_ANSWER_TIME:3,
			NAME_TIMEPRO_TIME:4
		}
		this.oldShowMode = null;

		/*private methods*/
		this.clearAllAnimation = function(){
			for(var i = 0;i < 4;i++){
				 this.playerUI_list[i].nameBox.classList.remove("name-transition-zoom-out");
				 this.playerUI_list[i].nameBox.classList.remove("name-transition-zoom-in");		 

				 this.playerUI_list[i].scoreBox.classList.remove("main-two-transition-fade-in");
				 this.playerUI_list[i].scoreBox.classList.remove("main-two-transition-fade-out");

				 this.playerUI_list[i].answerBox.classList.remove("answer-transition-fade-in");
				 this.playerUI_list[i].answerBox.classList.remove("answer-transition-fade-out");

				 this.playerUI_list[i].timeResultBox.classList.remove("main-two-transition-fade-in");
				 this.playerUI_list[i].timeResultBox.classList.remove("main-two-transition-fade-out");

				 this.playerUI_list[i].timeProgressBarOuter.classList.remove("progressbar-transition-fade-in");
				 this.playerUI_list[i].timeProgressBarOuter.classList.remove("main-two-transition-fade-out");		 
			}			 
		}.bind(this);
	}

	ChangeShowMode(showMode){
		if(this.oldShowMode != showMode){
			this.clearAllAnimation();
			switch(showMode){
				case this.SHOW_MODE.NAME_SCORE:

					for(var i = 0; i < this.playerUI_list.length;i++){
						void this.playerUI_list[i].nameBox.offsetWidth; // https://www.reddit.com/r/learnjavascript/comments/782qdx/what_does_void_elementoffsetwidth_do/	
						this.playerUI_list[i].nameBox.classList.add("name-transition-zoom-out");
						this.playerUI_list[i].scoreBox.classList.add("main-two-transition-fade-in");
						this.playerUI_list[i].answerBox.classList.add("answer-transition-fade-out");
						this.playerUI_list[i].timeResultBox.classList.add("main-two-transition-fade-out");
						this.playerUI_list[i].timeProgressBarOuter.classList.add("main-two-transition-fade-out");
					}
					this.oldShowMode = showMode;
					break;

				case this.SHOW_MODE.NAME_ANSWER_TIME:

					for(var i = 0; i < this.playerUI_list.length;i++){
						void this.playerUI_list[i].nameBox.offsetWidth;	// ??????	
						this.playerUI_list[i].nameBox.classList.add("name-transition-zoom-in");
						this.playerUI_list[i].answerBox.classList.add("answer-transition-fade-in");
						this.playerUI_list[i].timeResultBox.classList.add("main-two-transition-fade-in");
						
						this.playerUI_list[i].scoreBox.classList.add("main-two-transition-fade-out");
						this.playerUI_list[i].timeProgressBarOuter.classList.add("main-two-transition-fade-out");
					}
					this.oldShowMode = showMode;
					break;

				case this.SHOW_MODE.NAME_TIMEPRO_TIME:

					for(var i = 0; i < this.playerUI_list.length;i++){
						void this.playerUI_list[i].nameBox.offsetWidth;	// ??????	
						this.playerUI_list[i].nameBox.classList.add("name-transition-zoom-in");
						this.playerUI_list[i].timeProgressBarOuter.classList.add("progressbar-transition-fade-in");
						this.playerUI_list[i].timeResultBox.classList.add("main-two-transition-fade-in");
						
						this.playerUI_list[i].scoreBox.classList.add("main-two-transition-fade-out");
						this.playerUI_list[i].answerBox.classList.add("answer-transition-fade-out");
					}
					this.oldShowMode = showMode;
					break;

				case this.SHOW_MODE.NAME_ANSWER_SCORE:

					for(var i = 0; i < this.playerUI_list.length;i++){
						void this.playerUI_list[i].nameBox.offsetWidth;	// ??????	
						this.playerUI_list[i].nameBox.classList.add("name-transition-zoom-in");
						this.playerUI_list[i].answerBox.classList.add("answer-transition-fade-in");					
						this.playerUI_list[i].scoreBox.classList.add("main-two-transition-fade-in");
						
						this.playerUI_list[i].timeResultBox.classList.add("main-two-transition-fade-out");
						this.playerUI_list[i].timeProgressBarOuter.classList.add("main-two-transition-fade-out");
					}
					this.oldShowMode = showMode;
					break;
			}
		}		
	}

}