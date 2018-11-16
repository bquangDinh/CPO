"use strict";
module.exports = class TimeCountDown{
	constructor(timeCommunicator){
		this.timeCountdown = 0; // unit: ms
		this.timeLoop = null;
		this.timeCommunicator = timeCommunicator;
	}

	/*Methods*/
	SetTime(value){
		this.timeCountdown = value*1000;
	}

	Now(){
		return window.performance ? window.performance.now() : Date.now();
	}

	/*------------*/
	Start(){
		//clear timeloop if it still running
		this.Stop();

		var that = this;
		var delay = 50;
		var initTick = this.Now();		
		this.timeLoop = setInterval(function(){
			let remaining = (that.timeCountdown - (that.Now() - initTick)) / 1000;
			remaining = remaining >= 0 ? remaining : 0;
			let secs = remaining.toFixed(2);
			secs = secs.replace(".",":");
			let percentage = parseInt(((remaining*1000) / that.timeCountdown)*100);
			
			let Data = {
				secs:secs,
				percentage:percentage,
				total:that.timeCountdown
			}

			that.timeCommunicator.SendData(Data);
			if(remaining == 0){
				clearInterval(that.timeLoop);
			}
		},delay);
	}

	Stop(){
		if(this.timeLoop != null){
			clearInterval(this.timeLoop);
		}	
	}
}