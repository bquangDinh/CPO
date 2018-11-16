"use strict";
 module.exports = class ServerCommunicator{

 	constructor(){
 		this.adapters = [];

 		/*Init Events*/
        var event = require('events');
        this.eventEmitter = new event.EventEmitter();
 	}

 	Add(adapter){
 		if(adapter._type == 'adapter'){
 			this.adapters.push(adapter);
 			var that = this;
 			adapter.eventEmitter.on('send-data-to-server',function(data,socket){
 				that.eventEmitter.emit('send-data-to-server-CM',data,socket);
 			});
 		}else{
 			throw new Error('This is no a adapter object');
 		}
 	}

 	SendDataToObj(data,socket){
 		var signature = data.split("#")[0];
 		for(var adapter of this.adapters){
 			if(adapter.signature == signature){
 				let value = data.substring(data.indexOf('#')+1,data.length);
 				adapter.GetDataFromServer(value,socket);
 				break;
 			}
 		}
 	}
 }