"use strict";


const serverCommunicator_MD = require('../JS/Module/Server/ServerCommunicator.js');
var serverCommunicator = new serverCommunicator_MD();

/*Declare a new communicator*/

/*PlayerManager is a communicator, and they will connect each other*/
if(typeof(playerManager) !== 'undefined'){
	serverCommunicator.Add(playerManager);
}

const {ipcRenderer} = require('electron');
ipcRenderer.on('set-up-server',(event,arg) => {
	const serverModule = require("../JS/Module/Server/Server");
	var server = new serverModule(arg.host,arg.port,serverCommunicator);
	server.InitServer();
});


