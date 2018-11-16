"use strict";
 module.exports = class Server{
 	constructor(host,port,serverCommunicator){
 		this.host = host;
 		this.port = port;
 		this.serverCommunicator = serverCommunicator;

 		var that = this;
 		/*Private Method*/
 		this.SocketActivity = (socket) => {
 			socket.on('data',function(data){
 				data = new TextDecoder("utf-8").decode(data);
 				that.Receive(data,this);
 			});
 			
 		}

 		this.serverCommunicator.eventEmitter.on('send-data-to-server-CM',function(data,socket){
 			that.Send(data,socket);
 		});
 	}

 	Send(data,socket){
 		socket.write(data);
 	}

 	Receive(data,socket){
 		this.serverCommunicator.SendDataToObj(data,socket);
 	}

 	Close(data){
 		
 	}

 	/*METHODS*/
 	InitServer(){
 		const net = require('net');
 		var server = net.createServer(this.SocketActivity);
 		server.listen(this.port,this.host);
 	}
}