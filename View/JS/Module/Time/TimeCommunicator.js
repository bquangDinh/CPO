"use strict";
module.exports = class TimeCommunicator{
	constructor(){
		this.adapters = [];
	}

	Add(adapter){
		this.adapters.push(adapter);
	}

	SendData(Data){
		for(var adapter of this.adapters){
			adapter.GetTime(Data);
		}
	}
}