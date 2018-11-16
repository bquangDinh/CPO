"use strict";
exports.closeWindowById = function (id){
	const {remote} = require('electron');
	const {BrowserWindow} = remote;
	const win = BrowserWindow.fromId(id);
	win.close();
}

