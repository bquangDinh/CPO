"use strict";

var alarm_sys_md = require("../JS/Module/Alarm/AlarmEmbeddedSystem");
var alarm_sys = new alarm_sys_md();
/*InitListenner*/
alarm_sys.eventEmitter.on('spawn_data',(data) => {
	document.getElementById("child-process-result").value = data;
});

/*Init Event*/
for(var i = 0;i < 4;i++){
	var init = function(index){
		var submit_alarm_clr_btt = document.getElementById("change-alarm-lighting-" + (index+1));
		submit_alarm_clr_btt.addEventListener('click',function(){
			alarm_sys.alarm_clrs[index] = document.getElementById("es-color-input-" + (index+1)).value;
			if(alarm_sys.currentMode == alarm_sys.modes.REVIEW){
				alarm_sys.ShowAllAlarm();
			}
		});
	}
	init(i);
}
