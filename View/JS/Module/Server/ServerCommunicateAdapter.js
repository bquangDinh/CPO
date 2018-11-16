"use strict";

module.exports = class ServerAdapter {
	constructor(obj){
		this.socket = [];
		this.signature = null;
		this.obj = obj;
		this._type = 'adapter';
	}

	get Sign(){
		return this.signature;
	}

	set Sign(value){
		this.signature = value;
	}

	SocketCount(count){
		for(var i = 0; i < count;i++){
			socket = null;
		}
	}

	GetDataFromServer(data,socket){
		obj.GetData(data,socket);
	}

	SendDataToServer(data,socket){

	}
}