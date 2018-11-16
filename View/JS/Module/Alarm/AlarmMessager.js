"use strict";

module.exports = class AlarmMessager{
	constructor(MessagerContainer){
		this.maxShowingBox = 4;
		this.MessagerContainer = MessagerContainer;
		this.currentBoxIndex = 1;

		var that = this;
		this.CreateMessageBox = function(){
			var outer_div = document.createElement("div");
			outer_div.className += "alert alert-success alert-dismissible alr-message-box";

			var a = document.createElement("a");
			a.classList.add("close");
			a.setAttribute("data-dismiss","alert");
			a.setAttribute("aria-label","close");
			a.setAttribute("href","#");
			a.addEventListener("click",function(){
				that.MessagerContainer.removeChild(outer_div);
			});
			a.innerHTML = "&times;";

			var messgeBox = document.createElement("strong");
			messgeBox.setAttribute("data-alr-ranking",that.currentBoxIndex);

			outer_div.appendChild(a);
			outer_div.appendChild(messgeBox);

			that.MessagerContainer.appendChild(outer_div);

			return messgeBox;
		}
	}

	InsertMessage(message,usingTime){
		var messgeBox = this.CreateMessageBox();
		if(usingTime){
			let now = new Date(Date.now());
			messgeBox.innerHTML = message + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
		}else{
			messgeBox.innerHTML = message;
		}
		this.currentBoxIndex++;
		return messgeBox;
	}

	CheckNumberOfMessageBox(){
		return (this.currentBoxIndex > this.maxShowingBox) ? false : true;
	}

	Clear(){
		this.MessagerContainer.innerHTML = "";
		this.currentBoxIndex = 1;
	}
}