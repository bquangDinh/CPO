"use strict";

var hosts = [0,0,0];
var ports = ['','',''];

const mainWindow_Config = {
	width:1200,
	height:642,
	frame: false,
}

/*BUTTON EVENTS*/
function closeWindow(){
	var windows = require("../JS/Module/windows.js");
	windows.closeWindowById(1);
}

function openDialog(typeOfserver){
	var title = document.getElementById("titleOfdialog");

	var config_dialog = document.getElementById("config-window");
	//set up title of dialog with name of server
	title.innerHTML = "Server " + typeOfserver;

	switch(typeOfserver){
		case "1":{
			//children server
			title.setAttribute("title","childServer") ;
			break;
		}

		case "2":{
			//children server
			title.setAttribute("title","childServer");
			break;			
		}

		case "0":{
			//main server
			title.setAttribute("title","mainServer");
			break;
		}

	}
	//Show Dialog
	config_dialog.style.display = "block";
}


function closeDialog(){
	var config_dialog = document.getElementById("config-window");
	config_dialog.style.display = "none";

	document.getElementById("server-port").value = "";
	document.getElementById("server-ip").value = "";
}


function confirm(){
	//get data from config dialog
	var server_port = document.getElementById("server-port").value;
	var server_host = document.getElementById("server-ip").value;
	var type = document.getElementById("titleOfdialog").getAttribute("title");
	var server_name = document.getElementById("titleOfdialog").innerHTML;

	//check format 
	var stringHelper = require("../JS/Module/stringHelper.js");
	var host_format = stringHelper.checkHostFormat(server_host);
	var port_format = stringHelper.checkPortFormat(server_port);

	if(host_format == false){
		document.getElementById("server-ip").className = "input-field-warning";
		document.getElementById("server-ip").value = "";
		alert("Host isn't valid \nPlease confirm again !");
		document.getElementById('log-content').innerHTML = "Host isn't valid \nPlease confirm again !";
		return;
	} else {
		document.getElementById("server-ip").className = "input-field";		
	}

	if(port_format == false){
		document.getElementById("server-port").className = "input-field-warning";
		document.getElementById("server-port").value = "";
		alert("Port isn't valid \nPlease confirm again !");
		document.getElementById('log-content').innerHTML = "Port isn't valid \nPlease confirm again !";
		return;
	} else {
		document.getElementById("server-port").className = "input-field";
	}

	ports[0] = server_port;
	hosts[0] = server_host;

	//console.log("Port: " + server_port + "\n" + "IP: " + server_ip + "\n" + "Type: " + type + "\n" + "Server name: " + server_name);
	const data = {server_name:server_name.replace(" ","-"),
		server_port:server_port,
		server_host:server_host,
		type:type};

	/*save*/
	//var dataHelper = require('../JS/Module/dataHelper.js');
	//dataHelper.saveServerConfig(data,'a');

	closeDialog();

	var status = document.getElementById("server-config-0");
	status.getElementsByTagName("img")[1].style.display = "none";
}

function openMainWindow(){
	console.log(ports);
	console.log(hosts);
	//check config of server 0
	if(ports[0] == 0 || hosts[0] == ''){
		let warning = "You must config server 0 before start !";
		document.getElementById('log-content').innerHTML = warning;
		return;
	}
	debugger;
	const {remote} = require('electron');
	const {BrowserWindow} = remote;
	const path = require('path');

	const windowPath = path.join('file://',__dirname,'../HTML/main-page.html');
	//1052 650
	let win = new BrowserWindow(mainWindow_Config);

	win.on('close',() => {win = null});
	win.loadURL(windowPath);
	win.show();

	let Data = {
		host: hosts[0],
		port: ports[0]
	};

	const {ipcRenderer} = require('electron');
	ipcRenderer.send('set-up-server-configuration',Data);

	closeWindow();
}