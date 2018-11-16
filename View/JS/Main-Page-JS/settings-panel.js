function ImportSound(){
	document.getElementById("sound-file").click();
}

$("#sound-file").change(function(e){
	if(e.target.files.length > 0){
		var fileName = e.target.files[0].name;
		var fileElements = fileName.split(".");
		var fileExt = fileElements[fileElements.length - 1];

		if(fileExt == "mp3" || fileExt == "wav"){
			$("#sound-path-txt").val(e.target.files[0].path);
			$("#sound-alarm").attr("src",e.target.files[0].path);
		}else{
			alert("The file is invalid.It's must be a mp3 or wav file");
		}
	}
});

function UpdateTimeAlarm(){
	var stringHelper = require("../JS/Module/stringHelper");
	var value = $("#time-alarm-txt").val();

	if(stringHelper.isNumberic(value)){
		alarm_sys.AlarmTime = value;
		alert("Thay đổi thành công");
	}else{
		alert("Invalid Time");
	}
}