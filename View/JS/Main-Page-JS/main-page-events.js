function closeWindow(){
	//Exit App
	const {remote} = require('electron');
	remote.BrowserWindow.getFocusedWindow().close();
}

function minimizeWindow(){
	const {remote} = require('electron');
	remote.BrowserWindow.getFocusedWindow().minimize();
}

function maximizeWindow(){
	const {remote} = require('electron');
	remote.BrowserWindow.getFocusedWindow().maximize();
	resize();
}

function AddMessage(message){
	var messageContainer = document.getElementById("fadeMessageBox");
	var outer_div = document.createElement("div");
	outer_div.className += "alert alert-success alert-dismissible";

	var a = document.createElement("a");
	a.classList.add("close");
	a.setAttribute("data-dismiss","alert");
	a.setAttribute("aria-label","close");
	a.setAttribute("href","#");
	a.addEventListener("click",function(){
		messageContainer.removeChild(outer_div);
	});
	a.innerHTML = "&times;";

	var messgeBox = document.createElement("strong");

	var now = new Date(Date.now());
	messgeBox.innerHTML = message + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

	outer_div.appendChild(a);
	outer_div.appendChild(messgeBox);

	messageContainer.appendChild(outer_div);

}

function ToggleLockingAllPlayer(value){
	for(var i = 0; i < 4;i++){
		players_storage[i].Lock = value;
	}
}

/*Controlling Bar Button Events*/
function ClearPlayerContent(){
	var clearPlayer = (index) => {
		players_storage[index].Answer = "";
		players_storage[index].Time = "00:00";
	}

	for(var i = 0; i < 4;i++){
		clearPlayer(i);
	}
}

function UpdateAnswerAndTime(){
	ChangeShowMode(3);
}

var lock = 0;

function LockAllPlayer(){
	if(lock == 0){
		ToggleLockingAllPlayer(1);
		document.getElementById("lock-all-user-btt").style.backgroundColor = "#e74c3c";
		document.getElementById("lock-all-user-btt").style.color = "white";
		lock = 1;
	}else{
		ToggleLockingAllPlayer(0);
		document.getElementById("lock-all-user-btt").style.backgroundColor = "#DDDDDD";
		document.getElementById("lock-all-user-btt").style.color = "#1c1c1c";
		lock = 0;
	}
}

function dragElement(element){
	var pos1 = 0, pos2 = 0;
	element.onmousedown = dragMouseDown;

	function dragMouseDown(e){
		e = e || window.event;
		e.preventDefault();
		pos2 = e.clientY;
		document.onmouseup = closeDragElement;
		document.onmousemove = elementDrag;
	}

	function elementDrag(e){
		e = e || window.event;
		e.preventDefault();

		pos1 = pos2 - e.clientY;
		let newPos = element.offsetTop - pos1;

		if(newPos > 0 && newPos <= 400){	
			element.style.top = newPos + "px";
		}	
	}

	function closeDragElement(e){
		document.onmouseup = null;
		document.onmousemove = null;
	}
}


dragElement(document.getElementById("control-task-1"));
dragElement(document.getElementById("control-task-2"));